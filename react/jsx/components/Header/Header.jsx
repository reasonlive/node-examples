import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import Nav from "../Nav/Nav";
import logo from "../../assets/img/logo.svg"
import style from "./Header.module.css"
import MyBtnOrange from "../../ui/MyBtnOrange/MyBtnOrange";
import {useTranslation} from "react-i18next";
import LanguagePicker from "../../ui/LanguagePicker/LanguagePicker";
import person from "../../assets/img/personIcon.png";
import s from "../../pages/PaymentMethods/DropDown/DropDown.module.css";
import cn from 'classnames';

function Header() {
  const [scroll, setScroll] = useState(0)
  const {t} = useTranslation()
  const [openBurger, setOpenBurger] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false)
  const {route} = useSelector(store => store.auth)
  const {routeP2P} = useSelector(store => store.authP2P)
  const {isAuth} = useSelector(state => state.auth)
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (!event.target.closest(`.${s.DropDownWrapper}`)) {
      setShowDropDown(false);
    }
  };

  const changeOpenBurger = () => {
    setOpenBurger(!openBurger)
  }

  useEffect(() => {
    const handleScroll = event => {
      setScroll(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const getMainRoute = () => {
    if (route) {
      return "/acquiring/personal"
    }
    if (routeP2P) {
      return "/P2P/personal"
    }
    /*if (routeCrypto) {
      return "/crypto/accounts"
    }*/
  }

  return (
      <>
        <div className={style.burger} onClick={changeOpenBurger}>
          <span className={style.burger1} style={{transform: openBurger ? 'rotate(45deg)' : 'rotate(0)', backgroundColor: openBurger ? '#ABABAB' : '#333333'}}></span>
          <span className={style.burger2} style={{transform: openBurger ? 'translateX(100%)' : 'translateX(0)', opacity: openBurger ? 0 : 1}}></span>
          <span className={style.burger3} style={{transform: openBurger ? 'rotate(-45deg)' : 'rotate(0)', backgroundColor: openBurger ? '#ABABAB' : '#333333'}}></span>
        </div>
        <div className={cn(style.header, {
          [style.sticky]: scroll > 0,
        })}>
          <div className={style.logo_block} >
            <img onClick={() => navigate('/')} src={logo} alt=""/>
            <div className={style.logo} onClick={() => navigate('/')}>
              BingoPay
            </div>
            <div className={openBurger ?  style.nav : style.nav2}>
              <Nav/>
            </div>
          </div>
          <div className={style.flex}>

            <LanguagePicker/>
            <div className={style.btnWrapper}>
              {
                /*isAuth
                    ?
                    <NavLink to={getMainRoute()}>
                      <img src={person} alt=""/>
                    </NavLink>
                    :*/
                    <div className={s.DropDownWrapper}>
                      <MyBtnOrange style={{width: "160px", marginTop: 0, fontSize: "14px"}} name={t("header.signin")} onClick={() => setShowDropDown(!showDropDown)}/>
                      <div className={showDropDown ? s.DropDownList : s.NoneDropDown}>
                        <div className={s.DropDownListItem}>
                          <NavLink
                              className={({isActive}) =>
                                  isActive ? `${style.active}` : `${style.link}`
                              }
                              to={`/login`}
                          >{t("personal.acquiringTransactions")}
                          </NavLink>
                        </div>
                        <div className={s.DropDownListItem}>
                          <NavLink
                              className={({isActive}) =>
                                  isActive ? `${style.active}` : `${style.link}`
                              }
                              to={`/loginP2P`}
                          >P2P Account
                          </NavLink>
                        </div>
                        <div className={s.DropDownListItem}>
                          <NavLink
                              className={({isActive}) =>
                                  isActive ? `${style.active}` : `${style.link}`
                              }
                              to={`/login-crypto`}
                          >Crypto Account
                          </NavLink>
                        </div>
                      </div>
                    </div>
              }
            </div>
          </div>
        </div>
      </>
  );

}

export default Header;
