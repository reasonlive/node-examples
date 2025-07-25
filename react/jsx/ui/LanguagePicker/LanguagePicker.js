import React, {useEffect, useLayoutEffect, useState} from 'react'
import {Dropdown, Space} from 'antd';
import i18n from "i18next";
import s from './LanguagePicker.module.css'

const items = [
  {
    label: "En",
    key: "En",
  },
  {
    label: "Fr",
    key: "Fr",
  },
  {
    label: "Ru",
    key: "Ru",
  },
  {
    label: "Tr",
    key: "Tr",
  },
  /*
{
    label: "Ar",
    key: "ar",
},*/
];
export default function LanguagePicker() {
  const [language, setLanguage] = useState('En');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const contentStyle = {
    width: '65px',
    margin: '0 auto',
    fontWeight: 700,
  };

  const menuStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.08)',
    borderRadius: '16px',
    fontWeight: 700,
  };

  useLayoutEffect(() => {
    if (localStorage.getItem('lang')) {
      const lang = localStorage.getItem('lang')
      setLanguage(lang)
    }
  }, [])

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language])

  const handleItemClick = ({label, key}) => {
    localStorage.setItem('lang', key)
    setLanguage(key);
  };


  return (
      <Dropdown
          placement={'bottom'}
          onOpenChange={() => {
            setIsDropdownOpen(!isDropdownOpen)
          }}
          overlayClassName={'dropdown'}
          trigger={'click'}
          menu={{items, onClick: handleItemClick}}
          dropdownRender={(menu) => (
              <div className={s.contentStyle}>
                {React.cloneElement(menu, {style: menuStyle})}
              </div>
          )}
      >
        <a onClick={(e) => {
          e.preventDefault()
        }}>
          <Space style={{fontWeight: 700, cursor: 'pointer'}}>
            {language}
            <img className={s.dropdownIcon}
                 src={require('../../assets/img/arrow_down.png')} width={8} height={4}/>
          </Space>
        </a>
      </Dropdown>
  );
}
