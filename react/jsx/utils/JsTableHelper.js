import CurrencyHelper from "./CurrencyHelper";

export default class JsTableHelper {
    static findItem(items, property, value, callback = null) {
        if (items.length) {
            if (value) {
                const found = items.filter(item => item[property] === value);
                if (callback) {
                    callback(found)
                }
                else {
                    return found;
                }
            }
            else {
                callback && callback(items)
            }
        }
    }

    static filterTransactions(transactions, wallet, callback = null) {
        let {coin, id} = wallet;

        let filteredTxs = coin === 'USDT'
            ? transactions.filter(tx => tx.currency === coin && tx.tokenStandard === id.split('-')[2])
            : transactions.filter(tx => tx.currency === coin);

        if (callback) {
            callback(filteredTxs)
        }
        else {
            return filteredTxs;
        }
    }

    static filterAddresses(addresses, wallet, callback = null) {
        let format = '';
        let currency = null;

        if (wallet.coin === 'USDT') {
            currency = CurrencyHelper.getCurrencyFromUsdtToken(wallet.id.split('-')[2]);
        }

        switch (currency ?? wallet.coin) {
            case 'ETH': format = 'HEX';break;
            case 'TRX': format = 'TRON';break;
            default: format = 'P2WPKH';
        }

        const filteredAddresses = addresses.filter(addr => addr.format === format);
        if (callback) {
            callback(filteredAddresses)
        }
        else {
            return filteredAddresses;
        }
    }
}