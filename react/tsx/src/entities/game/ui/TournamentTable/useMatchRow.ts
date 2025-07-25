import { useState } from "react";

import { components } from "~/shared/api";

import { convertToFixed } from "../../lib";
import { useGamesWebSocket } from "../../lib/useGamesWebSocket";

type Info = {
  currentPlayer?: "0" | "1" | "2";
};

type Totals = {
  total: string;
  totalOver: {
    cf: string;
    groupedMarket?: components["schemas"]["MarketDto"];
    isOpen: boolean;
    marketName: string;
  };
  totalUnder: {
    cf: string;
    groupedMarket?: components["schemas"]["MarketDto"];
    isOpen: boolean;
    marketName: string;
  };
};
type LocalMarket = {
  cf: string;
  groupedMarket?: components["schemas"]["MarketDto"];
  isOpen: boolean;
};
type Return = {
  data?: components["schemas"]["GameDtoWithGroupedMarkets"];
  info: Info;
  markets: {
    [key: string]: LocalMarket;
  } | null;
  marketsCount: number;
  score?: components["schemas"]["GameDtoWithGroupedMarkets"]["parsedScore"];
  totals: Totals | null;
};

export const useMatchRow = (
  matchData: components["schemas"]["GameDtoWithGroupedMarkets"],
): Return => {
  const [totalMax, setTotalMax] = useState<string>("--");

  const { data } = useGamesWebSocket({
    eventId: matchData.eventId,
    initialData: matchData,
  });

  const scoreGroups = data?.parsedScore;

  const defaultReturn: Return = {
    data,
    info: { currentPlayer: undefined },
    markets: null,
    marketsCount: 0,
    score: scoreGroups,
    totals: null,
  };
  const groupedMarkets = data?.groupedMarkets;

  if (typeof groupedMarkets === "undefined") {
    return defaultReturn;
  }

  let marketsCount = 0;

  Object.keys(groupedMarkets).map((groupedMarketKey) => {
    const groupedMarket = groupedMarkets[groupedMarketKey];
    marketsCount = marketsCount + groupedMarket.length;
  });

  const findMarket = (base: string, market: string): LocalMarket => {
    if (!groupedMarkets[base]) {
      return { cf: "--", groupedMarket: undefined, isOpen: true };
    }
    const groupedMarket = groupedMarkets[base].find(
      (groupedMarket) => groupedMarket.market === market,
    );
    if (typeof groupedMarket === "undefined") {
      return { cf: "--", groupedMarket: undefined, isOpen: true };
    }
    return {
      cf: convertToFixed(`${groupedMarket.cf}`),
      groupedMarket,
      isOpen: groupedMarket.isOpen,
    };
  };

  const getTotals = (
    ot_rt: string | undefined,
    marketNameOver: string,
    marketNameUnder: string,
  ): Totals => {
    let totals: Totals = {
      total: "--",
      totalOver: {
        cf: `--`,
        groupedMarket: undefined,
        isOpen: true,
        marketName: `${marketNameOver}(${totalMax})`,
      },
      totalUnder: {
        cf: `--`,
        groupedMarket: undefined,
        isOpen: true,
        marketName: `${marketNameUnder}(${totalMax})`,
      },
    };
    const totalsInGroupedMarkets = ot_rt
      ? groupedMarkets[`TOTALS_${ot_rt}`]
      : groupedMarkets["TOTALS"];
    const totalsInMarkets =
      totalsInGroupedMarkets?.filter(
        (market) =>
          (market.dst === "OVER" || market.dst === "UNDER") &&
          !market.plr &&
          !market.period_no &&
          !market.period_name,
      ) || [];
    if (totalMax === "--") {
      if (
        typeof totalsInMarkets !== "undefined" &&
        totalsInMarkets.length > 0
      ) {
        const totalsValues = totalsInMarkets.map(
          (market) => market.pivot as string,
        );

        const maxTotals = totalsValues.reduce((prev, cur) =>
          +prev < +cur ? cur : prev,
        );
        setTotalMax(maxTotals);
      }
    }

    if (!totalsInMarkets) {
      return totals;
    }

    const totalOverRaw = totalsInMarkets.find(
      (totalsMarket) =>
        totalsMarket.market === `${marketNameOver}(${totalMax})`,
    );
    const totalUnderRaw = totalsInMarkets.find(
      (totalsMarket) =>
        totalsMarket.market === `${marketNameUnder}(${totalMax})`,
    );

    const totalOver = totalOverRaw
      ? {
          cf: convertToFixed(`${totalOverRaw.cf}`),
          groupedMarket: totalOverRaw,
          isOpen: totalOverRaw.isOpen,
          marketName: totalOverRaw.market,
        }
      : {
          cf: `--`,
          groupedMarket: undefined,
          isOpen: true,
          marketName: `${marketNameOver}(${totalMax})`,
        };
    const totalUnder = totalUnderRaw
      ? {
          cf: convertToFixed(`${totalUnderRaw.cf}`),
          groupedMarket: totalUnderRaw,
          isOpen: totalUnderRaw.isOpen,
          marketName: totalUnderRaw.market,
        }
      : {
          cf: `--`,
          groupedMarket: undefined,
          isOpen: true,
          marketName: `${marketNameUnder}(${totalMax})`,
        };

    totals = {
      total: totalMax,
      totalOver,
      totalUnder,
    };
    return totals;
  };

  switch (data?.sport) {
    case "tennis": {
      const WIN__P1 = findMarket("WIN", "WIN__P1");
      const WIN__P2 = findMarket("WIN", "WIN__P2");

      const totals: Totals = getTotals(
        undefined,
        `TOTALS__OVER`,
        `TOTALS__UNDER`,
      );

      return {
        data,
        info: defaultReturn.info,
        markets: {
          WIN__P1,
          WIN__P2,
        },
        marketsCount,
        score: scoreGroups,
        totals,
      };
    }

    case "table-tennis": {
      const WIN__P1 = findMarket("WIN", "WIN__P1");
      const WIN__P2 = findMarket("WIN", "WIN__P2");

      const totals: Totals = getTotals(
        undefined,
        `TOTALS__OVER`,
        `TOTALS__UNDER`,
      );

      return {
        data,
        info: defaultReturn.info,
        markets: {
          WIN__P1,
          WIN__P2,
        },
        marketsCount,
        score: scoreGroups,
        totals,
      };
    }

    case "volleyball": {
      const WIN__P1 = findMarket("WIN", "WIN__P1");
      const WIN__P2 = findMarket("WIN", "WIN__P2");

      const totals: Totals = getTotals(
        undefined,
        `TOTALS__OVER`,
        `TOTALS__UNDER`,
      );

      return {
        data,
        info: defaultReturn.info,
        markets: {
          WIN__P1,
          WIN__P2,
        },
        marketsCount,
        score: scoreGroups,
        totals,
      };
    }

    case "basketball": {
      const WIN_OT__P1 = findMarket("WIN_OT", "WIN_OT__P1");
      const WIN_OT__P2 = findMarket("WIN_OT", "WIN_OT__P2");
      const WIN_RT__PX = findMarket("WIN_RT", "WIN_RT__PX");
      const totals: Totals = getTotals(
        `OT`,
        `TOTALS_OT__OVER`,
        `TOTALS_OT__UNDER`,
      );

      return {
        data,
        info: defaultReturn.info,
        markets: {
          WIN_OT__P1,
          WIN_OT__P2,
          WIN_RT__PX,
        },
        marketsCount,
        score: scoreGroups,
        totals: totals,
      };
    }

    case "hockey": {
      const WIN_RT__P1 = findMarket("WIN_RT", "WIN_RT__P1");
      const WIN_RT__P2 = findMarket("WIN_RT", "WIN_RT__P2");
      const WIN_RT__PX = findMarket("WIN_RT", "WIN_RT__PX");

      const totals: Totals = getTotals(
        `RT`,
        `TOTALS_RT__OVER`,
        `TOTALS_RT__UNDER`,
      );

      return {
        data,
        info: defaultReturn.info,
        markets: {
          WIN_RT__P1,
          WIN_RT__P2,
          WIN_RT__PX,
        },
        marketsCount,
        score: scoreGroups,
        totals: totals,
      };
    }

    case "soccer": {
      const WIN__P1 = findMarket("WIN", "WIN__P1");
      const WIN__P2 = findMarket("WIN", "WIN__P2");
      const WIN__PX = findMarket("WIN", "WIN__PX");
      const WIN__1X = findMarket("WIN", "WIN__1X");
      const WIN__12 = findMarket("WIN", "WIN__12");
      const WIN__X2 = findMarket("WIN", "WIN__X2");

      const totals: Totals = getTotals(
        undefined,
        `TOTALS__OVER`,
        `TOTALS__UNDER`,
      );

      return {
        data,
        info: defaultReturn.info,
        markets: {
          WIN__1X,
          WIN__12,
          WIN__P1,
          WIN__P2,
          WIN__PX,
          WIN__X2,
        },
        marketsCount,
        score: scoreGroups,
        totals,
      };
    }

    case "esports.dota2": {
      const WIN__P1 = findMarket("WIN", "WIN__P1");
      const WIN__P2 = findMarket("WIN", "WIN__P2");

      return {
        data,
        info: defaultReturn.info,
        markets: { WIN__P1, WIN__P2 },
        marketsCount,
        score: scoreGroups,
        totals: null,
      };
    }

    case "esports.cs": {
      const WIN__P1 = findMarket("WIN", "WIN__P1");
      const WIN__P2 = findMarket("WIN", "WIN__P2");

      return {
        data,
        info: defaultReturn.info,
        markets: { WIN__P1, WIN__P2 },
        marketsCount,
        score: scoreGroups,
        totals: null,
      };
    }

    default:
      return { ...defaultReturn, marketsCount };
  }
};
