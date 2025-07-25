import { Metadata } from "next";

import { AllGamesPrematch } from "~/entities/game";
import { api } from "~/shared/api";
import { makeMetadata } from "~/shared/lib";

import styles from "./Home.module.css";

export const metadata: Metadata = makeMetadata("Линия");

export const dynamic = "force-dynamic";

export default async function Line() {
  const { data, error } = await api.GET("/api/games/prematch", {
    cache: "no-cache",
    params: { query: { limit: 10, offset: 0 } },
  });
  if (error) {
    return <h2 className={styles.err}>Не удалось загрузить данные</h2>;
  }
  return <AllGamesPrematch className={styles.games} initialData={data} />;
}
