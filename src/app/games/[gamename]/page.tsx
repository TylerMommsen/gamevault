"use client";

import React, { useEffect, useState } from "react";
import ResourceLoader from "@/lib/ResourceLoader";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import GamePlatforms from "@/components/common/GamePlatforms";
import NavSelections from "@/components/NavSelections";

export default function GamePage({ params }: { params: { gamename: string } }) {
  const [gameData, setGameData] = useState<GameDetailedData>();
  const [gameScreenshots, setGameScreenshots] = useState<GameScreenshots>();
  const [gameStores, setGameStores] = useState<GameStores>();
  const [gameTrailers, setGameTrailers] = useState<GameTrailers>();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const gameSlug = params.gamename;

  useEffect(() => {
    const fetchData = async () => {
      if (!gameSlug) return;

      try {
        const data = await ResourceLoader(
          `https://api.rawg.io/api/games/${gameSlug}?`,
        );
        const screenshots = await ResourceLoader(
          `https://api.rawg.io/api/games/${gameSlug}/screenshots?`,
        );
        const stores = await ResourceLoader(
          `https://api.rawg.io/api/games/${gameSlug}/stores?`,
        );
        const trailers = await ResourceLoader(
          `https://api.rawg.io/api/games/${gameSlug}/movies?`,
        );

        setGameData(data);
        setGameScreenshots(screenshots);
        setGameStores(stores);
        setGameTrailers(trailers);
      } catch (error) {
        console.error("Failed to fetch game data", error);
      }
    };

    fetchData();
  }, [gameSlug]);

  if (!gameData || !gameScreenshots) {
    return <div className="bg-background">Loading...</div>;
  }

  function removeSpanishText(htmlString: any) {
    const parts = htmlString.split("Español");
    return parts[0]; // Return the English part
  }

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <main
      id="game-detail-page"
      className="relative min-h-screen pt-16 text-textNormal"
    >
      <div className="absolute left-0 top-0 z-[-2] h-full w-full bg-background">
        <div
          style={{
            height: "500px",
            width: "100%",
            background: "no-repeat-top",
            backgroundSize: "cover",
            backgroundColor: "transparent",
            backgroundImage: `linear-gradient(rgba(15, 15, 15, 0), rgb(15, 15, 15)), linear-gradient(rgba(15, 15, 15, 0.8), rgba(15, 15, 15, 0.5)), url(${gameData.background_image})`,
            zIndex: "1",
          }}
        ></div>
      </div>

      <div className="mx-auto block max-w-[1920px] xl:flex xl:gap-8 xl:p-4">
        <div className="hidden h-full min-w-fit xl:block">
          <NavSelections />
        </div>

        <div className="z-[-1] mx-auto max-w-[1200px] lg:grid lg:grid-cols-2">
          <div className="z-[100] mx-auto flex max-w-[500px] flex-col items-center gap-4 p-4 text-center lg:w-auto lg:flex-auto lg:items-start lg:text-start">
            <p className="text-textSecondary">{`HOME / GAMES / ${gameData.name}`}</p>

            <div className="flex w-full flex-col items-center gap-1 lg:items-start lg:text-start">
              <div className="flex gap-4 text-textSecondary">
                <GamePlatforms parentPlatforms={gameData.parent_platforms} />
              </div>

              <p className="text-textSecondary lg:text-start">
                Average Playtime: {gameData.playtime} Hours
              </p>
            </div>

            <h1 className="text-3xl font-bold lg:text-start lg:text-6xl">
              {gameData.name}
            </h1>

            <div className="max-w-screen lg:hidden">
              <Carousel>
                <CarouselContent>
                  {gameScreenshots.results.map((screenshot, index) => {
                    return (
                      <CarouselItem key={screenshot.id} className="basis-3/4">
                        <Image
                          src={screenshot.image}
                          width={640}
                          height={360}
                          style={{
                            objectFit: "cover",
                            aspectRatio: "16/9",
                            width: "100%",
                            height: "auto",
                          }}
                          className="w-full p-1"
                          alt={`${gameData.name} game screenshot`}
                        />
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            <button className="flex w-full items-center justify-between rounded-sm bg-primary px-6 py-2 text-start text-textDark">
              <div className="flex-col">
                <p className="text-sm text-textDark">Add to</p>
                <p className="text-xl font-bold">My Collection</p>
              </div>
              <p className="text-2xl font-bold">+</p>
            </button>

            <div className="mt-4 flex flex-col gap-8">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold">
                  {gameData.rating_top === 5 ? "Exceptional" : null}
                  {gameData.rating_top === 4 ? "Recommended" : null}
                  {gameData.rating_top === 3 ? "Meh" : null}
                  {gameData.rating_top === 1 ? "Skip" : null}
                </h2>
                <p className="text-sm text-textSecondary">
                  {gameData.ratings_count} Ratings
                </p>
              </div>

              <div id="about" className="flex w-full flex-col gap-1 text-start">
                <h2 className="text-2xl font-bold">About</h2>
                <p
                  className={`text-sm tracking-wider ${showFullDescription ? "" : "line-clamp-4"}`}
                  dangerouslySetInnerHTML={{
                    __html: removeSpanishText(gameData.description),
                  }}
                ></p>
                <button
                  className="text-start text-textSecondary underline"
                  onClick={toggleDescription}
                >
                  {showFullDescription ? "Read Less" : "Read More"}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-start">
                <div className="flex flex-col gap-1">
                  <h3 className="text-textSecondary">Platforms</h3>
                  <div className="flex flex-wrap gap-2">
                    {gameData.parent_platforms.map((parentPlatform, index) => {
                      const isLast =
                        index === gameData.parent_platforms.length - 1;
                      return (
                        <p key={parentPlatform.platform.id}>
                          {parentPlatform.platform.name}
                          {!isLast && ","}
                        </p>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-textSecondary">Metascore</h3>
                  <p>{gameData?.metacritic ?? "N/A"}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-textSecondary">Genre</h3>
                  <div className="flex flex-wrap gap-2">
                    {gameData.genres.map((genre, index) => {
                      const isLast = index === gameData.genres.length - 1;
                      return (
                        <p key={genre.id}>
                          {genre.name}
                          {!isLast && ","}
                        </p>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-textSecondary">Release Date</h3>
                  <p>{gameData.released}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-textSecondary">Developers</h3>
                  <div className="flex flex-col">
                    {gameData.developers?.length > 0 ? (
                      gameData.developers.map((developer, index) => {
                        const isLast = index === gameData.developers.length - 1;
                        return (
                          <p key={developer.id}>
                            {developer.name}
                            {!isLast && ","}
                          </p>
                        );
                      })
                    ) : (
                      <p>N/A</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-textSecondary">Publishers</h3>
                  <div className="flex flex-col">
                    {gameData.publishers?.length > 0 ? (
                      gameData.publishers.map((publisher, index) => {
                        const isLast = index === gameData.publishers.length - 1;
                        return (
                          <p key={publisher.id}>
                            {publisher.name}
                            {!isLast && ","}
                          </p>
                        );
                      })
                    ) : (
                      <p>N/A</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1 text-start">
                <h3 className="text-textSecondary">Age Rating</h3>
                <p>{gameData.esrb_rating?.name ?? "N/A"}</p>
              </div>

              <div className="flex flex-col gap-1 text-start">
                <h3 className="text-textSecondary">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {gameData.tags?.length > 0 ? (
                    gameData.tags.map((tag, index) => {
                      const isLast = index === gameData.tags.length - 1;
                      return (
                        <p key={tag.id}>
                          {tag.name}
                          {!isLast && ","}
                        </p>
                      );
                    })
                  ) : (
                    <p>N/A</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1 text-start">
                <h3 className="text-textSecondary">Website</h3>
                {gameData.website === "" ? (
                  <>
                    <p>N/A</p>
                  </>
                ) : (
                  <>
                    <a
                      href={gameData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {gameData.website}
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {gameTrailers?.results && gameTrailers.results.length > 0 ? (
              <div className={`relative aspect-video w-full`}>
                <iframe
                  src={gameTrailers?.results[0].data.max}
                  allowFullScreen
                  loading="lazy"
                  title={gameData.name + " trailer"}
                  className="h-full w-full"
                />
              </div>
            ) : null}

            <div className="hidden aspect-video gap-4 lg:grid lg:grid-cols-2">
              {gameScreenshots.results.map((screenshot, index) => {
                return (
                  <Image
                    key={screenshot.id}
                    src={screenshot.image}
                    width={640}
                    height={360}
                    style={{
                      objectFit: "cover",
                      aspectRatio: "16/9",
                      width: "100%",
                      height: "auto",
                    }}
                    alt={`${gameData.name} game screenshot`}
                  />
                );
              })}
            </div>

            <div className="grid w-full grid-cols-2 flex-wrap gap-2">
              {gameStores?.results.map((gameStore, index) => {
                const storeId = gameStore.store_id;
                let storeName = "";
                if (storeId === 3) storeName = "PlayStation Store";
                if (storeId === 11) storeName = "Epic Games";
                if (storeId === 1) storeName = "Steam";
                if (storeId === 7) storeName = "Xbox Store";
                if (storeId === 2) storeName = "Microsoft Store";
                return (
                  <a
                    key={gameStore.id}
                    href={gameStore.url}
                    target="_blank"
                    rel="noreferrer nooponer"
                    className="rounded-sm bg-secondary px-6 py-2 text-center"
                  >
                    {storeName}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
