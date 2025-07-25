import { getSession } from "~/entities/user/lib";
import { api } from "~/shared/api";

export const getBets = async (status: null | string = null) => {
  const accessToken = await getSession();

  const { data, error } = await api.GET("/api/bet", {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: {
      query: {
        status,
      },
    },
  });
  if (error) throw error;
  return data;
};
