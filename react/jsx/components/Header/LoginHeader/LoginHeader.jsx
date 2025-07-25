import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {Button} from "antd";
import {logout} from "../../../store/slices/AcquiringSlices/AuthReducer";
import style from "./LoginHeader.module.css";
import logo from "../../../assets/img/logo.svg";
import person from "../../../assets/img/personIcon.png";
import MyBtnBlack from "../../../ui/MyBtnBlack/MyBtnBlack";
import LogoutConfirmModal from "../../../ui/modals/LogoutConfirmModal/LogoutConfirmModal";
import {MobileMenuCloseSvg, MobileMenuSvg, UserIconSvg} from "../../../utils/sprite";
import {persistor} from "../../../store/store";

const LoginHeader = (props) => {
    const [showConfirmModal, setIsShowConfirmModal] = useState(false)
    const {route} = useSelector(store => store.auth)

    const {firstName, lastName } = useSelector(store=>store.auth.data)
    const {firstNameP2P, lastNameP2P } = useSelector(store=>store.authP2P.data)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {t} = useTranslation()

  const Logout = async () => {
    localStorage.removeItem('token')
    localStorage.removeItem('isAuth');
    const cleaningFunction = props.onLogout ?? logout;
    await dispatch(cleaningFunction())
    await persistor.purge()
    navigate('/')
  }

  const styles = `${style.header_wrapper} ${props.className ?? ''}`;

  return (
      <div className={styles} >
        <LogoutConfirmModal logout={Logout} showConfirmModal={showConfirmModal} showPopUp={setIsShowConfirmModal}/>
          <div className={style.logo_block}>
              <Link to={"/"}>
                  <img src={logo} alt="" />
              </Link>
          </div>
        <div className={`${style.header} ${style.desktop}`}>
          <div className={style.flex}>
            <div className={style.personBlock}>
              <img src={person} alt=""/>
                {route === 'acquiring' ?
                  <div className={style.person}>{`${firstName} ${lastName}`}</div>
                        :
                  <div className={style.person}>{`${firstNameP2P} ${lastNameP2P}`}</div>}
            </div>
            {/*<MobileFilter />*/}
            <MyBtnBlack name={t("header.signout")} onClick={() => setIsShowConfirmModal(true)}/>
          </div>
        </div>
        <div className={style.mobile}>
          <div className={style.header_buttons_wrapper}>
            <Button type="text"
                    icon={props.collapsed ? <MobileMenuSvg/> : <MobileMenuCloseSvg/> }
                    onClick={() => props.setCollapsed(!props.collapsed)}
                    style={{
                      zIndex: 24,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '16px',
                      width: "fit-content",
                      height: "fit-content",
                      position: "relative"
                    }}/>
            <div>
              <MyBtnBlack name={t("header.signout")} onClick={() => setIsShowConfirmModal(true)}/>
            </div>
          </div>
          <div className={style.personBlock}>
            <UserIconSvg size={24} />
              {route === 'acquiring' ?
                <div className={style.person}>{`${firstName} ${lastName}`}</div>
                  :
                <div className={style.person}>{`${firstNameP2P} ${lastNameP2P}`}</div>}
          </div>
        </div>
      </div>

  );
};



export default LoginHeader;
