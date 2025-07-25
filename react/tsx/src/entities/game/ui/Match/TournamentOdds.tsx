import { components } from "~/shared/api";

import { OddsTable } from "./OddsTable";
import styles from "./TournamentOdds.module.css";

const translateName = (name?: string) => {
  if (!name) return "";
  return (
    {
      HANDICAP: "Форы на матч",
      HANDICAP_HALF_01: "Форы на первую половину",
      HANDICAP_HALF_02: "Форы на вторую половину",
      HANDICAP_OT: "Форы на матч (включая ОТ)",
      HANDICAP_RT: "Форы на матч (без ОТ)",
      HANDICAP_SET_01: "Форы на первый сет",
      HANDICAP_SET_02: "Форы на второй сет",
      HANDICAP_SET_03: "Форы на третий сет",
      HANDICAP_SET_04: "Форы на четвертый сет",
      TOTALS: "Тоталы на матч",
      TOTALS_HALF_01: "Тоталы на первую половину",
      TOTALS_HALF_02: "Тоталы на вторую половину",
      TOTALS_OT: "Тоталы на матч (включая ОТ)",
      TOTALS_RT: "Тоталы на матч (без ОТ)",
      TOTALS_SET_01: "Тоталы на первый сет",
      TOTALS_SET_02: "Тоталы на второй сет",
      TOTALS_SET_03: "Тоталы на третий сет",
      TOTALS_SET_04: "Тоталы на четвертый сет",
      WIN: "Победа в матче",
      WIN_HALF_01: "Победа в первой половине",
      WIN_HALF_02: "Победа во второй половине",
      WIN_OT: "Победа в матче (включая ОТ)",
      WIN_RT: "Победа в матче (без ОТ)",
      WIN_SET_01: "Победа в первом сете",
      WIN_SET_02: "Победа во втором сете",
      WIN_SET_03: "Победа в третьем сете",
      WIN_SET_04: "Победа в четвертом сете",
    }[name] ?? name
  );
};

type TournamentOddsProps = {
  game: components["schemas"]["GameDtoWithGroupedMarkets"];
};

export const TournamentOdds = ({ game }: TournamentOddsProps) => {
  const markets = game.groupedMarkets;

  if (
    !markets ||
    game.status === "FINISHED" ||
    game.status === "CANCELED" ||
    Object.keys(markets).length === 0
  ) {
    return (
      <section className={styles.TournamentOdds}>
        <h3 className="text-md py-4 text-center font-medium">
          Ставок больше нет
        </h3>
      </section>
    );
  }

  const sortedMarkets = Object.entries(markets).sort((a, b) =>
    a[0] < b[0] ? 1 : -1,
  );

  const winIndex = sortedMarkets.findIndex(
    (market) =>
      market[0].match(/^WIN$/) ||
      market[0].match(/^WIN_OT$/) ||
      market[0].match(/^WIN_RT$/),
  );

  if (winIndex !== -1) {
    const firstEl = sortedMarkets[0];
    const winEl = sortedMarkets[winIndex];
    sortedMarkets[winIndex] = firstEl;
    sortedMarkets[0] = winEl;
  }

  return (
    <section className={styles.TournamentOdds}>
      <div className={styles.oddsTables}>
        {sortedMarkets.map(([name, marketsOfBasis]) => {
          return (
            <OddsTable
              eventId={game.eventId}
              eventName={game.eventName}
              key={name}
              markets={marketsOfBasis}
              name={translateName(name)}
            />
          );
        })}
      </div>
    </section>
  );
};
