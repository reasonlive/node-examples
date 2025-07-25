import {createSelector} from '@reduxjs/toolkit';


export const selectAcquiringTransactions = state => state.data.acquiringTransactionsList;
export const selectActiveFilter = state => state.data.activeFilter;
export const selectSort = state => state.data.activeSort;
export const searchString = state => state.data.search
export const selectedAcquiringTransactions = createSelector(
    [selectAcquiringTransactions, selectActiveFilter, selectSort, searchString],
    (allTransactions, activeFilter, selectSort, searchString) => {

      let newArr = [...allTransactions]

      if (activeFilter !== 'All') {
        newArr = allTransactions?.filter(t => t.transaction_status === activeFilter)
      }

      if (selectSort?.order === 'descend') {
        newArr?.sort((a, b) => {
              if (selectSort.columnKey === 'transaction_date_time') {
                return Date.parse(b[selectSort.columnKey]) - Date.parse(a[selectSort.columnKey])
              } else {
                return b[selectSort.columnKey] - a[selectSort.columnKey]
              }
            }
        )
      }

      if (selectSort?.order === 'ascend') {
        newArr?.sort((a, b) => {
          if (selectSort.columnKey === 'transaction_date_time') {
            return Date.parse(a[selectSort.columnKey]) - Date.parse(b[selectSort.columnKey])
          } else {
            return a[selectSort.columnKey] - b[selectSort.columnKey]
          }
        })
      }

      if (searchString?.length > 0) {
        newArr = newArr.filter(item => item.transaction_number.includes(searchString))
      }

      return newArr;
    }
)

export const selectAccountTransactions = state => state.accounts.accountTransactions;
export const selectWithdrawals = state => state.accounts.withdrawalTransactions;
export const accountSort = state => state.accounts.activeSort;
export const activeCurrency = state => state.accounts.activeCurrencyFilter


export const sortedAccountsTransactions = createSelector([selectAccountTransactions, accountSort, activeCurrency, searchString],
    (accountTransactions, activeSort, activeCurrencyFilter, search) => {
      let selectedTransactions = [...accountTransactions]

      if (activeCurrencyFilter !== '') {
        selectedTransactions = accountTransactions?.filter(t => t.currency === activeCurrencyFilter)
      }

      if (activeSort.order === 'descend') {
        selectedTransactions?.sort((a, b) => {


              if (activeSort.field === 'date') {
                return new Date(b[activeSort.field]).getTime() - new Date(a[activeSort.field]).getTime()
              } else {
                return b[activeSort.field] - a[activeSort.field]
              }
            }
        )
      }

      if (activeSort.order === 'ascend') {
        selectedTransactions?.sort((a, b) => {
          if (activeSort.field === 'date') {
            return new Date(a[activeSort.field]).getTime() - new Date(b[activeSort.field]).getTime()
          } else {
            return a[activeSort.field] - b[activeSort.field]
          }
        })
      }

      if (search?.length > 0) {
        selectedTransactions = selectedTransactions.filter(item => item.transactionNumber.includes(search) || item.fromTransactionNumber.includes(search) )
      }

      return selectedTransactions;
    }
)

export const sortedWithdrawalsTransactions = createSelector([selectWithdrawals, accountSort, activeCurrency, searchString],
    (withdrawalsTransactions, activeSort, activeCurrencyFilter, search) => {

      let selectedTransactions = [...withdrawalsTransactions]


      if (activeCurrencyFilter !== '') {
        selectedTransactions = withdrawalsTransactions?.filter(t => t.currency === activeCurrencyFilter)
      }


      if (activeSort.order === 'descend') {
        selectedTransactions?.sort((a, b) => {
              if (activeSort.field === 'date') {
                return new Date(b[activeSort.field]).getTime() - new Date(a[activeSort.field]).getTime()
              } else {
                return b[activeSort.field] - a[activeSort.field]
              }
            }
        )

      }

      if (activeSort.order === 'ascend') {
        selectedTransactions?.sort((a, b) => {
          if (activeSort.field === 'date') {
            return new Date(a[activeSort.field]).getTime() - new Date(b[activeSort.field]).getTime()
          } else {
            return a[activeSort.field] - b[activeSort.field]
          }
        })

      }


      if (search?.length > 0) {
        selectedTransactions = selectedTransactions.filter(item => item.transactionNumber.includes(search))
      }


      return selectedTransactions
    }
)
export const selectP2PTransactions = state => state.accountP2P.transactions;
//export const selectWithdrawals = state => state.accountP2P.withdrawalTransactions;
export const accountP2PSort = state => state.accountP2P.activeSort;
export const activeCurrencyP2P = state => state.accountP2P.activeCurrencyFilter
export const searchStringP2P = state => state.dataP2P.searchP2P

export const sortedP2PTransactions = createSelector([selectP2PTransactions, accountP2PSort, activeCurrencyP2P, searchStringP2P],
    (transactions, activeSort, activeCurrencyFilter, searchP2P) => {
        let selectedTransactions = [...transactions]

        if (activeSort.order === 'descend') {
            selectedTransactions?.sort((a, b) => {
                    if (activeSort.field === 'createdAt') {
                        return new Date(b[activeSort.field]).getTime() - new Date(a[activeSort.field]).getTime()
                    } else {
                        return b[activeSort.field] - a[activeSort.field]
                    }
                }
            )
        }

        if (activeSort.order === 'ascend') {
            selectedTransactions?.sort((a, b) => {
                if (activeSort.field === 'createdAt') {
                    return new Date(a[activeSort.field]).getTime() - new Date(b[activeSort.field]).getTime()
                } else {
                    return a[activeSort.field] - b[activeSort.field]
                }
            })
        }

        if (searchP2P?.length > 0) {
            selectedTransactions = selectedTransactions.filter(item => item.paymentId.includes(searchP2P))
        }

        return selectedTransactions;
    }
)

export const selectCryptoTransactions = state => state.accountsCrypto.transactions;
//export const selectWithdrawals = state => state.accountP2P.withdrawalTransactions;
export const accountCryptoSort = state => state.accountsCrypto.activeSort;
export const activeCurrencyCrypto = state => state.accountsCrypto.activeCurrencyFilter
export const searchStringCrypto = state => state.dataCrypto.searchCrypto

export const sortedCryptoTransactions = createSelector([selectCryptoTransactions, accountCryptoSort, activeCurrencyCrypto, searchStringCrypto],
    (transactions, activeSort, activeCurrencyFilter, searchCrypto) => {
        let selectedTransactions = [...transactions]

        if (activeSort.order === 'descend') {
            selectedTransactions?.sort((a, b) => {
                    if (activeSort.field === 'created') {
                        return new Date(b[activeSort.field]).getTime() - new Date(a[activeSort.field]).getTime()
                    } else {
                        return b[activeSort.field] - a[activeSort.field]
                    }
                }
            )
        }

        if (activeSort.order === 'ascend') {
            selectedTransactions?.sort((a, b) => {
                if (activeSort.field === 'created') {
                    return new Date(a[activeSort.field]).getTime() - new Date(b[activeSort.field]).getTime()
                } else {
                    return a[activeSort.field] - b[activeSort.field]
                }
            })
        }

        if (searchCrypto?.length > 0) {
            selectedTransactions = selectedTransactions.filter(item => item.id.toString().includes(searchCrypto))
        }

        return selectedTransactions;
    }
)
