import { GamesBySport } from "~/entities/game/ui";
import { api } from "~/shared/api";

export const dynamic = "force-dynamic";

export default async function Sport({ params }: { params: { sport: string } }) {
  const { data, error } = await api.GET("/api/games/live/{sport}", {
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
    <GamesBySport
      className="[grid-area:table]"
      initialData={data}
      sport={params.sport}
    />
  );
}
