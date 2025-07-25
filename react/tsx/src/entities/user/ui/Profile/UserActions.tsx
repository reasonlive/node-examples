"use client";

import { cn } from "~/shared/lib";
import { Button } from "~/shared/ui";

import styles from "./UserActions.module.css";

export const UserActions: React.FC = () => {
  return (
    <div className={styles.UserActions}>
      <div className={styles.options}>
        <Button
          className={cn(styles.option)}
          elementType="link"
          href={`/profile/betHistory`}
        >{`История ставок`}</Button>
        <Button
          className={cn(styles.option)}
          elementType="link"
          href={`/profile/financeHistory`}
        >{`Финансовые операции`}</Button>
      </div>
    </div>
  );
};
