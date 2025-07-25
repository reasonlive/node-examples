import getSymbolFromCurrency from "currency-symbol-map";
import dayjs from "dayjs";
import { useState } from "react";

import { createTitleForBet } from "~/entities/bet/lib";
import { gamesList } from "~/entities/game";
import { components } from "~/shared/api";

import styles from "./BetsHistoryItem.module.css";

export const useBetHistoryItem = (
  bet: components["schemas"]["BetDto"] | components["schemas"]["ExpressBetDto"],
) => {
  const date = dayjs(bet.createdAt).format("DD.MM.YY / HH:mm");

  let statusClassName = ``;
  let statusText = ``;
  switch (bet.status) {
    case "WIN": {
      statusClassName = styles.indicator_win;
      statusText = `Победа`;
      break;
    }
    case "LOSE": {
      statusClassName = styles.indicator_lose;
      statusText = `Проигрыш`;
      break;
    }
    case "PENDING": {
      statusClassName = styles.indicator_pending;
      statusText = `Ожидание`;
      break;
    }
    case "RETURN": {
      statusClassName = styles.indicator_return;
      statusText = `Возврат`;
      break;
    }
  }
  const currency = getSymbolFromCurrency(bet.currencyCode);
  const amount = Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
  }).format(Number(bet.amount));

  const money = `${amount}${currency}`;

  const [open, setOpen] = useState(false);

  const betTitle =
    bet.betVariant === "ORDINAR" ? createTitleForBet(bet.betInfo) : null;
  const betTitles =
    bet.betVariant === undefined
      ? bet.bets.map((bet) => createTitleForBet(bet.betInfo))
      : null;

  const BetIcon =
    bet.betVariant === "ORDINAR" ? gamesList[bet.game.sport].Icon : null;
  const betIcons =
    bet.betVariant === undefined
      ? bet.bets
          .map((bet) => bet.game.sport)
          .map((sport) => gamesList[sport].Icon)
      : null;

  const sport =
    bet.betVariant === "ORDINAR" ? gamesList[bet.game.sport].label : null;
  const sports =
    bet.betVariant === undefined
      ? bet.bets.map((bet) => gamesList[bet.game.sport].label)
      : null;
  const score =
    bet.betVariant === "ORDINAR" ? bet.game.score.split(" ")[0] : null;
  const scores =
    bet.betVariant === undefined
      ? bet.bets.map((bet) => bet.game.score.split(" ")[0])
      : null;
  return {
    BetIcon,
    betIcons,
    betTitle,
    betTitles,
    date,
    money,
    open,
    score,
    scores,
    setOpen,
    sport,
    sports,
    statusClassName,
    statusText,
  };
};
