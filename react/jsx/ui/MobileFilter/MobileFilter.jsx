import React, {useState} from 'react'
import {Dropdown, Space} from 'antd';
import s from './MobileFilter.module.css'
import {MenuFilterSvg} from "../../utils/sprite";
import {useDispatch} from "react-redux";
import {setSort} from "../../store/slices/AcquiringSlices/DataReducer";
import {setActiveSort} from "../../store/slices/AcquiringSlices/AccountsReducer";

const items = [
  {
    label: "Date (desc)",
    key: "dateDesc",

  },
  {
    label: "Date (asc)",
    key: "dateAsc",
  },
  {
    label: "Amount (desc)",
    key: "amountDesc",
  },
  {
    label: "Amount (asc)",
    key: "amountAsc",
  },
];
export default function MobileFilter(props) {
  const dispatch = useDispatch();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const contentStyle = {
    width: '128px',
    margin: '0 auto',
    transform: 'translateX(5px)'
  };

  const menuStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.08)',
    borderRadius: '16px',

  };

  const handleItemClick = ({key, item}) => {
    if (key === 'dateDesc') {
      dispatch(setSort({order: 'descend', columnKey: 'transaction_date_time'}))
    }
    if (key === 'dateAsc') {
      dispatch(setSort({order: 'ascend', columnKey: 'transaction_date_time'}))
    }
    if (key === 'amountDesc') {
      dispatch(setSort({order: 'descend', columnKey: "transaction_amount"}))
    }
    if (key === 'amountAsc') {
      dispatch(setSort({order: 'ascend', columnKey: "transaction_amount"}))
    }
    if (key === 'dateDesc' && props.walletFilter) {
      dispatch(setActiveSort({order: 'descend', field: 'date'}))
    }
    if (key === 'dateAsc' && props.walletFilter) {
      dispatch(setActiveSort({order: 'ascend', field: 'date'}))
    }
    if (key === 'amountDesc' && props.walletFilter) {
      dispatch(setActiveSort({order: 'descend', columnKey: "amount"}))
    }
    if (key === 'amountAsc' && props.walletFilter) {
      dispatch(setActiveSort({order: 'ascend', columnKey: "amount"}))
    }
  };


  return (
      <Dropdown
          placement={'bottomLeft'}
          onOpenChange={() => {
            setIsDropdownOpen(!isDropdownOpen)
          }}
          overlayClassName={'dropdown'}
          trigger={'click'}
          menu={{items, onClick: handleItemClick}}
          dropdownRender={(menu) => (
              <div style={contentStyle}>
                {React.cloneElement(menu, {style: menuStyle})}
              </div>
          )}
      >
        <a onClick={(e) => {
          e.preventDefault()
        }}>
          <Space>
            <MenuFilterSvg/>
            <img className={isDropdownOpen ? `${s.dropdownIcon} ${s.open}` : s.dropdownIcon}
                 src={require('../../assets/img/arrow_down.png')} width={8} height={4}/>
          </Space>
        </a>
      </Dropdown>
  );
}
