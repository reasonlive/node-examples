import { api } from "~/shared/api";

import { getSession } from "../lib";

export const getUser = async () => {
  const token = await getSession();
  if (!token) return;

  const { data: user } = await api.GET("/api/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return user;
};
