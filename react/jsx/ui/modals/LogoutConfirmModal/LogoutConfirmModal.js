import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import s from './LogoutConfirmModal.module.css'
import {useTranslation} from "react-i18next";
import MyButton from "../../MyButton/MyButton";


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function LogoutConfirmModal(props) {
  const classes = useStyles();
  const closePopup = (arg) => {
    props.showPopUp(arg)
  }

  const {t} = useTranslation()

  return (
      <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={props.showConfirmModal}
          onClose={() => {
            closePopup(false)
          }}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
      >
        <Fade in={props.showConfirmModal}>
          <div className={s.wrapper}>
            <div className={s.content}>
              <p className={s.title}>{t("logout.title")}</p>
              <p className={s.message}>{t("logout.message")}</p>
              <div className={s.buttonsWrapper}>
                <MyButton style={{width: '50%'}} primaryBlack medium  name={t("logout.no")} onClick={() => {
                  closePopup(false)
                }}/>
                <MyButton style={{width: '50%'}} medium   name={t("logout.yes")} onClick={() => {
                  props.logout()
                  closePopup(false)
                }}/>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
  );
}


export default LogoutConfirmModal;
