import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import s from './WithdrawalConfirmModal.module.css'
import MyBtnBlack from "../../MyBtnBlack/MyBtnBlack";
import MyBtnUnactive from "../../MyBtnUnactive/MyBtnUnactive";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

function WithdrawalConfirmModal(props) {
    const classes = useStyles();


    const closePopup = (arg) => {
        props.showPopUp(arg)
    }


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
                        <p className={`${s.title} ${props.status !== 200 && s.error}`}>{props.status === 200 ? 'success' : 'fail'}</p>
                        <p className={s.message}>{props.status === 200 ? 'We have accepted your withdrawal request.' : 'Something went wrong. Try again.'}</p>
                        <div className={s.buttonsWrapper}>
                            <MyBtnBlack  padding name={'Ok'} onClick={() => {
                                closePopup(false)
                            }}/>
                            {props.status === 200 && <MyBtnUnactive padding  name={'View Application Status'} onClick={() => {
                                closePopup(false)
                            }}/>}

                        </div>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
}


export default WithdrawalConfirmModal;