import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {setIsDetailsPopupShow} from "../../../store/slices/AcquiringSlices/AccountsReducer";
import s from './TransactionDetailModal.module.css'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function TransactionDetailsModal(props) {
  const dispatch = useDispatch()
  const transactionDetails = useSelector(store => store.accounts.transactionDetails);



  const classes = useStyles();

  const {
    acquiringTransactionAmount,
    acquiringTransactionNumber,
    cardNumber,
    commission,
    currency,
    date,
    netAmount,
    transactionNumber,
    type,
    direction
  } = transactionDetails;

  const isoDateString = date;
  const isoDate = new Date(isoDateString);

  const day = isoDate.getUTCDate().toString().padStart(2, "0");
  const month = (isoDate.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = isoDate.getUTCFullYear().toString();

  const hours = isoDate.getUTCHours().toString().padStart(2, "0");
  const minutes = isoDate.getUTCMinutes().toString().padStart(2, "0");
  const seconds = isoDate.getUTCSeconds().toString().padStart(2, "0");

  const formattedDateString = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;

  const {t} = useTranslation()

  return (

      <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={props.isDetailsPopupShow}
          onClose={() => {
           dispatch(setIsDetailsPopupShow(false))
          }}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
      >
        <Fade in={props.isDetailsPopupShow}>
          <div className={s.wrapper}>
            <img className={s.close} src={require('../../../assets/img/close.png')} onClick={() => {
              dispatch(setIsDetailsPopupShow(false))
            }}/>

            <div className={s.content}>
              <div className={s.titleBlock}>
                <p className={s.title}>{t("personal.transactionDetails.title")}</p>
                <p className={s.transactionNumber}>{t("personal.transactionDetails.no")} {transactionNumber}</p>
              </div>
              <div className={s.infoBlock}>
                <p className={s.infoTitle}>{t("personal.transactionDetails.acquiringTransactionNo")}</p>
                <p className={s.infoSubtitle}>{acquiringTransactionNumber}</p>

                <p className={s.infoTitle}>{t("personal.transactionDetails.date")}</p>
                <p className={s.infoSubtitle}>{formattedDateString}</p>

                <p className={s.infoTitle}>{t("personal.transactionDetails.cardNumber")}</p>
                <p className={s.infoSubtitle}>• • • • {cardNumber}</p>

                <p className={s.infoTitle}>{t("personal.transactionDetails.transactionType")}</p>
                <p className={s.infoSubtitle}>{type}</p>

                <p className={s.infoTitle}>{t("personal.transactionDetails.transactionAmount")}</p>
                <p className={s.infoSubtitle}>{acquiringTransactionAmount && acquiringTransactionAmount.toFixed(2)} {currency}</p>

                <p className={s.infoTitle}>{t("personal.transactionDetails.commissionAmount")}</p>
                <p className={s.infoSubtitle}>{commission && commission.toFixed(2)} {currency}</p>

                <p className={s.infoTitle}>{t("personal.transactionDetails.netAmount")}</p>
                <p className={`${s.infoSubtitle} ${direction === 'OUT' ? s.negative  : s.positive }`}>{direction === 'OUT' ? '-' : '+'}{netAmount && netAmount.toFixed(2)} {currency}</p>
              </div>

            </div>
          </div>
        </Fade>
      </Modal>

  );
}


export default TransactionDetailsModal;
