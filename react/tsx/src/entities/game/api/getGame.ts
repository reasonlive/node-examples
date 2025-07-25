import { api } from "~/shared/api";

export const getGame = async (eventId: string) => {
  const { data: game } = await api.GET(`/api/game/{eventId}`, {
    params: {
      path: {
        eventId,
      },
    },
  });
  return game;
};
