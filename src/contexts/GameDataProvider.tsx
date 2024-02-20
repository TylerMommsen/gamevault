"use client";
import React, { createContext, useState } from "react";
import ResourceLoader from "@/lib/ResourceLoader";

type GameDataContextProviderProps = {
  children: React.ReactNode;
};

export const GameDataContext = createContext<any>(null);

export const GameDataContextProvider = ({
  children,
}: GameDataContextProviderProps) => {
  const [gameData, setGameData] = useState<GameSearch>();

  const fetchGameData = async (searchInput: string) => {
    try {
      const data = await ResourceLoader(
        `https://api.rawg.io/api/games?search=${searchInput}&search_precise=true&`,
      );

      setGameData(data);
    } catch (error) {
      console.error("Failed to fetch market data", error);
    }
  };

  return (
    <GameDataContext.Provider value={{ gameData, fetchGameData }}>
      {children}
    </GameDataContext.Provider>
  );
};
