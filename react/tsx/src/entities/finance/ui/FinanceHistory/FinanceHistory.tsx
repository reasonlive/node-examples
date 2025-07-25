import getSymbolFromCurrency from "currency-symbol-map";
import dayjs from "dayjs";
import { BadgeMinus, BadgePlus } from "lucide-react";

import { components } from "~/shared/api";
import { cn } from "~/shared/lib";

import styles from "./FinanceHistory.module.css";

type FinanceHistoryProps = {
  operations: components["schemas"]["OperationDto"][] | undefined;
};

export const FinanceHistory: React.FC<FinanceHistoryProps> = ({
  operations,
}) => {
  return (
    <div className={styles.FinanceHistory}>
      <h2 className={styles.heading}>{`Финансовые Операции`}</h2>
      {operations?.map((operation) => {
        const currency = getSymbolFromCurrency(operation.currencyCode);
        const amount = Intl.NumberFormat("ru-RU", {
          minimumFractionDigits: 2,
        }).format(Number(operation.amount));
        const money = `${amount}${currency}`;

        const operationDate = dayjs(operation.createdAt).format(
          "DD.MM.YY / HH:mm",
        );

        return (
          <div className={styles.financeItem} key={operation.id}>
            <p
              className={cn(styles.id, "text-gray-400")}
            >{`ID: F${operation.id}`}</p>
            <p className={styles.date}>{operationDate}</p>
            <p className={styles.amount}>{money}</p>
            <p className={styles.operationType}>
              {operation.type === "INCOME" && (
                <BadgePlus className="stroke-green-400" />
              )}
              {operation.type === "OUTCOME" && (
                <BadgeMinus className="stroke-red-600" />
              )}
            </p>
            {/* <p>{operation.meta?.title}</p> */}
            {operation.meta?.betId && (
              <p className="flex-1 text-right text-gray-400">
                ID ставки:{" "}
                {operation.meta?.betVariant === "ORDINAR" ? "R" : "E"}
                {operation.meta?.betId}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};
