import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { Rates } from "~/entities/bet";
import { components } from "~/shared/api";
import { LockIcon } from "~/shared/assets";
import { usePrevious } from "~/shared/model";
import { Button } from "~/shared/ui";

import styles from "./MatchRow.module.css";

type MatchFieldsCellProps = {
  className?: string;
  eventId: string;
  eventName: string;
  groupedMarket: components["schemas"]["MarketDto"];
  isOpen: boolean;
  market: string;
  value: string;
};

export const MatchFieldsCell: React.FC<MatchFieldsCellProps> = ({
  className,
  eventId,
  eventName,
  groupedMarket,
  isOpen,
  market,
  value,
}) => {
  const { prevState } = usePrevious(value);
  const [rates, setRates] = useLocalStorage<Rates>("rates", [], {
    initializeWithValue: false,
  });
  const [isRateAdded, setIsRateAdded] = useState(false);

  const toggleRate = (market: string, coef: string) => () => {
    if (!isRateAdded) {
      setRates((prev) => {
        const isAnyMatchRateAdded = rates.findIndex(
          (rate) => rate.eventId === eventId,
        );
        if (isAnyMatchRateAdded !== -1) {
          const newRates = [...prev];
          newRates[isAnyMatchRateAdded] = {
            coef,
            eventId: eventId,
            eventName,
            groupedMarket,
            isOpen,
            market,
          };
          return newRates;
        }
        return [
          ...prev,
          { coef, eventId: eventId, eventName, groupedMarket, isOpen, market },
        ];
      });
      setIsRateAdded(true);
    } else {
      setRates((prev) => {
        const index = prev.findIndex((rate) => {
          return rate.market === market && rate.eventId === eventId;
        });

        const newRates = [...prev];
        newRates.splice(index, 1);

        return newRates;
      });
      setIsRateAdded(false);
    }
  };

  useEffect(() => {
    if (isRateAdded) {
      setRates((prev) =>
        prev.map((rate) =>
          rate.market === market && rate.eventId === eventId
            ? { coef: value, eventId, eventName, groupedMarket, isOpen, market }
            : rate,
        ),
      );
    }
    if (!isRateAdded) {
      const index = rates.findIndex(
        (rate) => rate.market === market && rate.eventId === eventId,
      );
      if (index !== -1) {
        setIsRateAdded(true);
      }
    }
  }, [isRateAdded, value, market, eventId, setRates, eventName, isOpen]);
  useEffect(() => {
    if (isRateAdded) {
      const index = rates.findIndex(
        (rate) => rate.market === market && rate.eventId === eventId,
      );
      if (index === -1) {
        setIsRateAdded(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rates]);

  type StatusClassNames = { cell?: string; coef?: string };

  const statusClassNames: StatusClassNames =
    value === "--"
      ? { cell: ``, coef: `` }
      : typeof prevState === "undefined"
        ? { cell: ``, coef: `` }
        : Number(prevState) === Number(value)
          ? { cell: ``, coef: `` }
          : Number(prevState) > Number(value)
            ? { cell: styles.oddCell_up, coef: styles.oddCoefficient_up }
            : { cell: styles.oddCell_down, coef: styles.oddCoefficient_down };

  return (
    <Button
      className={`${styles.oddCell} ${statusClassNames.cell} ${isRateAdded && styles.oddCell_added} ${className}`}
      data-market={market}
      disabled={!isOpen}
      onClick={
        isOpen && value !== `--` && market !== "FRONT_NEEDS_TOTAL"
          ? toggleRate(market, value)
          : undefined
      }
    >
      {isOpen ? null : <LockIcon className={styles.lock} />}
      <p className={styles.addedGameName}>
        {market === "WIN__P1" ||
        market === "WIN_RT__P1" ||
        market === "WIN_OT__P1"
          ? `П1`
          : market === "WIN__P2" ||
              market === "WIN_RT__P2" ||
              market === "WIN_OT__P2"
            ? `П2`
            : market === "WIN__PX" ||
                market === "WIN_RT__PX" ||
                market === "WIN_OT__PX"
              ? `X`
              : ``}
      </p>
      <p
        className={`${styles.oddCoefficient} ${statusClassNames.coef} ${isRateAdded && styles.oddCoefficient_added}`}
      >
        {value}
      </p>
    </Button>
  );
};
