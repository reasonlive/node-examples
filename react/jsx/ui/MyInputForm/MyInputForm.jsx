import React from 'react';
import s from './MyInputForm.module.css'

const MyInputForm = (props) => {
  return (
      <div className={props.maxWidth ? s.inputWrapper : ''}>
        <input  {...props}
                className={props.error ? `${s.input} ${s.error}` : `${s.input}`} placeholder={props.placeholder}/>
      </div>
  );
};

export default MyInputForm;
