import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    transactions: [],
    wallet: [],
    activeSort: {},
    methods: [],
    apiKey: '',
    isDetailsPopupShow: false,
    transactionDetails: {},
    withdrawalTransactions: [],
    activeCurrencyFilter: '',
    data: {
        card: '',
        paymentId: '',
        timeout: '',
    },
    cancel: {
        successCancel: false,
        messageCancel: ''
    },
    approve: {
        successApprove: false,
        messageApprove: ''
    },
    check: {
        successCheck: false,
        paymentStatus: ''
    }
};


export const accountP2PSlice = createSlice({
    name: 'accountP2P',
    initialState,
    reducers: {
        setAccountP2PTransactions: (state, action) => {
            state.transactions = action.payload;
        },
        setAccountP2PWallets: (state, action) => {
            state.wallet = action.payload;
        },
        setActiveSort: (state, action)=>{
            state.activeSort = action.payload;
        },
        setPaymentsMethodsP2P: (state, action) => {
            state.methods = action.payload;
        },
        setPaymentApiKey: (state, action) => {
            state.apiKey = action.payload;
        },
        setPaymentP2P: (state, action) => {
            state.paymentP2P = action.payload;
        },
        setTransactionDetails: (state, action) => {
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
        },
        setPaymentDataP2P: (state, action) => {
            state.data.card = action.payload.card;
            state.data.paymentId = action.payload.paymentId;
            state.data.timeout = action.payload.timeout;
        },
        setCancelPaymentP2P: (state, action) => {
            state.cancel.successCancel = action.payload.success;
            state.cancel.messageCancel = action.payload.message;
        },
        setApprovePaymentP2P: (state, action) => {
            state.approve.successApprove = action.payload.success;
            state.approve.messageApprove = action.payload.message;
        },
        setCheckPaymentP2P: (state, action) => {
            state.check.successCheck = action.payload.success;
            state.check.paymentStatus = action.payload.paymentStatus;
        },
        resetStatus: (state) => {
            state.cancel = {
                successCancel: false,
                messageCancel: ''
            };
            state.approve = {
                successApprove: false,
                messageApprove: ''
            };
            state.check = {
                successCheck: false,
                paymentStatus: ''
            };
            state.data = {
                card: '',
                paymentId: '',
                timeout: '',
            }
        }
    },

});

export const { setAccountP2PTransactions,
    setAccountP2PWallets,
    setActiveSort,
    setPaymentsMethodsP2P,
    setPaymentApiKey,
    setPaymentP2P,
    setTransactionDetails,
    setWithdrawalTransactions,
    setIsDetailsPopupShow,
    setActiveCurrencyFilter,
    setPaymentDataP2P,
    setCancelPaymentP2P,
    setApprovePaymentP2P,
    setCheckPaymentP2P} = accountP2PSlice.actions;


export default accountP2PSlice.reducer;
