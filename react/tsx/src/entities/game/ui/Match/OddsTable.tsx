import { useState } from "react";

import { components } from "~/shared/api";
import { ArrowIcon } from "~/shared/assets";
import { cn } from "~/shared/lib";
import { Button } from "~/shared/ui";

import { OddsItem } from "./OddsItem";
import styles from "./TournamentOdds.module.css";

type OddsTableProps = {
  eventId: string;
  eventName: string;
  markets: components["schemas"]["MarketDto"][];
  name: string;
};

export const OddsTable = ({
  eventId,
  eventName,
  markets,
  name,
}: OddsTableProps) => {
  const [isFolded, setIsFolded] = useState(false);

  const toggleFold = () => setIsFolded((prev) => !prev);

  return (
    <div className={styles.oddsTable}>
      <Button className={styles.oddFold} onClick={toggleFold}>
        <p className="text-sm font-medium">{name}</p>
        <ArrowIcon className="size-3 fill-white" />
      </Button>
      <div className={cn(styles.oddsList, isFolded && styles.oddsList_hidden)}>
        {markets
          .sort((a, b) => (a.market < b.market ? 1 : -1))
          .map((market) => (
            <OddsItem
              eventId={eventId}
              eventName={eventName}
              key={market.market}
              marketData={market}
            />
          ))}
      </div>
    </div>
  );
};
