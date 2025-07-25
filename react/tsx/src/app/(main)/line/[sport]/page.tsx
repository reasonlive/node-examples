import { GamesBySportPrematch } from "~/entities/game/ui/GamesPrematch";
import { api } from "~/shared/api";
import { makeMetadata } from "~/shared/lib";

export const dynamic = "force-dynamic";

export const metadata = makeMetadata("Линия");

export default async function Sport({ params }: { params: { sport: string } }) {
  const { data, error } = await api.GET("/api/games/prematch/{sport}", {
    cache: "no-cache",
    params: {
      path: { sport: params.sport },
      query: { limit: 10, offset: 0 },
    },
  });

  if (error) {
    return (
      <h2 className="mt-5 w-full rounded-md bg-white/5 p-8 text-center">
        Не удалось загрузить данные
      </h2>
    );
  }

  return (
    <GamesBySportPrematch
      className="[grid-area:table]"
      initialData={data}
      sport={params.sport}
    />
  );
}
