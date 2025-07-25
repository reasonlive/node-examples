import axios from 'axios';

const settings = {
    headers: {'Content-type': 'application/json'},
}

const instanceSender = axios.create({
    baseURL: process.env.SUPPORT_EMAIL_URL,
    ...settings
})

const instance = axios.create({
    baseURL: process.env.BACKEND_API_URL,
    ...settings
})

const instanceP2P = axios.create({
    baseURL: process.env.BACKEND_API_P2P_URL,
    ...settings
})

export const AuthAPI = {
    login(data) {
        return instance.post(`/api/user/login`, data, settings)
    },
    loginP2P(data) {
        return instanceP2P.post(`/api/user/login`, data, settings)
    },
    getUserData(token) {
        return instance.get(`/api/user/data`, {headers: {Authorization: `Bearer ${token}`}})
    },
    getUserWalletsAndTransactionsP2P(token) {
        return instanceP2P.post(`/api/user/info`, {}, {headers: {Authorization: `Bearer ${token}`}})
    },
    getPaymentMethodP2PForKey(data) {
        return instanceP2P.post(`/api/p2p/payments/methods`, {apiKey: data}, settings)
    },
    getPaymentsMethodsP2P(token, apiKey) {
        return instanceP2P.post(`/api/p2p/payments/methods`, {apiKey: apiKey}, {headers: {Authorization: `Bearer ${token}`}})
    },
    createPaymentP2P(tempObj, token) {
        return instanceP2P.post(`/api/p2p/payment/create`, tempObj, {headers: {Authorization: `Bearer ${token}`}})
    },
    createPaymentP2PForKey(tempObj) {
        return instanceP2P.post(`/api/p2p/payment/create`, tempObj, settings)
    },
    cancelPaymentP2P(tempObj, token) {
        return instanceP2P.post(`/api/p2p/payment/cancel`, tempObj, {headers: {Authorization: `Bearer ${token}`}})
    },
    cancelPaymentP2PForKey(tempObj) {
        return instanceP2P.post(`/api/p2p/payment/cancel`, tempObj, settings)
    },
    approvePaymentP2P(tempObj, token) {
        return instanceP2P.post(`/api/p2p/payment/approve`, tempObj, {headers: {Authorization: `Bearer ${token}`}})
    },
    approvePaymentP2PForKey(tempObj) {
        return instanceP2P.post(`/api/p2p/payment/approve`, tempObj, settings)
    },
    checkPaymentP2P(tempObj, token) {
        return instanceP2P.post(`/api/p2p/payment/check`, tempObj, {headers: {Authorization: `Bearer ${token}`}})
    },
    checkPaymentP2PForKey(tempObj) {
        return instanceP2P.post(`/api/p2p/payment/check`, tempObj, settings)
    },
    getTransactions(token) {
        return instance.get(`/api/user/transactions`, {headers: {Authorization: `Bearer ${token}`}})
    },
    getAccountsList(token) {
        return instance.post(`/api/transaction/get/accounts/balance`, {}, {headers: {Authorization: `Bearer ${token}`}})
    },
    sendSupportMessage(data) {
        return instanceSender.post(`api/send_form/from`, data)
    },
    getUserWalletTransactionList(token) {
        return instance.get(`/api/v2/user/wallet/transaction/list`, {headers: {Authorization: `Bearer ${token}`}})
    },
    getTransactionDetails(transactionNumber, token) {
        return instance.post(`/api/v2/user/wallet/transaction/info`, {"transactionNumber": transactionNumber}, {headers: {Authorization: `Bearer ${token}`}})
    },
    createWithdrawalToBankAccount(token, account) {
        return instance.post(`/api/v2/user/wallet/create/withdraw`, {"account": account}, {headers: {Authorization: `Bearer ${token}`}})
    },
    getUserWalletWithdrawTransactionList(token) {
        return instance.post(`/api/v2/user/withdraw/transaction/list`, {}, {headers: {Authorization: `Bearer ${token}`}})
    },
    refund(token, transactionId) {
        return instance.post(`/api/user/transaction/refund`, {"transaction_id": transactionId}, {headers: {Authorization: `Bearer ${token}`}})
    },
    getStatement(token, type) {
        return instance.get(`api/user/transactions/download?file=${type}`, {headers: {Authorization: `Bearer ${token}`}})
    },
    getWalletStatement(token, type, accountNumber) {
        return instance.get(`api/account/wallet/transactions/download?file=${type}&accountNumber=${accountNumber}`, {headers: {Authorization: `Bearer ${token}`}})
    },
}


