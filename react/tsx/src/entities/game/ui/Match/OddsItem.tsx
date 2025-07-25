import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { Rates } from "~/entities/bet";
import { createTitleForBet } from "~/entities/bet/lib";
import { components } from "~/shared/api";
import { LockIcon } from "~/shared/assets";
import { cn } from "~/shared/lib";
import { usePrevious } from "~/shared/model";
import { Button } from "~/shared/ui";

import { convertToFixed } from "../../lib";
import styles from "./TournamentOdds.module.css";

type OddsItemProps = {
  eventId: string;
  eventName: string;
  marketData: components["schemas"]["MarketDto"];
};

export const OddsItem: React.FC<OddsItemProps> = ({
  eventId,
  eventName,
  marketData,
}) => {
  const value = `${marketData.cf}`;
  const market = marketData.market;

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
            isOpen: marketData.isOpen,
            market,
            title: createTitleForBet(marketData),
          };
          return newRates;
        }
        return [
          ...prev,
          {
            coef,
            eventId: eventId,
            eventName,
            isOpen: marketData.isOpen,
            market,
            title: createTitleForBet(marketData),
          },
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
            ? {
                coef: value,
                eventId,
                eventName,
                groupedMarket: marketData,
                isOpen: marketData.isOpen,
                market,
                title: createTitleForBet(marketData),
              }
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
  }, [
    isRateAdded,
    value,
    market,
    eventId,
    setRates,
    eventName,
    marketData.isOpen,
  ]);
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

  type StatusClassNames = { coef?: string; item?: string };

  const statusClassNames: StatusClassNames =
    value === "--"
      ? { coef: ``, item: `` }
      : typeof prevState === "undefined"
        ? { coef: ``, item: `` }
        : Number(prevState) === Number(value)
          ? { coef: ``, item: `` }
          : Number(prevState) > Number(value)
            ? { coef: styles.oddCoefficient_up, item: styles.oddItem_up }
            : { coef: styles.oddCoefficient_down, item: styles.oddItem_down };

  return (
    <div
      className={cn(
        styles.oddsItem,
        !marketData.isOpen && styles.oddsItem_lock,
      )}
      key={marketData.market}
    >
      <Button
        className={cn(
          styles.odd,
          styles.odd_left,
          isRateAdded && styles.odd_added,
          statusClassNames.item,
        )}
        disabled={!marketData.isOpen}
        onClick={toggleRate(market, value)}
      >
        {!marketData.isOpen && <LockIcon className={styles.lock} />}
        <p className="text-sm font-medium text-black">
          {createTitleForBet(marketData)}
        </p>
        <p
          className={cn(
            styles.oddCoef,
            isRateAdded && styles.oddCoef_added,
            statusClassNames.coef,
          )}
        >
          {convertToFixed(`${marketData.cf}`)}
        </p>
      </Button>
    </div>
  );
};
