import { useQuery } from "@tanstack/react-query";
import getSymbolFromCurrency from "currency-symbol-map";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";

import { useGamesBettingContext } from "~/app/providers";
import { getUser } from "~/entities/user/api";
import { TrashIcon } from "~/shared/assets";
import { cn } from "~/shared/lib";
import { Button, Checkbox, Input } from "~/shared/ui";

import { createBet } from "../../api";
import { Rate, Rates } from "../../types";
import { BetList } from "./BetList";
import styles from "./BetTab.module.css";

type BetTabProps = {
  classNameContainer?: string;
  setIsOpen: (value: React.SetStateAction<boolean | undefined>) => void;
};
type Variant = "express" | "ordinar" | "series";

export const BetTab: React.FC<BetTabProps> = ({
  classNameContainer,
  setIsOpen,
}) => {
  const { isAuth } = useGamesBettingContext();
  const [rates, setRates] = useLocalStorage<Rates>("rates", [], {
    initializeWithValue: false,
  });
  const currency = useReadLocalStorage<string>("currency", {
    initializeWithValue: false,
  });

  const [variant, setVariant] = useState<Variant>("ordinar");
  const [agree, setAgree] = useState<boolean>(true);
  const [sum, setSum] = useState("");
  const [kf, setKf] = useState(0);

  const { data, refetch } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
  });

  useEffect(() => {
    if (rates.length < 2) {
      setVariant("ordinar");
    } else if (rates.length > 1) {
      setVariant("express");
    }
    console.log(rates);
    setKf(
      rates
        .map((rate) => +rate.coef)
        .reduce((partialProduct, a) => partialProduct * a, 1),
    );
  }, [rates]);

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSum = event.target.value;
    if (newSum.includes(".")) {
      const strAfterDot = newSum.split(".", 2)[1];
      if (strAfterDot.length <= 2) {
        setSum(newSum);
      } else {
        const strBeforeDot = newSum.split(".", 1)[0];
        setSum(strBeforeDot + "." + strAfterDot[0] + strAfterDot[1]);
      }
    } else {
      setSum(newSum);
    }
  };
  const checkBoxOnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setVariant(event.target.value as Variant);
  };

  const agreeOnChangeHandler = () => {
    setAgree((prev) => !prev);
  };

  const trashButtonOnClickHandler = () => {
    setRates([]);
  };
  const deleteButtonOnClickHandler = (item: Rate) => {
    const updatedRates = rates.filter((rate) => rate.coef !== item.coef);
    return setRates(updatedRates);
  };

  const isAllOpen =
    rates.filter((rate) => rate.isOpen === false || rate.coef === `--`)
      .length === 0;

  const createBetOnClick = async () => {
    if (!rates.length) return;
    if (!isAllOpen) {
      return toast("⚠️ Нельзя поставить на закрытое событие", {
        position: "top-right",
      });
    }
    if (!isAuth) {
      return toast("⚠️ Войдите или зарегистрируйтесь для создания ставки", {
        position: "top-right",
      });
    }
    if (!agree) {
      return toast("⚠️ Подтвердите соглашение для создания ставки", {
        position: "top-right",
      });
    }
    if (!currency) return;
    const userBalance = data?.balances?.find(
      ({ currencyCode }) => currencyCode === currency,
    )?.amount;
    if (userBalance == null || Number(userBalance) < Number(sum)) {
      toast("⚠️ На вашем счету недосточно средств", { position: "top-right" });
      refetch();
      return;
    }

    try {
      await createBet({
        amount: Number(sum),
        currencyCode: currency,
        rates: rates,
        type: variant,
      });
      toast(`✅ Ставка успешно создана`);
      setIsOpen(false);
      setRates([]);
      refetch();
    } catch (e) {
      toast(`⚠️ Не удалось сделать ставку: ${e?.message}`);
    }
  };

  rates.forEach((rate) => {
    if (rate.sum) {
      setSum(sum + Number(rate.sum));
    }
  });

  const betAllMoney = () => {
    const balance =
      data?.balances?.find(({ currencyCode }) => currencyCode === currency)
        ?.amount ?? "0";
    setSum(balance);
  };

  return (
    <>
      <div className={`${styles.BetTab} ${classNameContainer}`}>
        <div className={styles.couponTypeRadiogroup}>
          <Checkbox
            checked={variant === "ordinar"}
            classNames={{
              Checkbox: styles.checkbox,
              icon: styles.icon,
              iconBox: styles.iconBox,
              text: styles.checkboxText,
            }}
            disabled={rates.length > 1}
            onChange={checkBoxOnChangeHandler}
            value="ordinar"
          >{`Ординар`}</Checkbox>
          <Checkbox
            checked={variant === "express"}
            classNames={{
              Checkbox: styles.checkbox,
              icon: styles.icon,
              iconBox: styles.iconBox,
              text: styles.checkboxText,
            }}
            disabled={rates.length < 2}
            onChange={checkBoxOnChangeHandler}
            value="express"
          >{`Экспресс`}</Checkbox>
        </div>

        <BetList
          deleteButtonOnClickHandler={deleteButtonOnClickHandler}
          rates={rates}
          variant={variant}
        />

        {rates.length === 0 && (
          <>
            <div className={styles.totalWin}>
              <p className={styles.totalWinText}>{`Возможный выигрыш`}</p>
              <p className={styles.totalWinText}>
                {currency && `0.00${getSymbolFromCurrency(currency)}`}
              </p>
            </div>

            <div className={styles.baseCouponBetForm}>
              <Input
                className={styles.BaseCouponInput}
                disabled
                placeholder="Сумма ставки"
              />
              <Button className={cn(styles.allInButton, styles.allIn)} disabled>
                Поставить все
              </Button>
            </div>
          </>
        )}

        {rates.length > 0 && (
          <>
            <div className={styles.totalWin}>
              <p className={styles.totalWinText}>{`Возможный выигрыш`}</p>
              <p className={styles.totalWinText}>
                {currency &&
                  `${(Number(kf) * Number(sum)).toFixed(2)}${getSymbolFromCurrency(currency)}`}
              </p>
            </div>
            <div className={styles.baseCouponBetForm}>
              <Input
                className={styles.BaseCouponInput}
                inputMode="decimal"
                min={0}
                onChange={inputOnChange}
                onKeyDown={(e) => {
                  if (e.code === "Minus") {
                    e.preventDefault();
                  }
                }}
                placeholder="Сумма ставки"
                type="number"
                value={sum}
              />
              <Button
                className={`${styles.allInButton} ${styles.allIn}`}
                onClick={betAllMoney}
              >
                Поставить все
              </Button>
            </div>
          </>
        )}

        <div className={styles.agree}>
          <Checkbox
            checked={agree}
            classNames={{
              Checkbox: styles.agreeCheckbox,
              text: styles.agreeText,
            }}
            onChange={agreeOnChangeHandler}
          >{`Всегда соглашаться с изменением коэффициента`}</Checkbox>
          <Button className={styles.remove} onClick={trashButtonOnClickHandler}>
            <TrashIcon className={styles.removeIcon} />
          </Button>
        </div>

        <Button
          className={styles.baseCouponSubmit}
          disabled={Number(sum) <= 0 || !agree}
          onClick={createBetOnClick}
          type="submit"
        >
          Сделать ставку
        </Button>
      </div>
    </>
  );
};
