import React from 'react';
import s from './TableCard.module.css'
import {useTranslation} from "react-i18next";

const TableCard = (props) => {
  const {t} = useTranslation();

  return (<div className={s.tableCardWrapper}>
    <div className={s.line}>
      <p className={s.lineTitle}>{t('personal.transactionHistory.date')}</p>
      <p className={s.lineValue}>{props.item.date}</p>
    </div>
    <div className={s.line}>
      <p className={s.lineTitle}>Internal ID</p>
      <p className={s.lineValue}>{props.item.id}</p>
    </div>
    <div className={s.line}>
      <p className={s.lineTitle}>{t('personal.transactionHistory.time')}</p>
      <p className={s.lineValue}>{props.item.time}</p>
    </div>
    <div className={s.line}>
      <p className={s.lineTitle}>{t('personal.transactionHistory.cardNumber')}</p>
      <p className={s.lineValue}>{props.item.cardNumber}</p>
    </div>
    <div className={s.line}>
      <p className={s.lineTitle}>{t('personal.transactionHistory.status')}</p>
      <p className={s.lineValue}>{props.item.status}</p>
    </div>
    <div className={s.line}>
      <p className={s.lineTitle}>{t('personal.transactionHistory.amount')}</p>
      <p className={s.lineValue}>{props.item.amount}</p>
    </div>
    <div className={s.refund} onClick={() => props.refundHandler(props.item)}>
      <div   className={`${props.item.status === 'Approved' ? s.refundWrapper : `${s.refundWrapper} ${s.disabled}`}`}>
        <img src={require('../../assets/img/arrow_refund.png')} alt=""/>
      </div>
      <p className={s.lineTitle}>{t('personal.transactionHistory.refund')}</p>
    </div>
  </div>)
}

export default TableCard;
