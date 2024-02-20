"use client";

import ResourceLoader from "@/lib/ResourceLoader";
import { useContext, useEffect, useState } from "react";
import GameCard from "@/components/common/GameCard";
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import getFetchUrl from "@/lib/getFetchUrl";
import NavSelections from "@/components/common/NavSelections";

import { GameDataContext } from "../contexts/GameDataProvider";

export default function Home() {
  const [gameList, setGameList] = useState<GameList>(); // object parent of gameResults
  const [gameResults, setGameResults] = useState<GameResultsData[]>([]); // contains array of game results
  const [sortOption, setSortOption] = useState<string>(""); // current general sort option
  const [platform, setPlatform] = useState<string>(""); // current platform sort

  const { gameData } = useContext(GameDataContext); // whenever a search is made

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ResourceLoader(getFetchUrl(""));

        setGameList(data);
        setGameResults(data.results);
      } catch (error) {
        console.error("Failed to fetch market data", error);
      }
    };

    fetchData();
  }, []);

  const updateGames = (
    sort: string,
    plat: string,
    gameSearchData: GameSearch,
  ) => {
    let updatedGames = gameList?.results || [];

    if (gameSearchData?.results) {
      updatedGames = gameSearchData.results;
    }

    console.log(updatedGames);

    if (plat || platform) {
      updatedGames = updatedGames.filter((game) =>
        game.parent_platforms.some((p) => p.platform.name === plat),
      );
    }

    if (sort === "release date") {
      updatedGames.sort((a, b) => {
        const dataA = new Date(a.released).getTime();
        const dateB = new Date(b.released).getTime();
        return dateB - dataA;
      });
    } else if (sort === "name") {
      updatedGames.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "popularity") {
      updatedGames.sort((a, b) => b.added - a.added);
    } else if (sort === "average rating") {
      updatedGames.sort((a, b) => b.rating - a.rating);
    }

    setGameResults(updatedGames);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    updateGames(value, platform, gameData);
  };

  const handlePlatformChange = (value: string) => {
    setPlatform(value);
    updateGames(sortOption, value, gameData);
  };

  useEffect(() => {
    updateGames(sortOption, platform, gameData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData]);

  const pageContent = (
    <>
      {gameResults?.map((game: GameResultsData, index) => {
        const gameSlug = encodeURIComponent(game.slug ?? "");

        const backgroundImage = game.background_image ?? "/";
        const name = game.name ?? "Unknown Game";
        const parentPlatforms = game.parent_platforms ?? [];

        return (
          <Link href={`/games/${gameSlug}`} key={game.id} passHref>
            <GameCard
              key={game.id}
              id={game.id}
              image={backgroundImage}
              name={name}
              parentPlatforms={parentPlatforms}
            />
          </Link>
        );
      })}
    </>
  );

  return (
    <main className="min-h-screen bg-background pt-16 text-textNormal">
      <div className="mx-auto block max-w-[1920px] p-4 lg:flex lg:gap-8">
        <div className="hidden h-full min-w-fit lg:block">
          <NavSelections />
        </div>
        <div className="mx-auto flex max-w-[1920px] flex-col gap-4 p-4">
          <div className="mb-4 flex flex-col items-center justify-center lg:items-start lg:gap-4">
            <h1 className="text-4xl font-bold lg:text-6xl">Top Picks</h1>
            <p className="text-textSecondary">Based on your ratings</p>
          </div>

          <div className="grid w-full grid-cols-2 gap-2 lg:max-w-[360px]">
            <Select onValueChange={handleSortChange}>
              <SelectTrigger className="border-none bg-secondary">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="border-none bg-secondary text-textNormal">
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="release date">Release Date</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="average rating">Average Rating</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={handlePlatformChange}>
              <SelectTrigger className="border-none bg-secondary">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent className="border-none bg-secondary text-textNormal">
                <SelectItem value="PC">PC</SelectItem>
                <SelectItem value="PlayStation">Playstation</SelectItem>
                <SelectItem value="Xbox">Xbox</SelectItem>
                <SelectItem value="iOS">iOS</SelectItem>
                <SelectItem value="Android">Android</SelectItem>
                <SelectItem value="Apple Macintosh">Apple Macintosh</SelectItem>
                <SelectItem value="Linux">Linux</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid place-items-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {pageContent}
          </div>
        </div>
      </div>
    </main>
  );
}
