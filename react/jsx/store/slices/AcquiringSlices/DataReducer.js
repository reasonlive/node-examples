import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import React from "react";
import {AuthAPI} from '../../../ajax/Api';

const initialState = {
  isLoading: false,
  acquiringTransactionsList: [],
  activeFilter: 'All',
  activeSort: {},
  search: ''
};


export const getAcquiringTransactionData = createAsyncThunk(
    'data/getAcquiringTransactionData',
    async ({token}, thunkAPI) => {
      try {
        const response = await AuthAPI.getTransactions(token);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
);


export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    setSort: (state, action) => {
      state.activeSort = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: {
    [getAcquiringTransactionData.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.acquiringTransactionsList = action.payload.result;
    },
    [getAcquiringTransactionData.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAcquiringTransactionData.rejected.type]: (state, action) => {
      state.isLoading = false;
    },
  }
});

export const { setIsLoading, setFilter, setSort, setSearch} = dataSlice.actions;


export default dataSlice.reducer;
