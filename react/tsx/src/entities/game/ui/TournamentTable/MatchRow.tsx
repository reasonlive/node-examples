"use client";

import { components } from "~/shared/api";
import { FireIcon, TimeIcon } from "~/shared/assets";
import { cn } from "~/shared/lib";
import { Button } from "~/shared/ui";

import { MatchFieldsRow } from "./MatchFieldsRow";
import styles from "./MatchRow.module.css";
import { useMatchRow } from "./useMatchRow";

type MatchRowProps = {
  isLive: boolean;
  matchData: components["schemas"]["GameDtoWithGroupedMarkets"];
};

const matchFields: Record<string, string[]> = {
  basketball: ["WIN_OT__P1", "WIN_RT__PX", "WIN_OT__P2"],
  "esports.cs": ["WIN__P1", "WIN__P2"],
  "esports.dota2": ["WIN__P1", "WIN__P2"],
  hockey: ["WIN_RT__P1", "WIN_RT__PX", "WIN_RT__P2"],
  soccer: ["WIN__P1", "WIN__PX", "WIN__P2", "WIN__1X", "WIN__12", "WIN__X2"],
  "table-tennis": ["WIN__P1", "WIN__P2"],
  tennis: ["WIN__P1", "WIN__P2"],
  volleyball: ["WIN__P1", "WIN__P2"],
};

export const MatchRow: React.FC<MatchRowProps> = ({ isLive, matchData }) => {
  const { markets, marketsCount, score, totals } = useMatchRow(matchData);

  return (
    <div className={styles.MatchRow}>
      <div className={styles.matchInfo}>
        <Button
          className={styles.matchInfoLink}
          elementType={"link"}
          href={`/game/${matchData.eventId}`}
        >
          {matchData.meta && matchData.meta.raw_start_at ? (
            <div className={styles.startAt}>{matchData.meta.raw_start_at}</div>
          ) : null}
          <div className={styles.matchSeparator}></div>
          <div className={styles.matchTeamsBlock}>
            <div className={styles.matchTeams}>
              <div className={styles.team}>
                <div className={styles.teamName}>{matchData.team1}</div>
                {score?.liveScore?.active === 1 && (
                  <div className={styles.teamBadge} />
                )}
              </div>
              <div className={styles.team}>
                <div className={styles.teamName}>{matchData.team2}</div>
                {score?.liveScore?.active === 2 && (
                  <div className={styles.teamBadge} />
                )}
              </div>
            </div>

            <div className={styles.matchStatisticsContainer}>
              <div className={styles.statusIcons}>
                {matchData.priority > 0 ? (
                  <div className={styles.statusIconsContainer}>
                    {/* <p className={styles.statusIconsText}>{`Горячее`}</p> */}
                    <FireIcon className={styles.priority} />
                  </div>
                ) : null}
                {marketsCount > 1 ? (
                  <Button
                    className={styles.marketsCount}
                    elementType={"linkButton"}
                    href={`/game/${matchData.eventId}`}
                  >{`+${marketsCount}`}</Button>
                ) : null}
              </div>
              <div className={styles.matchStatistics}>
                <p className={styles.matchStatisticsLine}>
                  <span className={styles.matchScoreTotal}>
                    {score?.text.currentScore}
                  </span>
                  <span className={styles.tennisScores}>
                    <span className={styles.matchScorePeriods}>
                      {score?.text.details ? `(${score?.text.details})` : "-"}
                    </span>
                    {matchData.sport === "tennis" && (
                      <span
                        className={cn(
                          styles.matchScoreTotal,
                          styles.matchAdditionalDetails,
                        )}
                      >
                        {score?.text.liveScore
                          ? `(${score?.text.liveScore})`
                          : "-"}
                      </span>
                    )}
                  </span>
                </p>
                {score?.text.time && (
                  <p className={styles.matchStatisticsLine}>
                    <span className={styles.time}>
                      <TimeIcon className={styles.timeIcon} />
                      <span
                        className={styles.timeText}
                        suppressHydrationWarning
                      >
                        {score.text.time}
                      </span>
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </Button>
      </div>
      <div className={styles.cellsWrapper}>
        <div className={styles.cells}>
          <MatchFieldsRow
            eventId={matchData.eventId}
            eventName={matchData.eventName}
            //@ts-expect-error grouped market
            fields={
              markets
                ? matchFields[matchData.sport].map((field) => ({
                    coef: markets[field].cf,
                    groupedMarket: markets[field].groupedMarket,
                    isOpen: markets[field].isOpen,
                    market: field,
                  }))
                : []
            }
            sport={matchData.sport}
            total={totals ? (totals.total ? totals.total : "--") : null} //@ts-expect-error grouped market
            totalOver={
              totals?.totalOver || {
                cf: `--`,
                isOpen: true,
                marketName: `TOTALS__OVER`,
              }
            } //@ts-expect-error grouped market
            totalUnder={
              totals?.totalUnder || {
                cf: `--`,
                isOpen: true,
                marketName: `TOTALS__UNDER`,
              }
            }
          />
        </div>
      </div>
    </div>
  );
};
