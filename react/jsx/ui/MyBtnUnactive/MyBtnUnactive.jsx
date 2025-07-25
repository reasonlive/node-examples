import React from 'react';
import s from './MyBtnUnactive.module.css'

const MyBtnUnactive = ({name , padding, ...props}) => {
  const locale = localStorage.getItem('lang')
    return (
        <div>
            <button {...props} className={`${s.MyBtn} ${padding && s.padding} ${props.className}   ${locale === 'Ru' || locale === "Fr" && s.rus}`}>{name}</button>
        </div>
    );
};

export default MyBtnUnactive;
