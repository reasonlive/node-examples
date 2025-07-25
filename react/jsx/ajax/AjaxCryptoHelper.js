import {
    setApiKey,
    setDynamicAddresses,
    setNotificationUrl,
    setAccountCryptoTransactions,
    setAcquiringTransactions,
    setUserToken,

} from "../store/slices/Crypto/CommonReducer";

import AjaxHelper from "./AjaxHelper";


export default class AjaxCryptoHelper extends AjaxHelper {
    static URL = process.env.BACKEND_API_CRYPTO_URL;
    // static URL = 'http://localhost:3030/';

    // endpoints
    static URL_LOGIN = '/api/account/login';
    static URL_WALLETS = '/api/account/wallets/get';
    static URL_TRANSACTIONS = '/api/account/transactions/get';
    static URL_ACQUIRING_TRANSACTIONS = '/api/account/acquiring/transactions/get';
    static URL_SETTINGS = '/api/account/settings/get';
    static URL_ADDRESSES = '/api/account/addresses/get';
    static URL_APIKEY_CREATE = '/api/account/apiKey/create';
    static URL_CALLBACK_CREATE = '/api/account/callbackUrl/create';
    static URL_ADDRESS_CREATE = '/api/account/address/create';

    static setCryptoSettings() {
        const cryptoStorage = JSON.parse(JSON.parse(localStorage['persist:root']).cryptoService)
        const settings = {
            headers: {
                Authorization: `Bearer ${cryptoStorage.token}`,
                'Content-type': 'application/json'
            }
        };

        this.setSettings(settings);
    }

    static async getReduxUserToken(data) {
        try {
            const res = await this.post(this.URL_LOGIN, data);
            if (res.data.error) {
                return {
                    error: res.data.error,
                    message: res.data.message
                }
            }

            return async function (dispatch) {
                dispatch(setUserToken(res.data.token))
            }
        }
        catch (error) {
            console.log(error)
            return {
                error
            }
        }
    }

    static async getReduxApiSettings() {
        this.setCryptoSettings();
        const res = await this.get(this.URL_SETTINGS);

        return async function (dispatch) {
            dispatch(setApiKey(res.data.settings))
            dispatch(setNotificationUrl(res.data.settings))
        }
        //setNotificationUrl(data)
    }

    static async getReduxDynamicAddresses() {
        this.setCryptoSettings();
        const res = await this.get(this.URL_ADDRESSES);
        const addresses = res.data.addresses.sort((a,b) => a.id < b.id ? 1 : -1);
        //console.log(addresses)
        return async function (dispatch) {
            dispatch(setDynamicAddresses(addresses))
        }
    }

    static async getReduxDynamicTransactions() {
        this.setCryptoSettings()
        const res = await this.get(this.URL_ACQUIRING_TRANSACTIONS);

        return async function (dispatch) {
            dispatch(setAcquiringTransactions(res.data))
        }
    }

    static async getReduxAccountWalletsAndTransactions() {
        this.setCryptoSettings()
        const res = await this.get(this.URL_TRANSACTIONS);

        return async function (dispatch) {
            dispatch(setAccountCryptoTransactions(res.data))
        }
    }

    static async setNotificationUrl(url) {
        this.setCryptoSettings()
        const res = await this.post(this.URL_CALLBACK_CREATE, {callbackUrl: url});
        return res.data;
    }

    static async setApiKey() {
        this.setCryptoSettings()
        const res = await this.post(this.URL_APIKEY_CREATE, []);
        return res.data.apiKey;
    }

    static async createDynamicAddress(walletId) {
        this.setCryptoSettings()
        const res = await this.post(this.URL_ADDRESS_CREATE, {walletId});
        return res.data.address;
    }
}