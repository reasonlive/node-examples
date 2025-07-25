import React from 'react'
import s from "./SearchInput.module.css";
import {SearchSvg} from "../../utils/sprite";


export const SearchInput = ({...props}) => {
  return (
      <div className={s.searchWrapper}>
        <div className={s.searchIcon}>
          <SearchSvg/></div>
        <input  {...props} className={s.input}
                placeholder={props.placeholder ? props.placeholder : 'Filter by transaction number'}/>
      </div>
  );
}