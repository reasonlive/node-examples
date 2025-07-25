import { components } from "~/shared/api";
import { cn } from "~/shared/lib";

import Team1Img from "./team1.png";
import Team2Img from "./team2.png";

import Image from "next/image";
import { gamesList } from "../../lib";
import styles from "./ScoreBoard.module.css";

const translateSport = (sport?: string) => {
  if (!sport) return;
  return gamesList[sport]?.label ?? sport;
};

const translateInfoName = (sport: string) => {
  return {
    basketball: "Четверь",
    hockey: "Период",
    soccer: "Тайм",
    "table-tennis": "Сет",
    tennis: "Сет",
    volleyball: "Сет",
  }[sport];
};

type ScoreProps = {
  game: components["schemas"]["GameDtoWithGroupedMarkets"];
};

export const ScoreBoard = ({ game }: ScoreProps) => {
  const score = game.parsedScore;

  if (game.status === "PREMATCH") {
    return (
      <div
        className="mb-4 grid gap-6 rounded-lg px-1 py-3"
        style={{
          background: `radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%), url(/${game.sport}.jpg) center / cover`,
          height: `320px`,
        }}
      >
        <div className="grid grid-cols-3 items-center justify-items-center rounded-sm bg-white/5 text-center">
          <div>{translateSport(game.sport)}</div>
          <div style={{ width: "100px" }}>
            {game.meta && `Начнётся: ${game.meta.raw_start_at}`}
            <br />
            {game.eventName}
          </div>
          <div>{game.leagueName}</div>
        </div>
      </div>
    );
  }
  const firstPlayerScores = score?.details?.map(([f]) => f);
  const secondPlayerScores = score?.details?.map(([_f, s]) => s);

  const periodName = translateInfoName(game.sport);

  const currentScoreForEachPlayer = score?.currentScore ?? [];

  const mainScore =
    game.sport === "tennis"
      ? score?.text?.liveScore
      : score?.text?.currentScore;

  return (
    <>
      <div
        className="mb-4 grid gap-6 rounded-lg px-1 py-3"
        style={{
          background: `radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%), url(/${game.sport}.jpg) center / cover`,
        }}
      >
        <div className="grid grid-cols-3 items-center justify-items-center rounded-sm bg-white/5 text-center">
          <div>{translateSport(game.sport)}</div>
          <div suppressHydrationWarning>{score?.text.time}</div>
          <div>{game.leagueName}</div>
        </div>

        <div className="grid place-content-center">
          <div className="grid justify-items-center gap-3">
            <div className="grid grid-cols-[1fr_auto_1fr] gap-4">
              <div className="text-md flex items-center justify-end gap-2 font-medium">
                <span className="flex items-center gap-2">
                  {score?.liveScore?.active === 1 && (
                    <div className="size-2 rounded-full bg-green-400" />
                  )}
                  {game.team1}
                </span>
                <Image alt="team-1" src={Team1Img} width={64} />
              </div>
              <div className={styles.game__info}>
                <div className={styles.game__heading}>
                  {game.status === "FINISHED" && "Окончена"}
                  {game.status === "CANCELED" && "Отменена"}
                  {game.status === "IN_PROGRESS" &&
                    `${score.period ?? "1"} ${periodName}`}
                  {game.status === "STARTING" && "Скоро начнётся"}
                </div>
                <div className={styles.game__score}>{mainScore ?? "-:-"}</div>
              </div>

              <div className="text-md flex items-center gap-2 font-medium">
                <Image alt="team-2" src={Team2Img} width={64} />
                <span className="flex items-center gap-2">
                  {game.team2}
                  {score?.liveScore?.active === 2 && (
                    <div className="size-2 rounded-full bg-green-400" />
                  )}
                </span>
              </div>
            </div>

            <div className="flex max-w-max gap-7 rounded-lg bg-white/5 p-4">
              <div className={styles.scoreboardRow}>
                <div className={styles.scoreboardHeading}>Игрок</div>
                <div className={styles.scoreboardHeading}>Общий счёт</div>
                {score?.details?.map((_, index) => {
                  return (
                    <div className={styles.match_score_td} key={index}>
                      {index + 1} {periodName}
                    </div>
                  );
                })}
              </div>
              <div className={styles.scoreboardRow}>
                <div className={cn(styles.scoreboardCell, styles.playerName)}>
                  {game.team1}
                </div>
                {currentScoreForEachPlayer[0] ?? "-"}
                {firstPlayerScores?.map((score, index) => {
                  return (
                    <div
                      className={cn(styles.scoreboardCell, styles.primaryScore)}
                      key={index}
                    >
                      {score}
                    </div>
                  );
                })}
              </div>
              <div className={styles.scoreboardRow}>
                <div className={cn(styles.scoreboardCell, styles.playerName)}>
                  {game.team2}
                </div>
                {currentScoreForEachPlayer[1] ?? "-"}
                {secondPlayerScores?.map((score, index) => {
                  return (
                    <div
                      className={cn(styles.scoreboardCell, styles.primaryScore)}
                      key={index}
                    >
                      {score}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
