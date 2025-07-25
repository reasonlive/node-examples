import { Metadata } from "next";

import { BetsHistory } from "~/entities/bet";
import { getSession } from "~/entities/user/lib";
import { api } from "~/shared/api";
import { makeMetadata } from "~/shared/lib";

export const metadata: Metadata = makeMetadata("История ставок");

export default async function BetHistoryPage() {
  const { data: bets } = await api.GET("/api/bet", {
    headers: {
      Authorization: `Bearer ${await getSession()}`,
    },
  });
  return <BetsHistory bets={bets} />;
}
