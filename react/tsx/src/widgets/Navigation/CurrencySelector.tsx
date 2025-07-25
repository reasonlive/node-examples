"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";

import { api } from "~/shared/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/shared/ui/Select";
import { Skeleton } from "~/shared/ui/Skeleton";

import style from "./CurrencySelector.module.css";

export const CurrencySelector = () => {
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const { data, error } = await api.GET("/api/currencies");
      if (error) throw error;
      return data;
    },
    queryKey: ["currencies"],
    staleTime: Infinity,
  });

  const [currency, setCurrency] = useLocalStorage("currency", "USD", {
    initializeWithValue: false,
  });

  if (isLoading) {
    return <Skeleton className="h-f w-10" />;
  }
  const currencies =
    data?.map(({ isoCode }) => ({
      label: isoCode,
      value: isoCode,
    })) ?? [];

  return (
    <Select onValueChange={(e) => setCurrency(e)} value={currency}>
      <SelectTrigger className={`${style.select} dark:bg-transparent`}>
        <SelectValue>{currency}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {currencies.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
