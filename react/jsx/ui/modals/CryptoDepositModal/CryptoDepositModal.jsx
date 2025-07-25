import React, {useState} from 'react';
import QRCode from "qrcode.react";
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Icon from "@ant-design/icons";
import {CloseSvg, CopySvg} from "../../../utils/sprite";
import {ReactComponent as Warning} from "../../../assets/img/new/warning.svg";
import s from './CryptoDepositModal.module.css'
import CurrencyHelper from "../../../utils/CurrencyHelper";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function CryptoDepositModal(props) {
  const classes = useStyles();
  const [isCopied, setIsCopied] = useState(false);
  const closePopup = (arg) => {
    props.showPopUp(arg)
  }
  const currency = props.wallet?.coin.toUpperCase()

  return (
      <Modal
          className={classes.modal}
          open={props.showDepositModal}
          onClose={() => {
            closePopup(false)
          }}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
      >
        <Fade in={props.showDepositModal}>
          <div className={s.wrapper}>
            <CloseSvg className={s.closeIcon} onClick={()=> closePopup(false)}/>
              <p className={s.title}>Deposit</p>
              <div className={s.content}>
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
                  <QRCode
                      value={props.wallet?.address}
                      renderAs={"canvas"} // svg, canvas
                      size={310}
                      level={"M"} // ('L' 'M' 'Q' 'H')  'L'
                      includeMargin={true}
                      style={{border: "1px solid #efefef"}}
                  />

                  <div className={s.addressLine}>
                      <p className={s.address}>{props.wallet?.address}</p>
                      <CopySvg className={isCopied ? s.icon : s.inactiveIcon}
                               onClick={() => {
                                   setIsCopied(true);
                                   setTimeout(() => setIsCopied(false), 2000);
                                   navigator.clipboard.writeText(`${props.wallet?.address}`);
                               }}
                      />
                  </div>
                  {/*<div style={{display: 'flex'}}>*/}
                  {/*    <Icon className={s.warningIcon} component={() => <Warning />} rev={undefined} />*/}
                  {/*    <span className={s.warningText}>This is a crypto acquiring wallet, so a new address and qr code is generated each time.</span>*/}
                  {/*</div>*/}
              </div>
          </div>
        </Fade>
      </Modal>
  );
}


export default CryptoDepositModal;


