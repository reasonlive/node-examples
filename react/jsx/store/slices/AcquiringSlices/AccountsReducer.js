import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isDetailsPopupShow: false,
  transactionDetails: {},
  accountTransactions: [],
  withdrawalTransactions: [],
  activeCurrencyFilter: '',
  activeAccountNumber: '',
  activeSort: {}
};


export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    setAccountTransactions: (state, action) => {
      state.accountTransactions = action.payload;
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
    setActiveSort: (state, action)=>{
      state.activeSort = action.payload;
    },
    setActiveCurrencyFilter: (state, action)=>{
      state.activeCurrencyFilter = action.payload;
    },
    setActiveAccountFilter: (state, action)=>{
      state.activeAccountNumber = action.payload;
    },
  },

});

export const { setAccountTransactions, setWithdrawalTransactions, setTransactionDetails, setIsDetailsPopupShow, setActiveSort, setActiveCurrencyFilter, setActiveAccountFilter } = accountsSlice.actions;


export default accountsSlice.reducer;
