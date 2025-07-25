"use server";
import Image from "next/image";

import {
  AccessIcon,
  ArrowRightIcon,
  IconMobileIcon,
  RuIcon,
  TicketIcon,
} from "~/shared/assets/icons";
import { FlyMoneyImage, HeaderCarImage } from "~/shared/assets/images";
import { Button } from "~/shared/ui";

import styles from "./HeaderLineTop.module.css";

export const HeaderLineTop = async () => {
  return (
    <div className={styles.headerLineTop}>
      <div className={styles.headerLineLeft}>
        <div className={styles.levelItem}>
          <Button
            className={`${styles.Button} ${styles.miniIcon} ${styles.themeDefault} ${styles.ttn} ${styles.headerButton}`}
            disabled
          >
            <AccessIcon />
          </Button>
          <Button
            className={`${styles.Button} ${styles.dfAicJcc} ${styles.miniIcon} ${styles.themeDefault} ${styles.ttn} ${styles.headerButton}`}
            disabled
          >
            <IconMobileIcon className={`${styles.icon} ${styles.mobileIcon}`} />
          </Button>
        </div>
        <div className={styles.divider}></div>
        <a className={styles.FreeMoneyLink_root_sudSD} href="/free-money">
          <Image
            alt="fly money"
            className={styles.FreeMoneyLink_image}
            src={FlyMoneyImage}
          />

          <span className={styles.FreeMoneyLink_text}>
            Бонус на основной счет 100%
          </span>
          <ArrowRightIcon
            className={`${styles.icon} ${styles.iconArrowRight} `}
          />
        </a>
      </div>
      <div className={styles.headerLineRight}>
        <div className={styles.headerLineRightItem}>
          <div className={styles.df}>
            <a className={styles.HeaderTopCarRaffle_root} href="/free-money">
              <span className={styles.HeaderTopCarRaffle_prefix}>
                <TicketIcon />
              </span>
              <p className={styles.HeaderTopCarRaffle_text}>IMBA Розыгрыш</p>
              <Image alt="" className={styles.carImage} src={HeaderCarImage} />
            </a>
          </div>
        </div>
        <div className={styles.headerLineRightItem}>
          <Button className={styles.ChangeLanguage_button}>
            <span className={styles.ChangeLanguage_ButtonTitle_eh_mm}>RU</span>
            <RuIcon className={styles.ruIcon} />
            <div className={styles.CountryIcon_root_Uixdl}></div>
          </Button>
        </div>
      </div>
    </div>
  );
};
