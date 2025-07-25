import { Metadata } from "next";

import { FinanceHistory } from "~/entities/finance";
import { getSession } from "~/entities/user/lib";
import { api } from "~/shared/api";
import { makeMetadata } from "~/shared/lib";

export const metadata: Metadata = makeMetadata("Операции");

export default async function FinanceHistoryPage() {
  const { data: operations } = await api.GET("/api/finance/operation", {
    headers: {
      Authorization: `Bearer ${await getSession()}`,
    },
  });
  return <FinanceHistory operations={operations} />;
}
