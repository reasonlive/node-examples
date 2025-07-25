import React from 'react'
import {Spin} from "antd";
import s from './Loader.module.css'


export const Loader = () => {
  return (
      <div className={s.wrapper}>
      <Spin
          className={s.spinner}
          style={{
            color: '#3F3F3F',
            fontFamily: 'Cera Pro',
            fontWeight: '400',
            fontSize: 16,
            lineHeight: '20px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: "center",
            gap: '20px',
          }} tip="Loading..." size={'large'}/>
      </div>
  )
}