"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getBets } from "~/entities/bet/api";
import { OpenTab } from "~/entities/bet/ui/Coupon/OpenTab";
import { Button } from "~/shared/ui";

import { BetTab } from "./BetTab";
import styles from "./Coupon.module.css";

type CouponProps = {
  className?: string;
  classNameContainer?: string;
  setIsOpen: (value: React.SetStateAction<boolean | undefined>) => void;
};

type Tab = "coupon" | "open";

export const Coupon: React.FC<CouponProps> = ({ className, setIsOpen }) => {
  const [tab, setTab] = useState<Tab>("coupon");

  const tabOnClickHandler = (tab: Tab) => () => {
    setTab(tab);
  };

  const { data } = useQuery({
    queryFn: () => getBets("PENDING"),
    queryKey: ["bets", "pending"],
  });
  const counter = (data?.ordinar?.length ?? 0) + (data?.express?.length ?? 0);

  return (
    <>
      <div className={`${styles.Coupon} ${className}`}>
        <div className={styles.tabbar}>
          <Button
            className={`${styles.tab} ${tab === "coupon" && styles.active}`}
            onClick={tabOnClickHandler("coupon")}
          >
            Купон
          </Button>
          <Button
            className={`${styles.tab} ${tab === "open" && styles.active}`}
            onClick={tabOnClickHandler("open")}
          >
            Открытые ставки
            {counter > 0 && <div className={styles.counter}>{counter}</div>}
          </Button>
        </div>
        {tab === "open" ? <OpenTab /> : <BetTab setIsOpen={setIsOpen} />}
      </div>
    </>
  );
};

export default Coupon;
