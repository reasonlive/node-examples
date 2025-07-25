import { useQuery } from "@tanstack/react-query";
import getSymbolFromCurrency from "currency-symbol-map";
import { useReadLocalStorage } from "usehooks-ts";

import { DepositForm } from "~/entities/finance";
import { getUser } from "~/entities/user/api";
import { Dialog, DialogContent, DialogTrigger } from "~/shared/ui/Dialog";
import { Skeleton } from "~/shared/ui/Skeleton";

import { CurrencySelector } from "./CurrencySelector";
import styles from "./Deposit.module.css";

export const Deposit = () => {
  const { data, isLoading } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
  });
  const currency = useReadLocalStorage<string>("currency");

  if (isLoading) {
    return <Skeleton className="h-full w-40" />;
  }

  const balance =
    data?.balances?.find(({ currencyCode }) => currencyCode === currency)
      ?.amount ?? "0";
  const formattedBalance = Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
  }).format(Number(balance));

  return (
    <div className={styles.depositWrapper}>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center">
          <CurrencySelector />
          <span suppressHydrationWarning>
            {currency && getSymbolFromCurrency(currency)}
            {formattedBalance}
          </span>
        </div>
      </div>

      <Dialog>
        <DialogTrigger className={styles.Deposit}>{`Пополнить`}</DialogTrigger>
        <DialogContent className={styles.dialog}>
          <DepositForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};
