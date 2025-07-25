import { AllGames } from "~/entities/game";
import { api } from "~/shared/api";

import styles from "./Home.module.css";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data, error } = await api.GET("/api/games/live", {
    cache: "no-cache",
    params: { query: { limit: 10, offset: 0 } },
  });
  if (error) {
    return <h2 className={styles.err}>Не удалось загрузить данные</h2>;
  }
  return <AllGames className={styles.games} initialData={data} />;
}
