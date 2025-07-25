import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import s from './TransactionDetailsModal.module.css'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function TransactionDetailsModal(props) {
  const dispatch = useDispatch()
  const {transactions} = useSelector(store => store.cryptoService);
  const transactionDetails = transactions?.length && props?.id
      ? transactions?.filter(tx => tx.id === props.id)[0]
      : {};

  const classes = useStyles();

  const {
    amount,
    id,
    addressFrom,
    addressTo,
    blockchainFee,
    currency,
    created,
    txid,
    tokenStandard,
  } = transactionDetails || {};

  const isoDateString = created;
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
          open={props.show}
          onClose={() => {
           props.setShowModal(false)
          }}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
      >
        <Fade in={props.show}>
          <div className={s.wrapper}>
            <img className={s.close} src={require('../../../assets/img/close.png')} onClick={() => props.setShowModal(false)}/>

            <div className={s.content}>
              <div className={s.titleBlock}>
                <p className={s.title}>{t("personal.transactionDetails.title")}</p>
                <p className={s.txid}>TxID {txid}</p>
              </div>
              <div className={s.infoBlock}>
                <p className={s.infoTitle}>Internal Id</p>
                <p className={s.infoSubtitle}>{id}</p>

                <p className={s.infoTitle}>{t("personal.transactionDetails.date")}</p>
                <p className={s.infoSubtitle}>{formattedDateString}</p>

                <p className={s.infoTitle}>Address From</p>
                <p className={s.infoSubtitle}>{addressFrom}</p>

                <p className={s.infoTitle}>Address To</p>
                <p className={s.infoSubtitle}>{addressTo}</p>

                <p className={s.infoTitle}>{t("personal.transactionDetails.transactionAmount")}</p>
                <p className={s.infoSubtitle}>{amount} {currency}</p>

                <p className={s.infoTitle}>{t("personal.transactionDetails.commissionAmount")}</p>
                <p className={s.infoSubtitle}>{blockchainFee ?? 'unknown'} {currency}</p>

              </div>

            </div>
          </div>
        </Fade>
      </Modal>

  );
}


export default TransactionDetailsModal;
