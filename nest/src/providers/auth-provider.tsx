import { AuthBindings } from "@refinedev/core";
import bcrypt from 'bcryptjs';
import {decode, JwtPayload, Secret} from 'jsonwebtoken';
import config from '../config';
/**
 * Check out the Auth Provider documentation for detailed information
 * https://refine.dev/docs/api-reference/core/providers/auth-provider/
 **/
export const authProvider: AuthBindings = {
    check: async (params) => {
        if (sessionStorage.getItem('t')) {
            return {
                authenticated: true,
            }
        }

        return {
            authenticated: false, // or false if the account is not authenticated
            redirectTo: '/login',
            logout: true,
            error: {
                message: "Check failed",
                name: "Unauthorized",
            },
        };
    },

    login: async (params) => {
        const response = await fetch(
            (config.ENV === 'dev' ? config.API_URL_DEV : config.API_URL_PROD) + '/api/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(params)
        })

        const data = await response.json();
        if (data.token) {
            const userData = decode(data.token) as any;
            if (userData?.admin) {
                sessionStorage.setItem('t', data.token);

                return {
                    success: true,
                    redirectTo: '/users'
                }
            }
        }

        return {
            success: false, // or false if the login is not successful
            redirectTo: "/login",
        };
    },

    logout: async (params) => {
        sessionStorage.clear();

        return {
            success: true, // or false if the logout is not successful
            redirectTo: "/login",
        };
    },

    register: async (params) => {
        //console.log("register", params);

        // TODO: send request to the API to login

        return {
            success: true, // or false if the register is not successful
            redirectTo: "/",
        };
    },

    forgotPassword: async (params) => {
        //console.log("forgotPassword", params);

        // TODO: send request to the API to forgot password

        return {
            success: true, // or false if the forgot password is not successful
            redirectTo: "/update-password",
        };
    },

    updatePassword: async (params) => {
        //console.log("updatePassword", params);

        // TODO: send request to the API to update password

        return {
            success: true, // or false if the update password is not successful
            redirectTo: "/login",
        };
    },

    getPermissions: async (params) => {
        //console.log("getPermissions", params);

        // TODO: send request to the API to get permissions

        return {
            permissions: [],
        };
    },

    getIdentity: async (params) => {
        //console.log("getIdentity", params);

        // TODO: send request to the API to get identity

        return {};
    },

    onError: async (params) => {
        //console.log("onError", params);

        // TODO: do something with the error

        return {
            logout: true, // or false if you want to continue
            redirectTo: "/login", // or undefined if you want to continue
        };
    },
};
