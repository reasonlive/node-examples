"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";

import { getBets } from "~/entities/bet/api";
import { CouponIcon } from "~/shared/assets";
import { Button } from "~/shared/ui";

import { Rates } from "../../types";
import { Coupon } from "./Coupon";
import styles from "./CouponWrapper.module.css";

type CouponWrapper = {
  className?: string;
};

export const CouponWrapper: React.FC<CouponWrapper> = ({ className }) => {
  const [isOpen, setIsOpen] = useState<boolean>();
  const [width, setWidth] = useState<number>(global.innerWidth);
  const rates = useReadLocalStorage<Rates>("rates", {
    initializeWithValue: false,
  });

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(global.innerWidth));

    if (isOpen && width <= 1080) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setIsOpen(false);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("resize", () => setWidth(global.innerWidth));
    };
  }, [isOpen, width]);

  const { data } = useQuery({
    queryFn: () => getBets("PENDING"),
    queryKey: ["bets", "pending"],
  });
  const counter = (data?.ordinar?.length ?? 0) + (data?.express?.length ?? 0);

  const triggerOnClickHandler = () => setIsOpen((prev) => !prev);

  return (
    <>
      <div
        className={`${styles.CouponWrapper} ${isOpen && styles.CouponWrapper_open} ${className}`}
      >
        <Coupon className={styles.coupon} setIsOpen={setIsOpen} />
      </div>
      <Button className={styles.trigger} onClick={triggerOnClickHandler}>
        {rates && rates.length > 0 && (
          <span className={styles.triggerNumber}>{rates.length}</span>
        )}
        <CouponIcon className={styles.icon} />
        {counter > 0 && <div className={styles.counter}>{counter}</div>}
      </Button>
    </>
  );
};
