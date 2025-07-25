import { MarketDto } from "~/entities/game/types/types";

const basisNames = {
  CORRECT_SCORE: "Точный счёт",
  HANDICAP: "Фора",
  TOTALS: "Тотал",
  WIN: "Победа",
  WIN_HALF_MATCH: "Победа в тайме",
};

const periodNames = {
  HALF: "тайм",
  SET: "сет",
};

const playerNames = {
  "1X": `П1 или ничья`,
  "2X": `П2 или ничья`,
  NO: "никто",
  P1: "П1",
  P2: "П2",
  PX: "Ничья",
  X2: `П2 или ничья`,
};

const timeNames = {
  OT: "(включая ОТ)",
  RT: "(без ОТ)",
};

const destinationName = {
  EVEN: "четный",
  EXACT: "точный",
  ODD: "нечетный",
  OVER: "больше",
  UNDER: "меньше",
};

export const createTitleForBet = (
  betInfo: Omit<MarketDto, "cf" | "isOpen" | "market" | "title">,
): string => {
  if (!betInfo) return "";

  // @ts-ignore
  let name = basisNames[betInfo.basis] ?? "Неизвестный тип";
  // @ts-ignore
  const period = betInfo.period_name && (periodNames[betInfo.period_name] ?? "неизвестный период");
  const periodNum = betInfo.period_no && parseInt(betInfo.period_no);

  // @ts-ignore
  let player = playerNames[betInfo.plr];
  if (betInfo.basis === "WIN" && betInfo.plr === "PX") {
    name = player;
    player = undefined;
  }

  // @ts-ignore
  const time = timeNames[betInfo.ot_rt];
  const pivot = betInfo.pivot;

  // @ts-ignore
  const dst = destinationName[betInfo.dst];

  return [betInfo._3w, name, time, periodNum, period, player, dst, pivot]
    .filter(Boolean)
    .join(" ");
};
