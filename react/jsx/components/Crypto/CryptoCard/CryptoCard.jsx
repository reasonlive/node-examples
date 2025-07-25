import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {Layout} from 'antd';
import MyCardButton from "../../../ui/MyCardBtn/MyCardButton";
import CryptoDepositModal from "../../../ui/modals/CryptoDepositModal/CryptoDepositModal";
import CryptoWithdrawalModal from "../../../ui/modals/CryptoWithdrawalModal/CryptoWithdrawalModal";
import s from "./CryptoCard.module.css";
import {setSelectedCard} from "../../../store/slices/Crypto/CommonReducer";

export const CryptoCard = ({wallet, withdrawalHandler, crypto}) => {

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showDepositModal, setShowDepositModal] = useState(false)
    const [showWithdrawalModal, setShowWithdrawalModal] = useState(false)

    const dispatch = useDispatch();
    const {selectedCard} = useSelector(store => store.cryptoService);

    const selectCard = () => {
        dispatch(setSelectedCard(wallet))
    }


    const currency = wallet.coin?.toUpperCase()

    const getFullCurrency = (currency) => {
        switch (currency) {
            case 'BTC':
                return 'Bitcoin'
            case 'TRX':
                return 'Tron'
            case 'ETH':
                return 'Ethereum'
            case 'USDT':
                return 'Tether'
            default:
                return 'Tether';
        }
    }

    return (
        <Layout>
            <CryptoDepositModal
                wallet={wallet}
                showDepositModal={showDepositModal}
                showPopUp={setShowDepositModal}
            />
            <CryptoWithdrawalModal
                wallet={wallet}
                showWithdrawalModal={showWithdrawalModal}
                showPopUp={setShowWithdrawalModal}
            />

            <div onClick={() => selectCard()}
                 className={s.cardWrapper}
            >

                <div className={s.infoWrapper}>
                    <div className={s.infoBlock}>
                        <img className={s.coinIcon}
                             src={require(`../../../assets/img/currency/${currency ? currency : 'USDT'}.svg`)}/>
                        <div>
                            <p className={s.currency}>{currency ? currency : 'USDT'}</p>
                            <p className={s.fullCurrency}>({getFullCurrency(currency)})</p>
                        </div>
                        {crypto && <span className={wallet?.standard ? s.plate : s.plateNon}>{wallet?.standard}</span>}
                    </div>
                    <div className={s.amountWrapper}>
                        <p className={s.amount}>Amount</p>
                        <div className={s.amountBlock}>
                            <p className={s.amountValue}>{wallet.amount}</p>
                            <p className={s.amountCoin}>{currency ? currency : 'USDT'}</p>
                        </div>
                    </div>
                </div>
                <div className={s.buttonsWrapper}
                >
                    {crypto && <MyCardButton onClick={() => setShowDepositModal(true)} icon={'deposit'}/>}
                    {crypto && <MyCardButton onClick={() => setShowWithdrawalModal(true)} icon={'export'} type={'export'}/>}
                    </div>
            </div>
        </Layout>
    )
}
