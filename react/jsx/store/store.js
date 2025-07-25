import {combineReducers, configureStore} from '@reduxjs/toolkit';

import {persistReducer, persistStore} from "redux-persist";
import thunkMiddleware from 'redux-thunk';
import storage from "redux-persist/lib/storage";
import DataReducer from './slices/AcquiringSlices/DataReducer';
import AuthReducer from "./slices/AcquiringSlices/AuthReducer";
import AccountsReducer from "./slices/AcquiringSlices/AccountsReducer";
import AuthReducerP2P from "./slices/P2PSlices/AuthReducerP2P";
import AccountsP2PReducer from "./slices/P2PSlices/AccountsP2PReducer";
import DataP2PReducer from "./slices/P2PSlices/DataP2PReducer";
import CommonReducer from "./slices/Crypto/CommonReducer";


const persistConfig = {
  key: "root",
  storage,
};


const rootReducer = combineReducers({
  auth: AuthReducer,
  authP2P: AuthReducerP2P,
  data: DataReducer,
  dataP2P: DataP2PReducer,
  accounts: AccountsReducer,
  accountP2P: AccountsP2PReducer,
  cryptoService: CommonReducer
});

const loggingMiddleware = (store) => (next) => (action) => {
  //console.log('Action:', action.type);
  //console.log('Payload:', action.payload);
  return next(action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunkMiddleware, loggingMiddleware],
});

export const persistor = persistStore(store);

