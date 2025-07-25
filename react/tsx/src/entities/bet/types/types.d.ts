import { components } from "~/shared/api";

export type Rate = {
  coef: string;
  eventId: string;
  eventName: string;
  groupedMarket: components["schemas"]["MarketDto"];
  isOpen: boolean;
  market: string;
  sum?: string;
};

export type Rates = Rate[];
