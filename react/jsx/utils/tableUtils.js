import i18next from "i18next";

export const transactionStatus = (status) => {
  if (status === 1) {
    return `${i18next.t('personal.transactionHistory.inProcess')}`
  }
  if (status === 2) {
    return `${i18next.t('personal.transactionHistory.approved')}`
  }
  if (status === 3) {
    return `${i18next.t('personal.transactionHistory.denied')}`
  }
  if (status === 4) {
    return `${i18next.t('personal.transactionHistory.refund')}`
  }
  if (status === 5) {
    return `${i18next.t('personal.transactionHistory.waiting')}`
  }
}