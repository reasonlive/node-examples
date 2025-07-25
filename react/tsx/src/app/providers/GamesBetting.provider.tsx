"use client";

import { ReactNode, createContext, useContext } from "react";
import { WebSocketProvider} from "~/entities/game/lib/WebSocketContext";

type GamesBettingContextType = {
  isAuth: boolean;
};

const GamesBettingContext = createContext<GamesBettingContextType | undefined>(
  undefined,
);

export const GamesBettingProvider = ({
  children,
  isAuth,
}: {
  children: ReactNode;
  isAuth: boolean;
}) => {
  return (
    <WebSocketProvider>
    <GamesBettingContext.Provider
      value={{
        isAuth,
      }}
    >
      {children}
    </GamesBettingContext.Provider>
    </WebSocketProvider>
  );
};

export const useGamesBettingContext = () => {
  const gamesBettingContext = useContext(GamesBettingContext);
  if (!gamesBettingContext) {
    throw new Error(
      "No GamesBettingContext.Provider found when calling useGamesBettingContext",
    );
  }
  return gamesBettingContext;
};
