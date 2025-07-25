"use client";

import { components } from "~/shared/api";

import styles from "./BetsHistory.module.css";
import { BetsHistoryItem } from "./BetsHistoryItem";

type BetsHistoryProps = {
  bets:
    | {
        express: components["schemas"]["ExpressBetDto"][];
        ordinar: components["schemas"]["BetDto"][];
      }
    | undefined;
};

export const BetsHistory: React.FC<BetsHistoryProps> = ({ bets }) => {
  if (typeof bets === "undefined") {
    return (
      <h3 className={styles.title}>{`Ошибка при загрузке истории ставок`}</h3>
    );
  }

  const mergedBets = [...bets.express, ...bets.ordinar].sort(
    (betFirst, betSecond) =>
      new Date(betSecond.createdAt).getTime() -
      new Date(betFirst.createdAt).getTime(),
  );

  return (
    <div className={styles.BetsHistory}>
      <h2 className={styles.heading}>{`История ставок`}</h2>
      <div className={styles.container}>
        {mergedBets.map((mergedBet) => (
          <BetsHistoryItem bet={mergedBet} key={mergedBet.id + mergedBet.cf} />
        ))}
      </div>
    </div>
  );
};
