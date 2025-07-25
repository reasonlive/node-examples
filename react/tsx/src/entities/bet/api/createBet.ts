import { getSession } from "~/entities/user/lib";
import { api } from "~/shared/api";

export const createBet = async (
  createBetDto: {
    amount: number;
    currencyCode: string;
    rates: {
      coef: string;
      eventId: string;
      eventName: string;
      market: string;
      sum?: string;
    }[];
    type: string;
  },
) => {
  const accessToken = await getSession();

  if (!accessToken) {
    return false;
  }

  const { data, error } = await api.POST("/api/bet", {
    body: createBetDto,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (error) throw error;

  return data;
};
