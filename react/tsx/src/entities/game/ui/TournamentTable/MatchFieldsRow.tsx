import { components } from "~/shared/api";

import { MatchFieldsCell } from "./MatchFieldsCell";
import styles from "./MatchRow.module.css";

type MatchFieldsRowProps = {
  eventId: string;
  eventName: string;
  fields: {
    coef: string;
    groupedMarket: components["schemas"]["MarketDto"];
    isOpen: boolean;
    market: string;
  }[];
  sport: string;
  total: null | string;
  totalOver: {
    cf: string;
    groupedMarket: components["schemas"]["MarketDto"];
    isOpen: boolean;
    marketName: string;
  };
  totalUnder: {
    cf: string;
    groupedMarket: components["schemas"]["MarketDto"];
    isOpen: boolean;
    marketName: string;
  };
};

export const MatchFieldsRow: React.FC<MatchFieldsRowProps> = ({
  eventId,
  eventName,
  fields,
  sport,
  total,
  totalOver,
  totalUnder,
}) => {
  return (
    <>
      {fields.map((field, index) => {
        return (
          <MatchFieldsCell
            eventId={eventId}
            eventName={eventName}
            groupedMarket={field.groupedMarket}
            isOpen={field.isOpen}
            key={field.market + index}
            market={field.market}
            value={field.coef}
          />
        );
      })}
      {total ? (
        <>
          <MatchFieldsCell
            className={styles.oddCell_special}
            eventId={eventId}
            eventName={eventName}
            //@ts-expect-error kostyl
            groupedMarket={undefined}
            isOpen={true}
            market="FRONT_NEEDS_TOTAL"
            value={total}
          />
          <MatchFieldsCell
            eventId={eventId}
            eventName={eventName}
            groupedMarket={totalUnder.groupedMarket}
            isOpen={totalUnder.isOpen}
            market={`${totalUnder.marketName}(${total})`}
            value={totalUnder.cf}
          />
          <MatchFieldsCell
            eventId={eventId}
            eventName={eventName}
            groupedMarket={totalOver.groupedMarket}
            isOpen={totalOver.isOpen}
            market={`${totalOver.marketName}(${total})`}
            value={totalOver.cf}
          />
        </>
      ) : null}
    </>
  );
};
