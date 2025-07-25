import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AuthAPI} from '../../../ajax/Api';


const initialState = {
  data: {
    firstName: '',
    lastName: '',
  },
  token: '',
  isAuth: false,
  error: '',
  isLoading: false,
  activeMenu: ['1'],
  route: ''
};

export const getUserDataTC = createAsyncThunk('auth/getUserData', async (token, {dispatch}) => {
  try {
    const response = await AuthAPI.getUserData(token);
    if (response.data.errors) {
      dispatch(setError('Invalid login or password'));
    } else {
      dispatch(setUserDataAC(response.data.result));
    }
  } catch (error) {
    dispatch(setError(error.message));
  }
});


export const authMeTC = createAsyncThunk('auth/authMe', async (data, {dispatch}) => {
      const response = await AuthAPI.login(data);
      return response.data;
    }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserDataAC: (state, action) => {
      state.data = action.payload;
    },
    setIsAuthAC: (state, action) => {
      state.isAuth = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setTokenAC: (state, action) => {
      state.token = action.payload;
    },
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
    setMainRoute: (state, action) => {
      state.route = action.payload;
    },
    logout: (state) => {
      state.data = {
        firstName: '',
        lastName: '',
      };
      state.isAuth = false;
      state.error = '';
      state.isLoading = false;
      state.token = '';
      state.activeMenu = ['1'];
      state.route = '';
      localStorage.removeItem('token');
      localStorage.removeItem('isAuth');
    },
  },
  extraReducers: {
    [authMeTC.fulfilled.type]: (state, action) => {
      state.isLoading = false;

      if (!!action.payload.result) {
        state.token = action.payload.result;
        localStorage.setItem('isAuth', 'Auth');
        localStorage.setItem('token', action.payload.result);
        state.isAuth = true;
      }

      if(action.payload.error){
        state.error=action.payload.error
        state.isAuth = false;
        localStorage.removeItem('token');
        localStorage.removeItem('isAuth');
      }
    },
    [authMeTC.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [authMeTC.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
      state.error = action.payload.error;
      localStorage.removeItem('token');
      localStorage.removeItem('isAuth');
    },
    }
});



export const {
  setUserDataAC,
  setIsAuthAC,
  setError,
  setActiveMenu,
  logout,
  setMainRoute
} = authSlice.actions;


export default authSlice.reducer;

