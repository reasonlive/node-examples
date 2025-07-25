import { api, components } from "~/shared/api";

import { createSession } from "../lib";

export const login = async (body: components["schemas"]["AuthenticateDto"]) => {
  const { data, error } = await api.POST("/api/sign-in", { body });

  if (data) {
    await createSession(data.accessToken);
    return;
  }
  throw error;
};
