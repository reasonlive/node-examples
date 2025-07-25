"use client";

import { api } from "~/shared/api";

import { Games as TGames } from "../../types";
import { Games } from "./Games";

export const GamesBySport = ({
  className,
  initialData,
  sport,
}: {
  className?: string;
  initialData: TGames;

  sport: string;
}) => {
  return (
    <Games
      className={className}
      queryOptions={{
        initialData,
        queryFn: async ({ pageParam }) => {
          const { data, error } = await await api.GET(
            "/api/games/live/{sport}",
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
        queryKey: ["games", sport],
      }}
    />
  );
};

export const AllGames = ({
  className,
  initialData,
}: {
  className?: string;
  initialData: TGames;
}) => {
  return (
    <Games
      className={className}
      queryOptions={{
        initialData,
        queryFn: async ({ pageParam }) => {
          const { data, error } = await await api.GET("/api/games/live", {
            params: {
              query: pageParam,
            },
          });
          if (error) throw new Error("No data");
          return data;
        },
        queryKey: ["games"],
      }}
    />
  );
};
