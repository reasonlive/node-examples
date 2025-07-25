"use client";

import { ToggleIcon, UserIcon } from "~/shared/assets";
import { Button } from "~/shared/ui";

import { Auth } from "./Auth";
import styles from "./Content.module.css";
import { Deposit } from "./Deposit";
import { List } from "./List";

type ContentProps = {
  isAuth: boolean;
};

export const Content: React.FC<ContentProps> = ({ isAuth }) => {
  return (
    <>
      <List />
      {isAuth ? (
        <div className={styles.actionsDesctop}>
          <Deposit />
          <Button
            className={styles.user_wrapper}
            elementType="link"
            href="/profile"
          >
            <span className={styles.user_line}>
              <span className={styles.userRound_wrapper}>
                <span className={`${styles.userRound}`}>
                  <UserIcon />
                </span>
              </span>
              <div className={styles.menu_toggle}>
                <ToggleIcon />
              </div>
            </span>
          </Button>
        </div>
      ) : (
        <div className={styles.actionsDesctop}>
          <Auth />
        </div>
      )}
    </>
  );
};
