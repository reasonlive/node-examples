"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";

import { operations } from "~/shared/api";
import { cn } from "~/shared/lib";
import { LoadingSpinner } from "~/shared/ui";

import { transformApiGames } from "../../lib/transformApiGames";
import { Games as GamesType } from "../../types";
import { Search } from "../Search";
import { TournamentTable } from "../TournamentTable";
import styles from "./GamesPrematch.module.css";
import { Menu } from "./Menu";

type GamesPrematchProps = {
  className?: string;
  queryOptions: {
    initialData: GamesType;
    queryFn: (options: {
      pageParam: operations["GameController_getGames"]["parameters"]["query"];
    }) => Promise<GamesType>;
    queryKey: string[];
  };
};

export const GamesPrematch = ({
  className,
  queryOptions: { initialData, queryFn, queryKey },
}: GamesPrematchProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (lastPage.length === 0) return;
        return {
          ...lastPageParam,
          offset: lastPageParam.offset + 10,
        };
      },
      initialData: {
        pageParams: [
          {
            lastCreatedAt: initialData?.[0]?.createdAt,
            limit: 10,
            offset: 0,
          },
        ],
        pages: [initialData],
      },
      initialPageParam: { limit: 10, offset: 0 },
      queryFn,
      queryKey,
      staleTime: 60 * 1000,
    });

  const games = transformApiGames(data.pages.flat().filter(Boolean));

  return (
    <div className={cn(styles.GamesPrematch, className)}>
      <Menu />
      <Search />
      <InfiniteScroll
        className={styles.GamesPrematch}
        hasMore={hasNextPage}
        loadMore={fetchNextPage}
        loader={<LoadingSpinner className={styles.loading} />}
        pageStart={0}
      >
        {Object.keys(games).length === 0 && (
          <p className="bg-white/5 p-4 text-center">Игры не найдены</p>
        )}
        {/* {Object.keys(games).map((sportName) => {
          const sport = games[sportName];
          return sport.map((league, index) => (
            <TournamentTable
              games={league.games}
              isLive={false}
              key={league.leagueName + index}
              league={league.leagueName}
              sport={sportName}
            />
          ));
        })} */}
        {games.map((league, index) => (
          <TournamentTable
            games={league.games}
            isLive={false}
            key={league.leagueName + index}
            league={league.leagueName}
            sport={league.games[0].sport}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};
