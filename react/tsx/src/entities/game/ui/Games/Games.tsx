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
import styles from "./Games.module.css";
import { Menu } from "./Menu";
import { useState, useRef, useEffect } from "react";

export const Games = ({
                          className,
                          queryOptions: { initialData, queryFn, queryKey },
                      }: GamesProps) => {

    const [allGames, setAllGames] = useState<GamesType[]>([]);

    const uniqueEventIds = useRef<Set<string>>(new Set());

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

    useEffect(() => {
        const newGames = data.pages.flat().filter(Boolean);

        const filteredNewGames = newGames.filter((game) => {
            if (uniqueEventIds.current.has(game.eventId)) {
                return false;
            }
            uniqueEventIds.current.add(game.eventId);
            return true;
        });

        setAllGames((prev) => [...prev, ...filteredNewGames]);
    }, [data.pages]);

    const games = transformApiGames(allGames);

    return (
        <div className={cn(styles.Games, className)}>
            <Menu />
            <Search />
            <InfiniteScroll
                className={styles.Games}
                hasMore={hasNextPage}
                loadMore={fetchNextPage}
                loader={<LoadingSpinner key="loading-spinner" className={styles.loading} />}
                pageStart={0}
            >
                {games.length === 0 && (
                    <p className="bg-white/5 p-4 text-center">Игры не найдены</p>
                )}
                {games.map((league, index) => (
                    <TournamentTable
                        games={league.games}
                        isLive={true}
                        key={league.leagueName + index}
                        league={league.leagueName}
                        sport={league.games[0].sport}
                    />
                ))}
            </InfiniteScroll>
        </div>
    );
};