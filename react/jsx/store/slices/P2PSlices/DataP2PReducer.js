import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AuthAPI} from '../../../ajax/Api';

const initialState = {
    isLoading: false,
    P2PTransactionsList: [],
    activeFilter: 'All',
    activeSort: {},
    searchP2P: '',
};


export const getP2PTransactionData = createAsyncThunk(
    'dataP2P/getP2PTransactionData',
    async ({token}, thunkAPI) => {
        try {
            const response = await AuthAPI.getUserWalletsAndTransactionsP2P(token);
            return response.data.transactions;
        } catch (error) {
            console.log(error);
        }
    }
);


export const dataSliceP2P = createSlice({
    name: 'dataP2P',
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
        setSearchP2P: (state, action) => {
            state.searchP2P = action.payload;
        },
    },
    extraReducers: {
        [getP2PTransactionData.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.P2PTransactionsList = action.payload.result;
        },
        [getP2PTransactionData.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getP2PTransactionData.rejected.type]: (state, action) => {
            state.isLoading = false;
        },
    }
});

export const { setIsLoading, setFilter, setSort, setSearchP2P} = dataSliceP2P.actions;


export default dataSliceP2P.reducer;
