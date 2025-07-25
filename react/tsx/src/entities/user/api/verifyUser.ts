import { api } from "~/shared/api";

import { getSession } from "../lib";

export const verifyUser = async () => {
  const token = await getSession();
  if (!token) return false;

  const { response } = await api.GET("/api/verify", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.ok;
};
