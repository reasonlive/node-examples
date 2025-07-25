"use client";

import { api } from "~/shared/api";

import { Games as TGames } from "../../types";
import { GamesPrematch } from "./GamesPrematch";

export const GamesBySportPrematch = ({
  className,
  initialData,
  sport,
}: {
  className?: string;
  initialData: TGames;

  sport: string;
}) => {
  return (
    <GamesPrematch
      className={className}
      queryOptions={{
        initialData,
        queryFn: async ({ pageParam }) => {
          const { data, error } = await await api.GET(
            "/api/games/prematch/{sport}",
            {
              params: {
                path: { sport: sport },
                query: pageParam,
              },
            },
          );
          if (error) throw new Error("No data");
          return data;
        },
        queryKey: ["gamesPrematch", sport],
      }}
    />
  );
};

export const AllGamesPrematch = ({
  className,
  initialData,
}: {
  className?: string;
  initialData: TGames;
}) => {
  return (
    <GamesPrematch
      className={className}
      queryOptions={{
        initialData,
        queryFn: async ({ pageParam }) => {
          const { data, error } = await await api.GET("/api/games/prematch", {
            params: {
              query: pageParam,
            },
          });
          if (error) throw new Error("No data");
          return data;
        },
        queryKey: ["gamesPrematch"],
      }}
    />
  );
};
