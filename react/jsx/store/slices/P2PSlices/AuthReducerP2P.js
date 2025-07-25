import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AuthAPI} from '../../../ajax/Api';


const initialState = {
    data: {
        firstNameP2P: '',
        lastNameP2P: '',
    },
    token: '',
    error: '',
    isLoading: false,
    activeMenu: ['1'],
    routeP2P: ''
};
export const authMeP2P = createAsyncThunk('auth/authP2P', async (data, {dispatch}) => {
        const response = await AuthAPI.loginP2P(data);
        return response.data;
    }
);

export const authSliceP2P = createSlice({
    name: 'authP2P',
    initialState,
    reducers: {
        setUserDataACP2P: (state, action) => {
            state.data = action.payload;
        },
        setErrorP2P: (state, action) => {
            state.error = action.payload;
        },
        setTokenACP2P: (state, action) => {
            state.token = action.payload;
        },
        setActiveMenuP2P: (state, action) => {
            state.activeMenu = action.payload;
        },
        setMainRouteP2P: (state, action) => {
            state.routeP2P = action.payload;
        },
        logout: (state) => {
            state.data = {
                firstName: '',
                lastName: '',
            };
            state.error = '';
            state.isLoading = false;
            state.token = '';
            state.activeMenu = ['1'];
            state.routeP2P = '';
            localStorage.removeItem('token');
            localStorage.removeItem('isAuth');
        },
    },
    extraReducers: {
        [authMeP2P.fulfilled.type]: (state, action) => {
            state.isLoading = false;

            if (!!action.payload.token) {
                state.token = action.payload.token;
                localStorage.setItem('isAuth', 'Auth');
                localStorage.setItem('token', action.payload.token);
            }

            if(action.payload.error){
                state.error=action.payload.error
                localStorage.removeItem('token');
                localStorage.removeItem('isAuth');
            }
        },
        [authMeP2P.pending.type]: (state) => {
            state.isLoading = true;
            state.error = '';
        },
        [authMeP2P.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.error;
            localStorage.removeItem('token');
            localStorage.removeItem('isAuth');
        },
    }
});
export const {setUserDataACP2P, setErrorP2P, setActiveMenuP2P, logout, setMainRouteP2P} = authSliceP2P.actions;

export default authSliceP2P.reducer;

