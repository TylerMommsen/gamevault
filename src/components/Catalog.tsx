import React from "react";
import Link from "next/link";
import GameCard from "./common/GameCard";
import ResourceLoader from "@/lib/ResourceLoader";
import getFetchUrl from "@/lib/getFetchUrl";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCatalog } from "../contexts/CatalogContext";
import Loading from "@/app/loadingCatalog";
import { useUser } from "@/contexts/UserContext";

export default function Catalog({ urlSlug = "" }) {
  const [gameList, setGameList] = useState<GameList>(); // object parent of gameResults
  const [gameResults, setGameResults] = useState<GameResultsData[]>([]); // contains array of game results
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { filters, setFilters } = useCatalog();

  const { getCollection, getWishlist } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await ResourceLoader(getFetchUrl(urlSlug));

        setGameList(data);
        setGameResults(data.results);
      } catch (error) {
        console.error("Failed to fetch game data", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (urlSlug === "collection") {
      setGameResults(JSON.parse(getCollection()));
      setIsLoading(false);
    } else if (urlSlug === "wishlist") {
      setGameResults(JSON.parse(getWishlist()));
      setIsLoading(false);
    } else {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlSlug]);

  const updateGames = (sort: string, plat: string) => {
    let updatedGames;
    if (urlSlug === "collection") {
      updatedGames = JSON.parse(getCollection());
    } else if (urlSlug === "wishlist") {
      updatedGames = JSON.parse(getWishlist());
    } else {
      updatedGames = gameList?.results || [];
    }

    if (filters.searchQuery !== "") {
      updatedGames = filters.searchQuery.results;
    }

    if (plat) {
      updatedGames = updatedGames.filter((game: GameResultsData) =>
        game.parent_platforms.some((p) => p.platform.name === plat),
      );
    }

    if (sort === "release date") {
      updatedGames.sort((a: GameResultsData, b: GameResultsData) => {
        const dataA = new Date(a.released).getTime();
        const dateB = new Date(b.released).getTime();
        return dateB - dataA;
      });
    } else if (sort === "name") {
      updatedGames.sort((a: GameResultsData, b: GameResultsData) =>
        a.name.localeCompare(b.name),
      );
    } else if (sort === "popularity") {
      updatedGames.sort(
        (a: GameResultsData, b: GameResultsData) => b.added - a.added,
      );
    } else if (sort === "average rating") {
      updatedGames.sort(
        (a: GameResultsData, b: GameResultsData) => b.rating - a.rating,
      );
    }

    setGameResults(updatedGames);
  };

  const handleSortChange = (value: string) => {
    setFilters({ ...filters, general: value });
    updateGames(value, filters.platform);
  };

  const handlePlatformChange = (value: string) => {
    setFilters({ ...filters, platform: value });
    updateGames(filters.general, value);
  };

  const formatUrlSlug = () => {
    let slug = urlSlug;

    slug = decodeURIComponent(slug);

    if (slug === "role-playing-games-rpg") return "RPG";

    const hyphenated = slug.replace(/\s+/g, "-");

    const withSpaces = hyphenated.replace(/-/g, " ");
    const capitalized = withSpaces
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return capitalized;
  };

  return (
    <>
      <div className="flex max-w-[1920px] flex-col gap-4">
        <div className="mb-4 flex w-full flex-col items-center justify-center lg:items-start lg:gap-4">
          <h1 className="text-4xl font-bold lg:text-6xl">
            {urlSlug === "" ? "Top Picks" : formatUrlSlug()}
          </h1>
        </div>

        <div className="grid w-full max-w-[440px] grid-cols-2 gap-2 self-center md:self-start">
          <Select onValueChange={handleSortChange}>
            <SelectTrigger className="border-none bg-secondary">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="border-none bg-secondary text-textNormal">
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

        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="grid place-items-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {gameResults?.map((game) => {
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
                      game={game}
                    />
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
