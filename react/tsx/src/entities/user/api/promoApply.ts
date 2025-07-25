import { api, components } from "~/shared/api";

import { getSession } from "../lib";

export const promoApply = async (
  body: components["schemas"]["ApplyPromoDto"],
) => {
  const token = await getSession();
  if (!token) return;

  const { data: user } = await api.POST("/api/promo/apply", {
    body,
    headers: { Authorization: `Bearer ${token}` },
  });
  return user;
};
