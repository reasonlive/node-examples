import React, {useEffect, useState} from "react";
import s from './Burger.module.css';

const Burger = ({hidden, onToggle, collapsed}) => {
    const [openedBurger, setOpenedBurger] = useState(false);

    useEffect(() => {
        if (collapsed !== undefined && collapsed) {
            setOpenedBurger(false)
        }
    }, [collapsed]);

    return (
        <div
            style={hidden ? {display: 'none'} : {}}
            className={s.burger}
            onClick={() => {
                setOpenedBurger(!openedBurger)
                onToggle()
            }}
        >
            <span className={s.burgerItem} style={{
                transform: openedBurger ? 'rotate(45deg)' : 'rotate(0)',
                backgroundColor: openedBurger ? '#ABABAB' : '#333333'
            }}></span>
            <span className={s.burgerItem} style={{
                transform: openedBurger ? 'translateX(100%)' : 'translateX(0)',
                opacity: openedBurger ? 0 : 1
            }}></span>
            <span className={s.burgerItem} style={{
                transform: openedBurger ? 'rotate(-45deg)' : 'rotate(0)',
                backgroundColor: openedBurger ? '#ABABAB' : '#333333'
            }}></span>
        </div>
    )
}

export default Burger;