import { getSession } from "~/entities/user/lib";
import { api, components } from "~/shared/api";

export const withdraw = async (
  body: components["schemas"]["BovaPaymentSystemWithdrawDto"],
) => {
  const token = await getSession();
  return api.POST("/api/payment-system/bova/withdraw", {
    body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
