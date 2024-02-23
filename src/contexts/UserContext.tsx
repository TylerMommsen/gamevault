"use client";

import { createContext, useContext, useEffect, useState } from "react";

type UserContextProvider = {
  children: React.ReactNode;
};

const UserContext = createContext<any>(null);

export function UserProvider({ children }: UserContextProvider) {
  const [gameCollection, setGameCollection] = useState<GameResultsData[]>([]);
  const [gameWishlist, setGameWishlist] = useState<GameResultsData[]>([]);

  useEffect(() => {
    const storedCollection = localStorage.getItem("userCollection");
    const storedWishlist = localStorage.getItem("userWishlist");
    if (storedCollection) {
      setGameCollection(JSON.parse(storedCollection));
    }
    if (storedWishlist) {
      setGameWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  const addToCollection = (game: GameResultsData) => {
    if (!gameCollection.some((g) => g.id === game.id)) {
      const updatedCollection = [...gameCollection, game];
      setGameCollection(updatedCollection);
      localStorage.setItem("userCollection", JSON.stringify(updatedCollection));
    }
  };

  const addToWishlist = (game: GameResultsData) => {
    if (!gameWishlist.some((g) => g.id === game.id)) {
      const updatedWishlist = [...gameWishlist, game];
      setGameWishlist(updatedWishlist);
      localStorage.setItem("userWishlist", JSON.stringify(updatedWishlist));
    }
  };

  const removeFromCollection = (gameId: number) => {
    const updatedCollection = gameCollection.filter(
      (game) => game.id !== gameId,
    );
    setGameCollection(updatedCollection);
    localStorage.setItem("userCollection", JSON.stringify(updatedCollection));
  };

  const removeFromWishlist = (gameId: number) => {
    const updatedWishlist = gameWishlist.filter((game) => game.id !== gameId);
    setGameWishlist(updatedWishlist);
    localStorage.setItem("userWishlist", JSON.stringify(updatedWishlist));
  };

  const getCollection = () => {
    return localStorage.getItem("userCollection");
  };

  const getWishlist = () => {
    return localStorage.getItem("userWishlist");
  };

  return (
    <UserContext.Provider
      value={{
        gameCollection,
        addToCollection,
        gameWishlist,
        addToWishlist,
        removeFromCollection,
        removeFromWishlist,
        getCollection,
        getWishlist,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
