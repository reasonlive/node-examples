"use client";

import { useParams } from "next/navigation";

import { components } from "~/shared/api";
import { LoadingScreen } from "~/shared/ui";

import { useGamesWebSocket } from "../../lib/useGamesWebSocket";
import styles from "./Match.module.css";
import { ScoreBoard } from "./ScoreBoard";
import { TournamentOdds } from "./TournamentOdds";

type MatchProps = {
  matchData?: components["schemas"]["GameDtoWithGroupedMarkets"];
};

export const Match = ({ matchData }: MatchProps) => {
  const { eventId } = useParams<{ eventId: string }>();

  const { data, isLoading } = useGamesWebSocket({
    eventId,
    initialData: matchData,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!data) {
    return <h2 className={styles.err}>Матч не найден</h2>;
  }

  return (
    <div className={styles.Match}>
      <ScoreBoard game={data} />
      <TournamentOdds game={data} />
    </div>
  );
};
