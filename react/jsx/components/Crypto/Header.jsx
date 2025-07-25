import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {Button} from "antd";
//import style from "./LoginHeader.module.css";
import logo from "../../assets/img/logo.svg";
import MyBtnBlack from "../../ui/MyBtnBlack/MyBtnBlack";
import LogoutConfirmModal from "../../ui/modals/LogoutConfirmModal/LogoutConfirmModal";
import {MobileMenuCloseSvg, MobileMenuSvg, UserIconSvg} from "../../utils/sprite";
import {persistor} from "../../store/store";
//import MobileFilter from "../../ui/MobileFilter/MobileFilter";

const Header = (props) => {
    const {username} = useSelector(store => store.cryptoService);

    const [showConfirmModal, setIsShowConfirmModal] = useState(false)
    const [collapsed, setCollapsed] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {t} = useTranslation()

    const Logout = async () => {
        await dispatch(props.onLogout())
        await persistor.purge()
        navigate('/')
    }

    return (
        <div className={props.className}>
            <LogoutConfirmModal logout={Logout} showConfirmModal={showConfirmModal} showPopUp={setIsShowConfirmModal}/>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 25,
                justifyContent: 'space-between',
            }}>
            </div>

            <div style={{display: 'flex', flexDirection: props.mobile ? 'column' : 'row', alignItems: 'center', marginRight: 25}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <UserIconSvg size={34}/>
                    <div>{username ?? 'Unknown user'}</div>
                </div>
                <MyBtnBlack
                    style={{marginLeft: 25}}
                    name={t("header.signout")}
                    onClick={() => setIsShowConfirmModal(true)}
                />
            </div>
        </div>
    );
};


export default Header;