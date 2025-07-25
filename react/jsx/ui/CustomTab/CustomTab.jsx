import React from 'react';
import s from './CustomTab.module.css'
import cn from "classnames";

const CustomTab = ({name, active, formButton, ...props}) => {
  return (
        <button {...props}
                className={cn(s.customTab, {
                  [s.active]: active,
                  [s.formButton]: formButton,
                })}
        >{name}</button>
  );
};


export default CustomTab;
