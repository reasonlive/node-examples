import React from 'react';
import s from './MyCardButton.module.css'
import cn from "classnames";
import icon from './../../assets/img/deposit.svg'

const MyCardButton = ({icon, type, inactive, ...props}) => {
  return (
      <div>
        <button {...props} className={cn(s.button, {
          [s.secondaryBtn]: type === 'export',
          [s.inactive]: inactive
        })}>{<img src={require(`./../../assets/img/${icon}.svg`)} className={s.icon}/>} </button>
      </div>
  );
};

export default MyCardButton;
