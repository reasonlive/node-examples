import React from 'react';
import s from './MyBtnBlack.module.css'
import cn from "classnames";

const MyBtnBlack = ({name, padding, style, popup, ...props}) => {
  return (
      <div>
        <button {...props} style={style}
                className={cn(s.MyBtn, {
                  [s.padding]: padding,
                  [s.popup]: popup,
                })}
        >{name}</button>
      </div>
  );
};


export default MyBtnBlack;
