import React from "react";
import logo from "../../../assets/img/logo.svg"
import style from "./ApiHeader.module.css"
import MyBtnOrange from "../../../ui/MyBtnOrange/MyBtnOrange";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
import LanguagePicker from "../../../ui/LanguagePicker/LanguagePicker";
import {NavLink} from "react-router-dom";
import person from "../../../assets/img/personIcon.png";
import {useSelector} from "react-redux";

function ApiHeader() {

    const isAuth = useSelector(state => state.auth.isAuth)
    const navigate = useNavigate();
    const {t} = useTranslation();
    const redirect = () => {
        navigate('/login')
    }

    return (
        <div className={style.header}>
            <div className={style.logo_block}>
                <div className={style.logo} onClick={() => {
                    navigate('/')
                }}>
                    <img src={logo} alt=""/>
                    <div className={style.company_name}>
                        {process.env.APP_NAME}
                    </div>
                </div>
                <div className={style.flex}>
                    <div className={style.home} onClick={() => {
                        navigate('/')
                    }}>
                        {t("apiguide.home")}
                    </div>
                </div>
            </div>
            <div className={style.flex}>
                <LanguagePicker />
                {
                    isAuth
                        ? <NavLink to={"/personal/acquiring-transactions"}>
                            <img src={person} alt=""/>
                        </NavLink>
                        : <MyBtnOrange name={t("apiguide.button")} onClick={() => redirect()}/>

                }

            </div>
        </div>
    );
}

export default ApiHeader;
