export default class CurrencyHelper {
    static getCurrencyFromAddress(address) {
        if (address) {
            switch (address.format) {
                case 'HEX':
                    return 'ETH';
                case 'TRON':
                    return 'TRX';
                default:
                    return 'BTC';
            }
        }

        return null;
    }

    static getCurrencyFromUsdtToken(standard) {
        if (standard) {
            switch (standard) {
                case 'BEP20':
                case 'ERC20':
                    return 'ETH';
                case 'TRC20':
                    return 'TRX';
                default:
                    return 'BTC';
            }
        }

        return null;
    }

    static getCurrencyFullName(currency) {
        switch (currency) {
            case 'BTC':
                return 'Bitcoin'
            case 'TRX':
                return 'Tron'
            case 'ETH':
                return 'Ethereum'
            case 'USDT':
                return 'Tether'
            default:
                return 'Tether';
        }
    }
}