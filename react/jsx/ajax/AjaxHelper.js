import axios from 'axios';
export default class AjaxHelper {
    /**
     * Base URL for api requests
     * @type {string|null}
     */
    static URL = null;

    /**
     * @type {AxiosInstance}
     */
    static #instance = null;
    /**
     * Axios settings
     * @type {{headers: {"Content-type": string}}}
     */
    static #settings = {
        headers: {'Content-type': 'application/json'},
    }

    /**
     * Axios instance
     * @returns {AxiosInstance}
     */
    getInstance() {
        if (AjaxHelper.#instance === null) {
            AjaxHelper.#instance = axios.create({baseURL: this.constructor.URL})
        }

        return AjaxHelper.#instance;
    }

    static setSettings(settings) {
        AjaxHelper.#settings = settings;
    }

    static get(endpoint, settings = null) {
        return new this().getInstance().get(endpoint, settings ?? AjaxHelper.#settings);
    }

    static post(endpoint, data, settings = null) {
        return new this().getInstance().post(endpoint, data, settings ?? AjaxHelper.#settings);
    }
}