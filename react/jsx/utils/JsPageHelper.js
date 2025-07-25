import {CopySvg} from "./sprite";
import s from "../components/Crypto/TransactionTable/TransactionTable.module.css";
import React from "react";

export default class JsPageHelper {
    static formatDate(date) {
        return date instanceof Date
            ? date.toLocaleString('ru-RU')
            : new Date(date).toLocaleString('ru-RU').replace(',', '')
    }

    static renderDate(date) {
        return (
            <div>
                {this.formatDate(date)}
            </div>
        )
    }

    static renderShortCopyableString(val, maxLen = 10) {
        return (
            <div>
                <span id={val}>{val.slice(0, maxLen) + '...'}</span>
                <CopySvg onClick={(e) => JsPageHelper.copyItemToBuffer(e, val)} className={s.copyable} width={16} height={16}/>
            </div>
        )
    }

    static copyItemToBuffer(clickEvent, value = null){
        const extractValueFromString = (string) => {
            return string?.length > 0 ? string : null;
        }

        if (clickEvent.type === 'click') {
            const copyableValue = extractValueFromString(value)
                ?? extractValueFromString(clickEvent.target?.textContent)
                ?? extractValueFromString(clickEvent.target?.previousSibling?.textContent)
                ?? extractValueFromString(clickEvent.target?.nextSibling?.textContent)
                ?? extractValueFromString(clickEvent.target?.parentElement?.textContent)
                ?? extractValueFromString(clickEvent.target?.parentElement?.previousSibling?.textContent)
                ?? extractValueFromString(clickEvent.target?.parentElement?.nextSibling?.textContent);

            navigator.clipboard.writeText(copyableValue).then(() => console.log(copyableValue + " copied"))
                .catch(() => console.log(copyableValue + " not copied"));
        }
    }
}