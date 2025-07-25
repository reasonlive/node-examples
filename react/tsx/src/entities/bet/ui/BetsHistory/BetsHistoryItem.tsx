import Link from "next/link";

import { components } from "~/shared/api";
import { ArrowIcon } from "~/shared/assets";
import { Button } from "~/shared/ui";

import styles from "./BetsHistoryItem.module.css";
import { useBetHistoryItem } from "./useBetHistoryItem";

type BetsHistoryItemProps = {
  bet: components["schemas"]["BetDto"] | components["schemas"]["ExpressBetDto"];
};

export const BetsHistoryItem: React.FC<BetsHistoryItemProps> = ({ bet }) => {
  const {
    BetIcon,
    betIcons,
    betTitle,
    betTitles,
    date,
    money,
    open,
    score,
    scores,
    setOpen,
    sport,
    sports,
    statusClassName,
    statusText,
  } = useBetHistoryItem(bet);

  const id = bet?.betVariant === "ORDINAR" ? `R${bet.id}` : `E${bet.id}`;

  return (
    <div className={styles.BetsHistoryItem}>
      <Button
        className={styles.heading}
        onClick={() => setOpen((prev) => !prev)}
      >
        <p
          className={styles.betVariant}
        >{`${bet?.betVariant === "ORDINAR" ? "Ординар" : "Экспресс"}`}</p>
        <p className={styles.date}>{date}</p>
        <p className={styles.id}>{`ID: ${id}`}</p>
        <p className={styles.cf}>{`Коэф.: ${bet.cf}`}</p>
        <div className={`${styles.indicator} ${statusClassName}`}>
          {statusText}
        </div>
        <p className={styles.ammount}>{money}</p>

        <ArrowIcon
          className={`${styles.toogleIcon} ${open && styles.toogleIcon_active}`}
        />
      </Button>
      <div className={`${styles.body} ${open && styles.body_open}`}>
        {bet?.betVariant === "ORDINAR" ? (
          <div className={styles.gameInfo}>
            <div className={styles.gameSport}>
              <BetIcon className={styles.icon} />
              <p className={styles.gameInfoSport}>{sport}</p>
            </div>

            <Link className="hover:underline" href={`/game/${bet.gameId}`}>
              <div className={styles.gameInfoTextContainer}>
                <p className={styles.gameInfoText}>{bet.game.leagueName}</p>
                <p className={styles.gameInfoText}>{bet.game.eventName}</p>
              </div>
            </Link>

            <div className={styles.score}>{`Счёт: ${score}`}</div>
            <p className={styles.title}>{betTitle}</p>
          </div>
        ) : (
          <>
            {bet?.bets.map((bet, index) => {
              const Icon = betIcons[index];
              return (
                <div className={styles.gameInfo} key={bet.gameId}>
                  <div className={styles.gameSport}>
                    <Icon className={styles.icon} />
                    <p className={styles.gameInfoSport}>{sports[index]}</p>
                  </div>

                  <Link
                    className="hover:underline"
                    href={`/game/${bet.gameId}`}
                  >
                    <div className={styles.gameInfoTextContainer}>
                      <p className={styles.gameInfoText}>
                        {bet.game.leagueName}
                      </p>
                      <p className={styles.gameInfoText}>
                        {bet.game.eventName}
                      </p>
                    </div>
                  </Link>

                  <div className={styles.score}>{`Счёт: ${scores[index]}`}</div>
                  <p className={styles.title}>{betTitles[index]}</p>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
