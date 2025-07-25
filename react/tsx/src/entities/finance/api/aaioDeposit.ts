import { getSession } from "~/entities/user/lib";
import { api, components } from "~/shared/api";

export const aaioDeposit = async (
  body: components["schemas"]["AaioPaymentSystemDepositDto"],
) => {
  const token = await getSession();
  return api.POST("/api/payment-system/aaio/deposit", {
    body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
