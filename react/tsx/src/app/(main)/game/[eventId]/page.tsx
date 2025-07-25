import { Metadata } from "next";

import { Match } from "~/entities/game/ui/Match";
import { api } from "~/shared/api";
import { makeMetadata } from "~/shared/lib";
type paramsProps = {
  params: { eventId: string };
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = makeMetadata("Игра");

export default async function MatchPage({ params: { eventId } }: paramsProps) {
  const { data } = await api.GET("/api/game/{eventId}", {
    cache: "no-cache",
    params: { path: { eventId } },
  });
  return <Match matchData={data} />;
}
