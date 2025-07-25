import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    transactions: [],
    wallets: [],
    acquiringTransactions: [],
    acquiringTransactionsInfo: [],

    /**
     * Wallet from backend
     */
    selectedCard: null,

    /*isDetailsPopupShow: false,
    transactionDetails: {},
    accountTransactions: [],
    withdrawalTransactions: [],*/

    /**
     * JWT token from backend
     */
    token: '',
    username: '',

    apiKey: '',
    notificationUrl: '',
    addresses: [],
    lastAddresses: [],
};

export const cryptoServiceSlice = createSlice({
    name: 'cryptoService',
    initialState,
    reducers: {
        setUserToken: (state, action) => {
            state.token = action.payload;
        },
        logoutUser: (state) => {
            state.token = '';
            state.username = '';
            state.transactions = [];
            state.wallets = [];
            state.acquiringTransactions = [];
            state.acquiringTransactionsInfo = [];
            state.selectedCard = null;
            state.apiKey = '';
            state.notificationUrl = '';
            state.addresses = [];
            state.lastAddresses = [];
        },

        setAcquiringTransactions(state, action) {
            state.acquiringTransactions = action.payload.transactions;
            state.acquiringTransactionsInfo = action.payload.info;
        },
        setAccountCryptoTransactions: (state, action) => {
            state.transactions = action.payload.transactions;
            state.wallets = action.payload.wallets;
        },
        setAccountCryptoWallets: (state, action) => {
            state.wallets = action.payload;
        },

        setSelectedCard: (state, action) => {
            state.selectedCard = action.payload;
        },

        setApiKey: (state, action) => {
            state.apiKey = action.payload?.apiKey ?? action.payload;
        },
        setNotificationUrl: (state, action) => {
            state.notificationUrl = action.payload?.callbackUrl ?? action.payload;
        },
        setDynamicAddresses: (state, action) => {
            state.addresses = action.payload?.addresses ?? action.payload;
        },
        setLastDynamicAddresses: (state, action) => {
            state.lastAddresses = action.payload?.address ?? action.payload;
        },


        /*setTransactionDetails: (state, action) => {
            state.transactionDetails = action.payload;
        },
        setWithdrawalTransactions: (state, action) => {
            state.withdrawalTransactions = action.payload;
        },
        setIsDetailsPopupShow: (state, action)=>{
            state.isDetailsPopupShow = action.payload;
        },
        setActiveCurrencyFilter: (state, action)=>{
            state.activeCurrencyFilter = action.payload;
        },*/
    },
});

export const {
    setUserToken,
    logoutUser,

    setAcquiringTransactions,
    setAccountCryptoTransactions,

    setAccountCryptoWallets,

    setSelectedCard,

    setApiKey,
    setNotificationUrl,

    setDynamicAddresses,
    setLastDynamicAddresses
} = cryptoServiceSlice.actions;


export default cryptoServiceSlice.reducer;