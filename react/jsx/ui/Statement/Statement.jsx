import React, {useEffect, useState} from 'react';
import s from './Statement.module.css'
import {useTranslation} from "react-i18next";
import {AuthAPI} from "../../ajax/Api";
import {useDispatch} from "react-redux";
import {setIsLoading} from "../../store/slices/AcquiringSlices/DataReducer";


const Statement = ({walletStatement}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const getStatement = async (e) => {
    const type = e.target.textContent.toLowerCase()
    const token = localStorage.getItem('token')
    dispatch(setIsLoading(true))
    if (walletStatement) {
      AuthAPI.getWalletStatement(token, type).then(res => {
            const url = `${process.env.BACKEND_API_URL}${res.data.result.fileLink}`;
            window.open(url, '_blank');
          }
      ).finally(
          dispatch(setIsLoading(false))
      )
    } else {
      const response = await AuthAPI.getStatement(token, type)
      let url = `${process.env.BACKEND_API_URL}${response.data.result.fileLink}`;
      setTimeout(() => {
        window.open(url, '_blank')
      }, 0)
      await dispatch(setIsLoading(false))
    }
  }


  return (
      <div className={s.statementWrapper} onClick={(e) => getStatement(e)}>
        <p className={s.downloadTitle}>{t("personal.transactionHistory.download")}</p>
        <p className={s.buttonTitle}>PDF</p>
        <div className={s.separator}/>
        <p className={s.buttonTitle}>XLSX</p>
        <div className={s.separator}/>
        <p className={s.buttonTitle}>CSV</p>
      </div>
  )
}


export default Statement
