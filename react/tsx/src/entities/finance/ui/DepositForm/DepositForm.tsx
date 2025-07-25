"use client";

import { useMemo, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";

import {
  ArrowIcon,
  KaspiLogoIcon,
  MastercardLogoIcon,
  VisaLogoIcon,
} from "~/shared/assets";
import { Button } from "~/shared/ui";

import styles from "./DepositForm.module.css";
import { SystemSelect } from "./SystemSelect";
import { forms } from "./forms";

export const DepositForm = () => {
  const currency = useReadLocalStorage<string>("currency");
  const [paymentSystem, setPaymentSystem] = useState<null | string>(null);

  const PaymentSystem = paymentSystem
    ? forms[paymentSystem]
    : () => (
        <div
          className={styles.formSection_empty}
        >{`Выберите способ пополнения`}</div>
      );

  const backOnClickHandler = () => setPaymentSystem(null);

  const inCurrency = (list: string[]) => {
    return list.some((item) => item === currency);
  };

  const currentLogos = useMemo(() => {
    switch (currency) {
      case "KZT":
        return [KaspiLogoIcon];
      default:
        return [MastercardLogoIcon, VisaLogoIcon];
    }
  }, [currency]);

  return (
    <div className={styles.DepositForm}>
      <div
        className={`${styles.systemSelectSection} ${paymentSystem && styles.systemSelectSection_hidden}`}
      >
        {inCurrency([
          "USD",
          "EUR",
          "KZT",
          "RUB",
          "UZS",
          "TJS",
          "KGS",
          "AZH",
          "UAH",
        ]) && (
          <SystemSelect
            formName="CrocoPayForm"
            icons={currentLogos}
            paymentSystem={paymentSystem}
            setPaymentSystem={setPaymentSystem}
            text="CrocoPay"
          />
        )}
        {inCurrency(["RUB"]) && (
          <SystemSelect
            formName="AaioForm"
            icons={currentLogos}
            paymentSystem={paymentSystem}
            setPaymentSystem={setPaymentSystem}
            text="Карты"
          />
        )}
      </div>
      <div
        className={`${styles.formSection} ${paymentSystem && styles.formSection_open}`}
      >
        {paymentSystem ? (
          <Button className={styles.back} onClick={backOnClickHandler}>
            <ArrowIcon className={styles.backIcon} />
          </Button>
        ) : null}

        <PaymentSystem />
      </div>
    </div>
  );
};
