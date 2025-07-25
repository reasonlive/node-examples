import { useParams } from "next/navigation";

import { gamesList } from "~/entities/game";
import { cn } from "~/shared/lib";
import { Button } from "~/shared/ui";

import styles from "./Menu.module.css";

export const Menu = () => {
  const { sport } = useParams<{ sport: string }>();
  return (
    <div className={styles.Menu}>
      <div className={styles.wrapper}>
        <Button
          className={cn(styles.item, sport == null && styles.item_active)}
          elementType="link"
          href="/line"
          key="All"
        >
          <p className={styles.text}>Все</p>
        </Button>
        {Object.values(gamesList).map(({ Icon, label, name }) => {
          return (
            <Button
              className={cn(styles.item, name === sport && styles.item_active)}
              elementType="link"
              href={`/line/${name}`}
              key={name}
            >
              <Icon className={styles.icon} />
              <p className={styles.text}>{label}</p>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
