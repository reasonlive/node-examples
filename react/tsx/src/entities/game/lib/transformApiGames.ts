import { Games, League } from "../types";

export const transformApiGames = (games: Games) => {
  if (!games.length) {
    return [];
  }

  const leaguesMap: { [key: string]: League } = {};

  games.forEach((game) => {
    if (!leaguesMap[game.leagueName]) {
      leaguesMap[game.leagueName] = {
        games: [],
        leagueName: game.leagueName,
      };
    }
    leaguesMap[game.leagueName].games.push(game);
    leaguesMap[game.leagueName].games.sort((a, b) => b.priority - a.priority);
  });

  return Object.values(leaguesMap);
};
