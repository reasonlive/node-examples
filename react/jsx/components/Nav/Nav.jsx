import React, {useState} from 'react';
import style from './Nav.module.css';
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import s from "../../ui/LanguagePicker/LanguagePicker.module.css";
import {DropDown} from "../../pages/PaymentMethods/DropDown/DropDown";

const Nav = (props) => {
    const {t} = useTranslation()
    const [showDropDown, setShowDropDown] = useState(false)

  return (
      <div className={style.nav}>
        <NavLink
            className={({isActive}) =>
                isActive ? `${style.active}` : `${style.link}`
            }
            to="/"
        >{t("header.home")}</NavLink>
        <NavLink
            className={({isActive}) =>
                isActive ? `${style.active}` : `${style.link}`
            }
            to={"/pricing"}
        >{t("header.pricing")}</NavLink>
        <NavLink
            className={({isActive}) =>
                isActive ? `${style.active}` : `${style.link}`
            }
            to={"/apiCrypto"}
        >{t("header.apiCrypto")}</NavLink>
        <NavLink
            className={({isActive}) =>
                isActive ? `${style.active}` : `${style.link}`
            }
            to={"/api"}
        >{t("header.api")}</NavLink>
          <DropDown setShowDropdown={setShowDropDown} showDropdown={showDropDown} />
        <NavLink
            className={({isActive}) =>
                isActive ? `${style.active}` : `${style.link}`
            }
            to={"/privacy-policy"}
        >{t("privacy.title")}</NavLink>
      </div>
  );
}

export default Nav;
