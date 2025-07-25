import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthAPI} from "../Api";
import {setIsLoading} from "../../store/slices/AcquiringSlices/DataReducer";
import {
  setAccountTransactions,
  setIsDetailsPopupShow, setTransactionDetails,
  setWithdrawalTransactions
} from "../../store/slices/AcquiringSlices/AccountsReducer";
import {
    setAccountP2PTransactions,
    setAccountP2PWallets,
    setPaymentsMethodsP2P,
    setPaymentDataP2P, setCancelPaymentP2P, setPaymentApiKey, setApprovePaymentP2P, setCheckPaymentP2P, accountP2PSlice
} from "../../store/slices/P2PSlices/AccountsP2PReducer";
import {
    setAccountCryptoTransactions,
    setAccountCryptoWallets
} from "../../store/slices/Crypto/CommonReducer";

export const getAccountsTransactions = createAsyncThunk(
    'accounts/getAccountTransactions',
    async (token, {dispatch}) => {
      try {
        dispatch(setIsLoading(true))
        const response = await AuthAPI.getUserWalletTransactionList(token);
        dispatch(setAccountTransactions(response.data.result));
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setIsLoading(false))
      }
    }
);

export const getWithdrawalsTransactions = createAsyncThunk(
    'accounts/getWithdrawalsTransactions',
    async (token, {dispatch}) => {
      try {
        dispatch(setIsLoading(true))
        const response = await AuthAPI.getUserWalletWithdrawTransactionList(token);
        dispatch(setWithdrawalTransactions(response.data.result));
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setIsLoading(false))
      }
    }
);

export const getTransactionDetails = createAsyncThunk(
    'accounts/getTransactionDetails',
    async ({transactionNumber, token}, {dispatch}) => {
      try {
        const response = await AuthAPI.getTransactionDetails(transactionNumber, token);
        dispatch(setTransactionDetails(response.data.result))
        dispatch(setIsDetailsPopupShow(true))
      } catch (error) {
        console.error(error);
      } finally {
      }
    }
);

export const getAccountP2PTransactionsAndWallet = createAsyncThunk(
    'accounts/getAccountP2PTransactions',
    async (token, {dispatch}) => {
        try {
            dispatch(setIsLoading(true))
            const response = await AuthAPI.getUserWalletsAndTransactionsP2P(token);
            dispatch(setAccountP2PTransactions(response.data.transactions));
            dispatch(setAccountP2PWallets(response.data.wallet))
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setIsLoading(false))
        }
    }
);

export const getPaymentsMethodsP2P = (token) => async (dispatch) => {
    try {
        dispatch(setIsLoading(true))
        const response = await AuthAPI.getPaymentsMethodsP2P(token);
        dispatch(setPaymentsMethodsP2P(response.data));
    } catch (error) {
        console.error(error);
    } finally {
        dispatch(setIsLoading(false))
    }
}
export const getPaymentMethodP2PForKey = (data) => async (dispatch) => {
    try {
        dispatch(setIsLoading(true))
        const response = await AuthAPI.getPaymentMethodP2PForKey(data);
        dispatch(setPaymentApiKey(response.data))
        return response.data;
    } catch (e) {
        console.log(e)
    }
}
export const createPaymentP2P = (tempObj, token) => async (dispatch) => {
    try {
        const res = await AuthAPI.createPaymentP2P(tempObj, token)
        dispatch(setPaymentDataP2P(res.data));
    } catch (e) {
        console.log(e)
    }
}
export const createPaymentP2PForKey = (tempObj) => async (dispatch) => {
    try {
        const res = await AuthAPI.createPaymentP2PForKey(tempObj)
        dispatch(setPaymentDataP2P(res.data));
        console.log(res.data)
    } catch (e) {
        console.log(e)
    }
}
export const cancelPaymentP2P = (tempObj, token) => async (dispatch) => {
    try {
        const res = await AuthAPI.cancelPaymentP2P(tempObj, token)
        dispatch(setCancelPaymentP2P(res.data))
    } catch (e) {
        console.log(e)
    }
}
export const cancelPaymentP2PForKey = (tempObj) => async (dispatch) => {
    try {
        const res = await AuthAPI.cancelPaymentP2PForKey(tempObj)
        dispatch(setCancelPaymentP2P(res.data))
    } catch (e) {
        console.log(e)
    }
}

export const approvePaymentP2P = (tempObj, token) => (dispatch) => {
    return new Promise(async (resolve) => {
    try {
        const res = await AuthAPI.approvePaymentP2P(tempObj, token)
        await dispatch(setApprovePaymentP2P(res.data))
        await dispatch(checkPaymentP2P(tempObj, token)).then((res) => {
            if (res.data.success === false && res.data.paymentStatus === 'WAITING') {
                const intervalId = setInterval(() => {
                    dispatch(checkPaymentP2P(tempObj, token)).then((res) => {
                        if (res.data.paymentStatus === 'SUCCESS') {
                            clearInterval(intervalId)
                            resolve({ isSuccess: true });
                        }
                        if (res.data.paymentStatus === 'DENIED') {
                            console.log("DENIED")
                            clearInterval(intervalId)
                            resolve({ isSuccess: false });
                        }
                    });
                }, 5000)
            } else {
                resolve({ isSuccess: res.data.success });
            }
        });
    } catch (e) {
        console.log(e);
        resolve({ isSuccess: false });
    }
    });
};
export const checkPaymentP2P = (tempObj, token) => async (dispatch) => {
    try {
        const res = await AuthAPI.checkPaymentP2P(tempObj, token);
        dispatch(setCheckPaymentP2P(res.data));
        return res;
    } catch (e) {
        console.log(e);
    }
};

export const approvePaymentP2PForKey = (tempObj) => (dispatch) => {
    return new Promise(async (resolve) => {
        try {
            const res = await AuthAPI.approvePaymentP2PForKey(tempObj)
            await dispatch(setApprovePaymentP2P(res.data))
            await dispatch(checkPaymentP2PForKey(tempObj)).then((res) => {
                if (res.data.success === false && res.data.paymentStatus === 'WAITING') {
                    const intervalId = setInterval(() => {
                        dispatch(checkPaymentP2PForKey(tempObj)).then((res) => {
                            if (res.data.paymentStatus === 'SUCCESS') {
                                clearInterval(intervalId)
                                resolve({ isSuccess: true });
                            }
                            if (res.data.paymentStatus === 'DENIED') {
                                console.log("DENIED")
                                clearInterval(intervalId)
                                resolve({ isSuccess: false });
                            }
                        });
                    }, 5000)
                } else {
                    resolve({ isSuccess: res.data.success });
                }
            });
        } catch (e) {
            console.log(e);
            resolve({ isSuccess: false });
        }
    });
};
export const checkPaymentP2PForKey = (tempObj) => async (dispatch) => {
    try {
        const res = await AuthAPI.checkPaymentP2PForKey(tempObj);
        dispatch(setCheckPaymentP2P(res.data));
        return res;
    } catch (e) {
        console.log(e);
    }
};
