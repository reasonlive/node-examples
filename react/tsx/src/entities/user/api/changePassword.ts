import { api, components } from "~/shared/api";

import { getSession } from "../lib";

export const changePassword = async (
  body: components["schemas"]["UpdatePasswordDto"],
) => {
  const token = await getSession();
  if (!token) return;

  const { data, error } = await api.PATCH("/api/user/update-password", {
    body,
    headers: { Authorization: `Bearer ${token}` },
  });

  if (data) {
    return data;
  }
  throw error;
};
