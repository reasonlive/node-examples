import { api, components } from "~/shared/api";

import { createSession } from "../lib";
import { promoApply } from "./promoApply";

export const signUp = async (
  body: components["schemas"]["RegistrationDto"],
  promo?: string,
) => {
  //@ts-expect-error кривая либа
  const { data, error } = await api.POST("/api/sign-up", { body });
  if (data) {
    //@ts-expect-error кривая либа
    await createSession(data.accessToken).then(async () => {
      if (promo && promo.length > 0) {
        console.log(1);
        await promoApply({ code: promo });
      }
    });

    return;
  }
  throw error;
};
