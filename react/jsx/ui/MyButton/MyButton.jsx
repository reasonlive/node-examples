import React from 'react';
import s from './MyButton.module.css'
import cn from "classnames";

const MyButton = ({name, medium, large, primaryBlack, heroButton, ...props}) => {
  const locale = localStorage.getItem('lang')
  return (
        <button  {...props} className={cn(s.button, {
          [s.medium]: medium,
          [s.large]: large,
          [s.primaryBlack]: primaryBlack,
          [s.hero]: heroButton,
        })}>{name}</button>
  );
};

export default MyButton;
