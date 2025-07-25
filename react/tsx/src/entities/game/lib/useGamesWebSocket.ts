import { useQuery, useQueryClient } from "@tanstack/react-query";
import {useEffect, useState} from "react";
import { useTimeout } from "usehooks-ts";

import { components } from "~/shared/api";
import { mergeArrays } from "~/shared/lib/mergeArrays";

import { getGame } from "../api";
import { Message } from "../types";
import { MarketDto } from "../types/types";
import { useWebSocketContext } from "./WebSocketContext"; // Импортируем контекст

type GameDto = components["schemas"]["GameDtoWithGroupedMarkets"];

export const useGamesWebSocket = ({
                                    eventId,
                                    initialData,
                                  }: {
  eventId: string;
  initialData?: components["schemas"]["GameDtoWithGroupedMarkets"];
}) => {
  const queryClient = useQueryClient();
  const { sendJsonMessage, addMessageHandler, removeMessageHandler } = useWebSocketContext();

  const queryState = useQuery({
    initialData,
    queryFn: () => getGame(eventId),
    queryKey: ["game", eventId],
    staleTime: 1000,
  });

  // Prevent hydration errors
  const [connectToUpdate, start] = useState(false);
  useTimeout(() => start(true), 100);

  useEffect(() => {
    const handleMessage = (message: Message) => {
      // console.log("Received WebSocket message:", message);

      // Проверяем, что сообщение относится к текущему eventId
      if (message.eventId !== eventId) {
        // console.log(`Ignoring message for eventId: ${message.eventId} | ${eventId}`);
        return;
      }

      // console.log(`Accept message for eventId: ${message.eventId} | ${message.type}  ${eventId}`);

      if (message.type === "updateParsedScore") {
        queryClient.setQueryData<GameDto>(["game", eventId], (prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            parsedScore: message.payload,
          };
        });
      }

      if (message.type === "updateMarkets") {
        queryClient.setQueryData<GameDto>(["game", eventId], (prev) => {
          if (!prev) return prev;

          const game = prev;
          // return { ...game, gnewMarketsroupedMarkets: message.payload };
          if (game.groupedMarkets == null) {
            return { ...game, groupedMarkets: message.payload };
          }

          if ( process.env.NEXT_PUBLIC_WS_URL_BETAPI_ENABLED ) {
            Object.keys(game.groupedMarkets).forEach((marketKey) => {
              if ( message.payload.hasOwnProperty(marketKey) ) {
                game.groupedMarkets[marketKey] = game.groupedMarkets[marketKey].map((_) => {
                  const mp = message.payload[marketKey].filter( (p) => { _.market == p.market });
                  return {  ..._, isOpen: !mp };
                });
                game.groupedMarkets[marketKey].isOpen = false;
                // console.log('Close market: ' + marketKey + ' ' + eventId);
              } else {
                game.groupedMarkets[marketKey] = game.groupedMarkets[marketKey].map((_) => {
                  return {  ..._, isOpen: false };
                });
              }
            });
            // console.log('message.payload: ', message.payload)
            // console.log('game.groupedMarkets: ', game.groupedMarkets);
          }

          const newMarkets = {} as Record<string, MarketDto[]>;
          Object.keys(game.groupedMarkets).forEach((marketKey) => {
            const groupedMarket = game.groupedMarkets?.[marketKey] ?? [];
            const newGroupedMarket = message.payload?.[marketKey] ?? [];

            const updatedGroupedMarket = mergeArrays(
                groupedMarket,
                newGroupedMarket,
                "market",
            );
            // console.log("updatedGroupedMarket", updatedGroupedMarket);
            newMarkets[marketKey] = updatedGroupedMarket;
          });

          return {
            ...game,
            groupedMarkets: newMarkets,
          };
        });
      }

      if (message.type === "removeMarkets") {
        queryClient.setQueryData<GameDto>(["game", eventId], (prev) => {
          if (!prev) return prev;

          const game = prev;
          if (game.groupedMarkets == null) {
            return game;
          }

          const newMarkets = {} as Record<string, MarketDto[]>;
          Object.keys(game.groupedMarkets).forEach((marketKey) => {
            const groupedMarket = game.groupedMarkets?.[marketKey] ?? [];
            const newGroupedMarket = groupedMarket.map((market) => {
              if (!message.payload.includes(market.market)) {
                return market;
              }
              return { ...market, isOpen: false };
            });
            newMarkets[marketKey] = newGroupedMarket;
          });

          return {
            ...game,
            groupedMarkets: newMarkets,
          };
        });
      }
    };

    addMessageHandler(handleMessage);

    return () => {
      removeMessageHandler(handleMessage);
    };
  }, [eventId, queryClient, addMessageHandler, removeMessageHandler]);

  useEffect(() => {
    if (connectToUpdate) {
      // console.log("Subscribing to eventId:", eventId);
      sendJsonMessage({
        filter: { eventIds: [eventId] },
        type: "subscribe",
      });
    }
  }, [connectToUpdate, eventId, sendJsonMessage]);

  return queryState;
};