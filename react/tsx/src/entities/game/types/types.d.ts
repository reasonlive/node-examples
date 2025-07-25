import type { components } from "~/shared/api";
type GameDto = components["schemas"]["GameDtoWithGroupedMarkets"];
type MarketDto = components["schemas"]["MarketDto"];

export type ApiGamesWithSport = {
  [key: string]: GameDto[] | null;
};

export type League = {
  games: GameDto[];
  leagueName: string;
};

export type GamesWithLeague = {
  [key: string]: League[];
};

export type Games = GameDto[];

export type MessageRaw = {
  eventId: string;
  type: "removeMarkets" | "updateMarkets" | "updateParsedScore";
};
export type MessageUpdateScore = {
  payload: components["schemas"]["GameDtoWithGroupedMarkets"]["parsedScore"];
  type: "updateParsedScore";
} & MessageRaw;
export type MessageUpdateMarkets = {
  payload: components["schemas"]["GameDtoWithGroupedMarkets"]["groupedMarkets"];
  type: "updateMarkets";
} & MessageRaw;
export type MessageRemoveMarkets = {
  payload: string[];
  type: "removeMarkets";
} & MessageRaw;
export type Message =
  | MessageRemoveMarkets
  | MessageUpdateMarkets
  | MessageUpdateScore;
