import React from 'react';
import s from './MyBtnOrange.module.css'
import cn from "classnames";

const MyBtnOrange = ({name, secondary, disabled, popup, outline, download, ...props}) => {
  const locale = localStorage.getItem('lang')
  return (
      <div>
        <button disabled={disabled} {...props} className={cn(s.MyBtn, {
          [s.secondaryBtn]: secondary,
          [s.popupButton]: popup,
          [s.outline]: outline,
          [s.disabled]: disabled,
          [s.download]: download,
          [s.french]: locale === 'Fr'
        })}>{name}</button>
      </div>
  );
};

export default MyBtnOrange;
