import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {CloseSvg} from "../../../utils/sprite";
import MyInputForm from "../../MyInputForm/MyInputForm";
import MyBtnBlack from "../../MyBtnBlack/MyBtnBlack";
import s from './CryptoWithdrawalModal.module.css'
import CurrencyHelper from "../../../utils/CurrencyHelper";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function CryptoWithdrawalModal(props) {
  const classes = useStyles();
  const closePopup = (arg) => {
    props.showPopUp(arg)
  }

  const currency = props.wallet?.coin.toUpperCase()

  return (
      <Modal
          className={classes.modal}
          open={props.showWithdrawalModal}
          onClose={() => {
            closePopup(false)
          }}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
      >
        <Fade in={props.showWithdrawalModal}>
          <div className={s.wrapper}>
            <CloseSvg className={s.closeIcon} onClick={()=> closePopup(false)}/>
            <div className={s.content}>
              <div>
                <p className={s.title}>Withdrawal</p>
                <div className={s.infoBlock}>
                  <img className={s.coinIcon}
                       src={require(`../../../assets/img/currency/${currency ? currency : 'USDT'}.svg`)}/>
                  <div>
                    <p className={s.currency}>{currency ? currency : 'USDT'}</p>
                    <p className={s.fullCurrency}>({CurrencyHelper.getCurrencyFullName(currency)})</p>
                  </div>
                  <span
                      className={props.wallet?.standard ? s.plate : s.plateNon}>{props.wallet?.standard}</span>
                </div>
              </div>
              <div className={s.inputWrapper}>
                <p className={s.inputLabel}>To wallet address</p>
                <MyInputForm style={{minWidth: 256}}/>
              </div>

              <div className={s.inputWrapper}>
                <div className={s.inputLabelWrapper}><p className={s.inputLabel}>Amount</p>
                  <p className={s.labelButton}>All</p>
                </div>
                <MyInputForm style={{minWidth: 256}}/>
              </div>

              <div className={s.lineWrapper}>
                <p className={s.lineLabel}>Commission amount</p>
                  <p className={s.lineValue}>00 {currency ? currency : 'USDT'}{" "}{props.wallet?.standard}</p>
              </div>

              <div className={s.lineWrapper}>
                <p className={s.lineLabel}>Total amount</p>
                <p className={s.totalValue}>{!!props.wallet?.amount ? props.wallet.amount : '0'} {currency ? currency : 'USDT'}{" "}{props.wallet?.standard}</p>
              </div>

              <div className={s.buttonWrapper}>
                <MyBtnBlack  name={'Withdraw'} />
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
  );
}


export default CryptoWithdrawalModal;
