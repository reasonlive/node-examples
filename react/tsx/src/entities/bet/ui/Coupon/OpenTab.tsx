import { useQuery } from "@tanstack/react-query";

import { getBets } from "~/entities/bet/api";
import { Button, LoadingSpinner } from "~/shared/ui";

import { createTitleForBet } from "../../lib";
import styles from "./OpenTab.module.css";

export const OpenTab = () => {
  const { data, isLoading } = useQuery({
    queryFn: () => getBets("PENDING"),
    queryKey: ["bets", "pending"],
  });

  const counter = (data?.ordinar?.length ?? 0) + (data?.express?.length ?? 0);

  const ordinars = data?.ordinar?.map((ordinarBet) => (
    <div className={styles.bets} key={ordinarBet.id}>
      <div className={styles.coupon_wrapper} key={1}>
        <div className={styles.header}>
          <div className={styles.header_type}>
            Ординар <span className={styles.id}>(ID R{ordinarBet.id})</span>
          </div>
        </div>
        <div className={styles.coupon_padding}>
          <div className={styles.coefficient_wrapper}>
            <div className={styles.coefficient_name}>
              {createTitleForBet(ordinarBet.betInfo)}
            </div>
            <div className={styles.coefficient}>{ordinarBet.cf}</div>
          </div>
          <div className={styles.betInfo}>
            <div>
              <p className={styles.coupon_name}>{ordinarBet.game.eventName}</p>
            </div>
            <div>
              <p className={styles.coupon_subname}>
                ({ordinarBet.game.leagueName})
              </p>
            </div>
            <Button
              className={styles.goToEvent}
              elementType={"link"}
              href={`/game/${ordinarBet.gameId}`}
            >{`Перейти к событию`}</Button>
          </div>
        </div>
      </div>
      <div className={styles.coupon_active}>
        <div className={styles.coupon_active_info}>
          <div className={styles.info_wrapper}>
            <p className={styles.coupon_info_title}>Ставка</p>
            <p className={styles.coupon_info_value}>
              {ordinarBet.amount} {ordinarBet.currencyCode}
            </p>
          </div>
          <div className={styles.info_wrapper}>
            <p className={styles.coupon_info_title}>Коэф</p>
            <p className={styles.coupon_info_value}>{ordinarBet.cf}</p>
          </div>
          <div className={styles.win_wrapper}>
            <p className={styles.coupon_info_value}>Возм. выигрыш</p>
            <p className={styles.coupon_info_value}>
              {(ordinarBet.amount * ordinarBet.cf).toFixed(2)}{" "}
              {ordinarBet.currencyCode}
            </p>
          </div>
        </div>
      </div>
    </div>
  ));

  const expresses = data?.express?.map((expressBet) => (
    <div className={styles.bets} key={expressBet.id}>
      {expressBet.bets.map((bet, index) => (
        <div className={styles.coupon_wrapper} key={1}>
          {index === 0 && (
            <div className={styles.header}>
              <div className={styles.header_type}>
                Экспресс{" "}
                <span className={styles.id}>(ID E{expressBet.id})</span>
              </div>
            </div>
          )}
          <div className={styles.coupon_padding}>
            <div className={styles.coefficient_wrapper}>
              <div className={styles.coefficient_name}>
                {createTitleForBet(bet.betInfo)}
              </div>
              <div className={styles.coefficient}>{bet.cf}</div>
            </div>
            <div className={styles.betInfo}>
              <div>
                <p className={styles.coupon_name}>{bet.game.eventName}</p>
              </div>
              <div>
                <p className={styles.coupon_subname}>({bet.game.leagueName})</p>
              </div>
              <Button
                className={styles.goToEvent}
                elementType={"link"}
                href={`/game/${bet.gameId}`}
              >{`Перейти к событию`}</Button>
            </div>
          </div>
        </div>
      ))}
      <div className={styles.coupon_active}>
        <div className={styles.coupon_active_info}>
          <div className={styles.info_wrapper}>
            <p className={styles.coupon_info_title}>Ставка</p>
            <p className={styles.coupon_info_value}>
              {expressBet.amount} {expressBet.currencyCode}
            </p>
          </div>
          <div className={styles.info_wrapper}>
            <p className={styles.coupon_info_title}>Коэф</p>
            <p className={styles.coupon_info_value}>{expressBet.cf}</p>
          </div>
          <div className={styles.win_wrapper}>
            <p className={styles.coupon_info_value}>Возм. выигрыш</p>
            <p className={styles.coupon_info_value}>
              {(expressBet.amount * expressBet.cf).toFixed(2)}{" "}
              {expressBet.currencyCode}
            </p>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className={styles.openTab}>
      {isLoading && <LoadingSpinner />}
      {ordinars}
      {expresses}
      {counter === 0 && (
        <div className={styles.notFound}>Вы не сделали ни одной ставки</div>
      )}
    </div>
  );
};
