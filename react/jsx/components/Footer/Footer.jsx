import React from 'react';
import style from "./Footer.module.css";
import logo from "../../assets/img/logo.png";
import {useTranslation} from "react-i18next";

import visa from '../../assets/img/payments/visa.svg';
import mastercard from '../../assets/img/payments/mastercard.svg';
import unionPay from '../../assets/img/payments/unionPay.svg';
import swift from '../../assets/img/payments/swift.svg';
import sepa from '../../assets/img/payments/sepa.svg';
import bitcoin from '../../assets/img/payments/bitcoin.svg';
import etherium from '../../assets/img/payments/etherium.svg';
import thron from '../../assets/img/payments/thron.svg';
import {NavLink} from "react-router-dom";


const Footer = () => {
  const {t} = useTranslation()

  return (
      <div className={style.footer}>
        <div className={style.footerMain}>


          <div className={style.navFooter}>
            <p className={style.footer_title}>{t("footer.navigation")}</p>
            <ul className={style.menu_list}>
              <NavLink activeclass={style.active} to="/">
                <li>{t('footer.home')}</li>
              </NavLink>
              <NavLink activeclass={style.active} to={"/pricing"}>
                <li>{t("header.pricing")}</li>
              </NavLink>
              <NavLink activeclass={style.active} to={"/api"}>
                <li>{t("header.api")}</li>
              </NavLink>
              <NavLink activeclass={style.active} to={"/privacy-policy"}
              > <li>{t("privacy.title")}</li></NavLink>
            </ul>
          </div>

          <div className={style.contacts_block}>
            <p className={style.footer_title}>{t("footer.contactUs")}</p>

            <div className={style.contactsBlockWrapper}>
                 <span className={style.addressBlockItemMobile}>
                            <img src={require('../../assets/img/location.png')} alt=""/><p>Ocean Business Plaza, Office 25, 19th Floor. Aquilino De La Guardia St, With 47th St, Marbella, Código Postal 7082, Panama City, Panama</p>
                        </span>

              <span className={style.contacts_block_item}>
                          <a href={process.env.APP_EMAIL} className={style.tel}>

                                <img src={require('../../assets/img/mail.png')}
                                     alt=""/>
                                <p>{process.env.APP_NAME}</p>
                              </a>
                </span>
              <span className={style.contacts_block_item}>
                             <a target='_blank' className={style.tel}>
                                 <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                       <path fillRule="evenodd" clipRule="evenodd"
                                             d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26ZM17.2677 18.9091C11.6472 18.9091 7.09091 14.3528 7.09091 8.73232C7.09091 8.47874 7.10018 8.22733 7.11841 7.97841C7.13933 7.69273 7.14979 7.54989 7.22465 7.41987C7.28666 7.31218 7.39654 7.21005 7.50847 7.15608C7.64361 7.09091 7.80123 7.09091 8.11647 7.09091H9.96622C10.2313 7.09091 10.3639 7.09091 10.4775 7.13454C10.5779 7.17308 10.6672 7.23567 10.7377 7.31683C10.8176 7.40871 10.8629 7.53328 10.9535 7.78241L11.7191 9.88791C11.8245 10.1778 11.8772 10.3227 11.8683 10.4602C11.8604 10.5815 11.819 10.6981 11.7487 10.7973C11.6691 10.9097 11.5368 10.989 11.2723 11.1477L11.2723 11.1477L10.3737 11.6869C11.1629 13.426 12.5733 14.8383 14.3131 15.6263L14.8523 14.7277C15.011 14.4632 15.0903 14.3309 15.2027 14.2513C15.3019 14.181 15.4185 14.1396 15.5398 14.1317C15.6773 14.1228 15.8222 14.1755 16.1121 14.2809L18.2176 15.0465C18.4667 15.1371 18.5913 15.1824 18.6832 15.2622C18.7643 15.3328 18.8269 15.4221 18.8655 15.5225C18.9091 15.6361 18.9091 15.7687 18.9091 16.0338V17.8835C18.9091 18.1988 18.9091 18.3564 18.8439 18.4915C18.79 18.6035 18.6878 18.7133 18.5801 18.7753C18.4501 18.8502 18.3073 18.8607 18.0216 18.8816C17.7727 18.8998 17.5213 18.9091 17.2677 18.9091Z"
                                             fill="#EDEDED"/>
                                 </svg>
                                <p>+507 833 81 44</p>
                             </a>
                </span>
              <span className={style.addressBlockItemMobile}>
                           <p><b>Reg. number:</b> 1404013365</p>
                        </span>
              <span className={style.contacts_block_item}>
                  <a href="https://t.me/+250792404749" className={style.telegram} target='_blank'>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26ZM5.98125 12.047L18.5457 7.22523C19.4847 6.85008 19.853 7.2815 19.637 8.26066L17.5567 18.0637C17.3982 18.8592 16.9974 19.1393 16.2607 18.7053L13.0891 16.3417L11.2372 18.0856C11.0097 18.2815 10.6531 18.2796 10.4584 17.8855L10.6686 15.333L17.3622 9.30166C17.7371 8.97063 17.3015 8.89039 16.8759 9.1913L9.08236 13.9847L5.85904 12.9652C5.30462 12.7212 5.47563 12.2715 5.98125 12.047Z"
                            fill="#EDEDED"/>
                    </svg>
                  </a>

                  <a href="https://wa.me/+250791381556" className={style.wa} target='_blank'>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26ZM9.27621 7.0499C12.6012 5.03739 16.8888 5.99989 18.9888 9.23742C21.0013 12.5624 20.0388 16.85 16.8013 18.95C15.6638 19.65 14.3513 20 13.0387 20C11.8137 20 10.5887 19.65 9.45121 19.0375L9.18871 18.8625L6.56369 19.5625L7.2637 16.9375L7.0887 16.675C4.98868 13.4374 6.03869 9.06242 9.27621 7.0499ZM15.7513 16.9375C16.3638 16.85 16.8013 16.5 17.1513 15.975C17.3263 15.7125 17.3263 15.3625 17.2388 15.1C17.1513 15.0125 16.9763 14.925 16.8013 14.8375L16.8013 14.8375L15.4013 14.1375C15.2263 14.05 15.1388 14.05 14.9638 14.225C14.7888 14.4 14.3513 14.8375 14.2638 15.0125C14.1762 15.1875 14.0012 15.1875 13.8262 15.1C13.2137 14.8375 12.6887 14.4875 12.1637 14.05C11.7262 13.6125 11.2887 13.0874 10.9387 12.5624C10.8512 12.3874 10.9387 12.2124 11.1137 12.1249C11.1575 12.0812 11.2012 12.0156 11.245 11.9499C11.2887 11.8843 11.3325 11.8187 11.3762 11.7749C11.4637 11.6874 11.5512 11.5124 11.4637 11.3374C11.5512 11.2499 11.5512 11.0749 11.4637 10.9874C11.4637 10.9196 11.2008 10.2733 11.001 9.78234C10.9431 9.64001 10.8906 9.51075 10.8512 9.41242C10.7637 9.06242 10.5887 9.06242 10.4137 9.06242H9.97622C9.80122 9.06242 9.62621 9.14992 9.45121 9.32492C9.01371 9.76242 8.75121 10.3749 8.75121 11.0749C8.83871 11.8624 9.10121 12.6499 9.62621 13.2624C10.5012 14.575 11.7262 15.7125 13.2137 16.4125C14.7042 17.0086 15.2426 16.9701 15.5857 16.9456C15.6455 16.9413 15.6993 16.9375 15.7513 16.9375Z"
                            fill="#EDEDED"/>
                    </svg>
                  </a>
                </span>
            </div>
          </div>

          <div className={style.addressBlock}>
          <span className={style.addressBlockItem}>
                            <img src={require('../../assets/img/location.png')} alt=""/><p>Ocean Business Plaza, Office 25, 19th Floor.<br/> Aquilino De La Guardia St, With 47th St,<br/> Marbella, Código Postal 7082,<br/> Panama City, Panama</p>
                        </span>

            <span className={style.addressBlockItem}>
                           <p><b>Reg. number:</b> 1404013365</p>
                        </span>
          </div>


          <div className={style.mobileCopyright}>
            <div>
              <a href="https://t.me/+250792404749" className={style.telegram} target='_blank'>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26ZM5.98125 12.047L18.5457 7.22523C19.4847 6.85008 19.853 7.2815 19.637 8.26066L17.5567 18.0637C17.3982 18.8592 16.9974 19.1393 16.2607 18.7053L13.0891 16.3417L11.2372 18.0856C11.0097 18.2815 10.6531 18.2796 10.4584 17.8855L10.6686 15.333L17.3622 9.30166C17.7371 8.97063 17.3015 8.89039 16.8759 9.1913L9.08236 13.9847L5.85904 12.9652C5.30462 12.7212 5.47563 12.2715 5.98125 12.047Z"
                        fill="#EDEDED"/>
                </svg>
              </a>

              <a href="https://wa.me/+250791381556" className={style.wa} target='_blank'>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26ZM9.27621 7.0499C12.6012 5.03739 16.8888 5.99989 18.9888 9.23742C21.0013 12.5624 20.0388 16.85 16.8013 18.95C15.6638 19.65 14.3513 20 13.0387 20C11.8137 20 10.5887 19.65 9.45121 19.0375L9.18871 18.8625L6.56369 19.5625L7.2637 16.9375L7.0887 16.675C4.98868 13.4374 6.03869 9.06242 9.27621 7.0499ZM15.7513 16.9375C16.3638 16.85 16.8013 16.5 17.1513 15.975C17.3263 15.7125 17.3263 15.3625 17.2388 15.1C17.1513 15.0125 16.9763 14.925 16.8013 14.8375L16.8013 14.8375L15.4013 14.1375C15.2263 14.05 15.1388 14.05 14.9638 14.225C14.7888 14.4 14.3513 14.8375 14.2638 15.0125C14.1762 15.1875 14.0012 15.1875 13.8262 15.1C13.2137 14.8375 12.6887 14.4875 12.1637 14.05C11.7262 13.6125 11.2887 13.0874 10.9387 12.5624C10.8512 12.3874 10.9387 12.2124 11.1137 12.1249C11.1575 12.0812 11.2012 12.0156 11.245 11.9499C11.2887 11.8843 11.3325 11.8187 11.3762 11.7749C11.4637 11.6874 11.5512 11.5124 11.4637 11.3374C11.5512 11.2499 11.5512 11.0749 11.4637 10.9874C11.4637 10.9196 11.2008 10.2733 11.001 9.78234C10.9431 9.64001 10.8906 9.51075 10.8512 9.41242C10.7637 9.06242 10.5887 9.06242 10.4137 9.06242H9.97622C9.80122 9.06242 9.62621 9.14992 9.45121 9.32492C9.01371 9.76242 8.75121 10.3749 8.75121 11.0749C8.83871 11.8624 9.10121 12.6499 9.62621 13.2624C10.5012 14.575 11.7262 15.7125 13.2137 16.4125C14.7042 17.0086 15.2426 16.9701 15.5857 16.9456C15.6455 16.9413 15.6993 16.9375 15.7513 16.9375Z"
                        fill="#EDEDED"/>
                </svg>
              </a>
            </div>
          </div>

          <div className={style.mobilePayments}>
            <div className={style.mobilePaymentsWrapper}>
              <a href="/CertificateOfPCIDSSCompliance.pdf" target='_blank'> <img
                  src={require('../../assets/img/PCI.png')} style={{cursor: "pointer", width: 77.5, height: 60}}
                  alt=""/></a>

              <div className={style.payments_block_wrapper}>
                <div className={style.payments_block}>
                  <img src={visa} alt="visa"/>
                  <img src={mastercard} alt="mastercard"/>
                  <img src={unionPay} alt="union"/>
                  <img src={swift} alt="swift"/>
                  <img src={sepa} alt="sepa"/>
                </div>
                <div className={`${style.payments_block} ${style.icons}`}>
                  <img src={bitcoin} alt="visa"/>
                  <img src={etherium} alt="mastercard"/>
                  <img src={thron} alt="union"/>
                </div>
              </div>
            </div>
            <div className={style.mobileCopyrightFooter}>
              <p className={style.copyrightMini}>
                  {process.env.APP_NAME} S.A</p>
              <p className={style.copyrightMini}>
                Copyright © 2023 All rights reserved</p>
            </div>
          </div>
            <div className={style.logo_block}>
                <div className={style.logo}>
                    <img src={logo} alt=""/>
                    <p className={style.logo_title}>
                        {process.env.APP_NAME}
                    </p>
                </div>
                <a href="/CertificateOfPCIDSSCompliance.pdf" target='_blank'>
                    <img src={require('../../assets/img/PCI.png')} style={{cursor: "pointer"}} alt=""/>
                </a>
            </div>
        </div>



        <div className={style.secondFooter}>

          <div className={style.info_wrapper}>
            <p className={style.copyright}>
                {process.env.APP_NAME} S.A</p>
            <div className={style.divider}></div>

            <p className={style.copyright}>
              Copyright © 2023 All rights reserved</p>
          </div>

          <div className={style.payments_block}>
            <img src={require('../../assets/img/payments/visa.png')} alt="visa"/>
            <img src={require('../../assets/img/payments/mastercard.png')} alt="mastercard"/>
            <img src={require('../../assets/img/payments/union_one.png')} alt="union"/>
            <img src={require('../../assets/img/payments/swift.png')} alt="swift"/>
            <img src={require('../../assets/img/payments/sepa.png')} alt="sepa"/>
            <img src={require('../../assets/img/payments/bitcoin.png')} alt="visa"/>
            <img src={require('../../assets/img/payments/Union.png')} alt="mastercard"/>
            <img src={require('../../assets/img/payments/t.png')} alt="union"/>
          </div>
        </div>

      </div>
  )
      ;
};


export default Footer;
