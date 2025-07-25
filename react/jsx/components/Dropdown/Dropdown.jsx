import React from "react";

export const Dropdown = ({...props}) => {
    return (
        <div>

            <input  {...props} className={s.input}
                    placeholder={props.placeholder ? props.placeholder : 'Filter by transaction number'}
            />
        </div>
    );
}