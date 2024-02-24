"use client";

import React, { useEffect, useState } from "react";
import ResourceLoader from "@/lib/ResourceLoader";
import getFetchUrl from "@/lib/getFetchUrl";

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
import LoadingGamePage from "@/app/loadingGamePage";

import { useUser } from "@/contexts/UserContext";

export default function GamePage({ params }: { params: { gamename: string } }) {
  const [gameData, setGameData] = useState<GameDetailedData>();
  const [gameScreenshots, setGameScreenshots] = useState<GameScreenshots>();
  const [gameStores, setGameStores] = useState<GameStores>();
  const [gameTrailers, setGameTrailers] = useState<GameTrailers>();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const gameSlug = params.gamename;

  const {
    gameCollection,
    gameWishlist,
    addToCollection,
    addToWishlist,
    removeFromCollection,
    removeFromWishlist,
  } = useUser();

  const handleButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    btn: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (btn === "addToCollection") {
      if (isGameInCollection) {
        removeFromCollection(gameData?.id);
      } else {
        addToCollection(gameData);
      }
    } else if (btn === "addToWishlist") {
      if (isGameInWishlist) {
        removeFromWishlist(gameData?.id);
      } else {
        addToWishlist(gameData);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

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
        console.log(stores);
      } catch (error) {
        console.error("Failed to fetch game data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [gameSlug]);

  function removeSpanishText(htmlString: any) {
    if (htmlString) {
      const parts = htmlString.split("Español");
      return parts[0]; // Return the English part
    }
  }

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const isGameInCollection = gameCollection.some(
    (g: GameResultsData) => g.id === gameData?.id,
  );
  const isGameInWishlist = gameWishlist.some(
    (g: GameResultsData) => g.id === gameData?.id,
  );

  return (
    <main
      id="game-detail-page"
      className={`${isLoading ? "bg-background" : null} relative min-h-screen w-screen pt-24 text-textNormal`}
    >
      {isLoading ? null : (
        <div className="absolute left-0 top-0 z-[-2] h-full w-full bg-background">
          <div
            style={{
              height: "500px",
              width: "100%",
              background: "no-repeat-top",
              backgroundColor: "transparent",
              backgroundSize: "cover",
              backgroundPosition: "center top",
              backgroundImage: `linear-gradient(rgba(15, 15, 15, 0), rgb(15, 15, 15)), linear-gradient(rgba(15, 15, 15, 0.8), rgba(15, 15, 15, 0.5)), url(${gameData?.background_image})`,
            }}
          ></div>
        </div>
      )}

      <div className="mx-auto block max-w-[1920px] xl:flex xl:gap-8 xl:p-4">
        <div className="hidden h-full min-w-fit xl:block">
          <NavSelections />
        </div>

        <div className="z-[1] mx-auto max-w-[1200px] gap-4 p-4 lg:grid lg:grid-cols-2">
          {isLoading ? (
            <LoadingGamePage />
          ) : (
            <>
              <div className="z-[100] mx-auto flex max-w-[500px] flex-col items-center gap-4 text-center lg:w-auto lg:flex-auto lg:items-start lg:p-0 lg:text-start">
                <p className="text-textSecondary">{`HOME / GAMES / ${gameData?.name}`}</p>

                <div className="flex w-full items-center justify-center lg:items-start lg:justify-normal lg:text-start">
                  {gameData ? (
                    <div className="flex gap-4 text-textSecondary">
                      <GamePlatforms
                        parentPlatforms={gameData.parent_platforms}
                      />
                    </div>
                  ) : null}
                </div>

                <p className="text-textSecondary lg:text-start">
                  Average Playtime: {gameData?.playtime} Hours
                </p>

                <h1 className="text-3xl font-bold lg:text-start lg:text-6xl">
                  {gameData?.name}
                </h1>

                <div className="w-full lg:hidden">
                  {gameTrailers?.results && gameTrailers.results.length > 0 ? (
                    <div className={`relative aspect-video w-full`}>
                      <iframe
                        src={gameTrailers?.results[0].data.max}
                        allowFullScreen
                        loading="lazy"
                        title={gameData?.name + " trailer"}
                        className="h-full w-full"
                      />
                    </div>
                  ) : null}
                </div>

                <div className="max-w-screen lg:hidden">
                  <Carousel>
                    <CarouselContent>
                      {gameScreenshots?.results.map((screenshot, index) => {
                        return (
                          <CarouselItem
                            key={screenshot.id}
                            className="basis-3/4"
                          >
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
                              alt={`${gameData?.name} game screenshot`}
                            />
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>

                <div className="flex w-full flex-col gap-2 lg:flex-row">
                  <button
                    className={`${isGameInCollection ? "bg-green-500 text-primary" : "bg-primary text-textDark"} flex w-full items-center justify-between rounded-sm px-6 py-2 text-start transition-all duration-300 hover:opacity-90`}
                    onClick={(e) => handleButtonClick(e, "addToCollection")}
                  >
                    <div className="flex-col">
                      <p className="text-sm">
                        {isGameInCollection ? "Remove from" : "Add to"}
                      </p>
                      <p className="text-xl font-bold">My Collection</p>
                    </div>
                    <p className="text-2xl font-bold">
                      {isGameInCollection ? <>&#10003;</> : "+"}
                    </p>
                  </button>

                  <button
                    className={`${isGameInWishlist ? "border-green-500 hover:border-green-600" : "border-primary hover:border-textSecondary"} flex w-full items-center justify-between rounded-sm border-2 bg-transparent px-6 py-2 text-start text-primary transition-all duration-300 `}
                    onClick={(e) => handleButtonClick(e, "addToWishlist")}
                  >
                    <div className="flex-col">
                      <p className="text-sm">
                        {isGameInWishlist ? "Remove from" : "Add to"}
                      </p>
                      <p className="text-xl font-bold">Wishlist</p>
                    </div>
                    <p className="text-2xl font-bold">
                      {isGameInWishlist ? <>&#10003;</> : "+"}
                    </p>
                  </button>
                </div>

                <div className="mt-8 flex flex-col gap-8">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold">
                      {gameData?.rating_top === 5 ? "Exceptional" : null}
                      {gameData?.rating_top === 4 ? "Recommended" : null}
                      {gameData?.rating_top === 3 ? "Meh" : null}
                      {gameData?.rating_top === 1 ? "Skip" : null}
                    </h2>
                    <p className="text-sm text-textSecondary">
                      {gameData?.ratings_count} Ratings
                    </p>
                  </div>

                  <div
                    id="about"
                    className="flex w-full flex-col gap-1 text-start"
                  >
                    <h2 className="text-2xl font-bold">About</h2>
                    <p
                      className={`text-sm tracking-wider ${showFullDescription ? "" : "line-clamp-4"}`}
                      dangerouslySetInnerHTML={{
                        __html: removeSpanishText(gameData?.description),
                      }}
                    ></p>
                    <button
                      className="text-start text-textSecondary underline"
                      onClick={toggleDescription}
                    >
                      {showFullDescription ? "Read Less" : "Read More"}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-8 text-start">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-textSecondary">Platforms</h3>
                      <div className="flex flex-wrap gap-2">
                        {gameData?.parent_platforms.map(
                          (parentPlatform, index) => {
                            const isLast =
                              index === gameData.parent_platforms.length - 1;
                            return (
                              <p key={parentPlatform.platform.id}>
                                {parentPlatform.platform.name}
                                {!isLast && ","}
                              </p>
                            );
                          },
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <h3 className="text-textSecondary">Metascore</h3>
                      <p>{gameData?.metacritic ?? "N/A"}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <h3 className="text-textSecondary">Genre</h3>
                      <div className="flex flex-wrap gap-2">
                        {gameData?.genres.map((genre, index) => {
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
                      <p>{gameData?.released}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <h3 className="text-textSecondary">Developers</h3>
                      <div className="flex flex-col">
                        {gameData ? (
                          <>
                            {gameData.developers?.length > 0 ? (
                              gameData.developers.map((developer, index) => {
                                const isLast =
                                  index === gameData.developers.length - 1;
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
                          </>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <h3 className="text-textSecondary">Publishers</h3>
                      <div className="flex flex-col">
                        {gameData ? (
                          <>
                            {gameData.publishers?.length > 0 ? (
                              gameData.publishers.map((publisher, index) => {
                                const isLast =
                                  index === gameData.publishers.length - 1;
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
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 text-start">
                    <h3 className="text-textSecondary">Age Rating</h3>
                    <p>{gameData?.esrb_rating?.name ?? "N/A"}</p>
                  </div>

                  <div className="flex flex-col gap-1 text-start">
                    <h3 className="text-textSecondary">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {gameData ? (
                        <>
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
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 text-start">
                    <h3 className="text-textSecondary">Website</h3>
                    {gameData?.website === "" ? (
                      <>
                        <p>N/A</p>
                      </>
                    ) : (
                      <>
                        <a
                          href={gameData?.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          {gameData?.website}
                        </a>
                      </>
                    )}
                  </div>

                  <div className="grid grid-cols-2 flex-wrap gap-2 lg:hidden">
                    {gameStores?.results.map((gameStore, index) => {
                      const storeId = gameStore.store_id;
                      let storeName = "";
                      let storeImg: JSX.Element;

                      if (storeId === 3) {
                        storeName = "PlayStation Store";
                        storeImg = (
                          <svg
                            viewBox="0 0 21 16"
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                          >
                            <path
                              d="M11.112 16L8 14.654V0s6.764 1.147 7.695 3.987c.931 2.842-.52 4.682-1.03 4.736-1.42.15-1.96-.748-1.96-.748V3.39l-1.544-.648L11.112 16zM12 14.32V16s7.666-2.338 8.794-3.24c1.128-.9-2.641-3.142-4.666-2.704 0 0-2.152.099-4.102.901-.019.008 0 1.51 0 1.51l4.948-1.095 1.743.73L12 14.32zm-5.024-.773s-.942.476-3.041.452c-2.1-.024-3.959-.595-3.935-1.833C.024 10.928 3.476 9.571 6.952 9v1.738l-3.693.952s-.632.786.217.81A11.934 11.934 0 007 12.046l-.024 1.5z"
                              fill="currentColor"
                            />
                          </svg>
                        );
                      }
                      if (storeId === 11) {
                        storeName = "Epic Games";
                        storeImg = (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 21 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.044.024H1.933C.546.024.034.53.034 1.9v16.54c0 .155.006.299.02.432.032.3.038.59.32.92.027.032.314.243.314.243.155.075.26.13.435.2l8.426 3.487c.437.198.62.275.938.269h.002c.318.006.501-.071.938-.27l8.426-3.486c.175-.07.28-.125.435-.2 0 0 .288-.211.315-.243.282-.33.288-.62.32-.92.013-.133.02-.277.02-.432V1.9c0-1.37-.512-1.876-1.9-1.876zm-1.146 16.628l-.004.038-.004.042-.008.038-.011.039-.008.034-.012.038-.015.034-.015.03-.016.035-.019.03-.02.031-.022.03-.02.031-.022.027-.027.027-.023.023-.031.026-.027.023-.031.023-.03.019-.031.023-.035.019-.035.015-.034.02-.039.014-.038.016-.039.011-.038.012-.035.011-.038.008-.035.007-.034.008-.039.008-.038.003-.035.004-.038.004-.043.004-.038.004h-.161l-.039-.004h-.042l-.039-.004-.038-.004-.042-.004-.039-.007-.038-.004-.039-.008-.038-.007-.039-.008-.038-.008-.039-.011-.034-.008-.039-.011-.038-.012-.035-.015-.038-.011-.035-.012-.038-.015-.035-.015-.034-.015-.035-.02-.035-.015-.034-.019-.03-.019-.036-.019-.03-.019-.031-.019-.03-.023-.031-.023-.031-.023-.031-.022-.027-.023-.03-.027.022-.03.027-.027.023-.03.027-.031.023-.027.023-.03.027-.031.023-.027.027-.03.023-.027.027-.03.023-.031.023-.027.027-.03.023-.03.027-.028.023-.03.031.023.035.023.03.023.035.023.031.019.035.022.03.02.035.015.03.019.035.015.035.015.034.016.035.011.035.015.038.012.038.011.035.012.039.007.038.008.038.008.043.003.038.008h.039l.042.004h.084l.043-.004.038-.008.035-.007.034-.008.031-.011.027-.016.031-.022.023-.027.015-.03.012-.035.004-.038v-.008l-.004-.046-.015-.038-.02-.026-.027-.023-.03-.023-.031-.015-.035-.016-.038-.015-.046-.019-.027-.008-.03-.007-.036-.012-.034-.007-.039-.012-.038-.007-.042-.012-.039-.008-.042-.011-.039-.008-.038-.011-.039-.008-.038-.011-.035-.012-.038-.007-.035-.012-.034-.011-.035-.012-.042-.015-.039-.015-.038-.015-.039-.016-.034-.019-.038-.019-.031-.019-.035-.019-.03-.023-.031-.019-.027-.023-.027-.026-.027-.027-.023-.027-.023-.027-.02-.026-.019-.03-.019-.035-.015-.027-.012-.03-.011-.034-.012-.031-.008-.038-.007-.034-.004-.039-.004-.038-.004-.042v-.087l.004-.039.004-.034.004-.038.007-.034.008-.035.012-.034.007-.034.016-.035.015-.034.015-.034.02-.035.019-.034.023-.03.023-.031.027-.03.027-.027.027-.03.03-.028.027-.019.031-.023.031-.022.03-.02.035-.019.035-.015.034-.019.035-.015.039-.012.038-.015.035-.011.03-.008.035-.008.035-.007.038-.008.035-.008.038-.003.039-.004.038-.004.038-.004h.166l.042.004.042.004h.039l.042.004.039.007.042.004.038.008.035.007.038.008.039.008.034.007.039.012.034.011.035.008.039.015.034.012.035.015.034.015.039.015.034.02.031.015.035.019.034.019.031.019.035.023.03.019.031.023.031.023.03.022-.022.031-.02.03-.023.031-.023.03-.023.035-.019.03-.023.031-.023.03-.02.031-.022.03-.024.031-.019.03-.023.035-.023.03-.023.03-.02.031-.022.03-.031-.022-.035-.019-.03-.02-.031-.022-.035-.015-.03-.02-.035-.015-.03-.015-.036-.015-.03-.015-.035-.012-.03-.015-.043-.011-.038-.012-.039-.011-.038-.008-.039-.008-.038-.007-.038-.004-.04-.004-.034-.004h-.083l-.042.008-.039.008-.035.007-.03.015-.027.016-.035.03-.023.035-.015.034-.004.038v.008l.004.05.019.041.015.023.027.027.035.019.03.019.039.015.042.016.047.015.03.007.03.012.036.007.034.012.039.008.042.011.042.011.043.012.042.007.038.012.042.011.04.008.038.011.038.012.034.011.039.012.035.011.034.012.043.015.038.019.038.015.039.02.035.018.034.02.03.018.032.023.03.02.031.026.03.027.028.03.027.027.023.03.023.035.019.03.02.035.015.03.011.034.012.035.007.034.008.038.008.039.004.038.003.042v.091l-.003.042zm-2.697.763h-2.203v-2.777h2.222v.63h-1.488v.452h1.338v.592h-1.338v.474h1.508v.629h-.04zm-2.809 0h-.704v-1.642l-.019.03-.023.035-.02.03-.022.031-.02.034-.023.03-.019.031-.019.035-.023.03-.02.031-.022.03-.02.035-.023.03-.019.031-.019.034-.023.031-.02.03-.022.035-.02.03-.023.031-.019.035-.02.03-.022.03-.02.035-.022.03-.02.031-.023.03-.019.035-.02.03-.022.031-.02.035-.023.03-.019.03-.023.035-.02.03h-.014l-.023-.033-.02-.031-.023-.035-.02-.03-.022-.034-.02-.031-.022-.035-.02-.03-.023-.034-.019-.03-.023-.035-.02-.031-.022-.034-.02-.03-.022-.035-.02-.03-.023-.035-.023-.03-.02-.035-.022-.03-.02-.035-.022-.03-.02-.035-.023-.03-.019-.035-.023-.03-.02-.035-.022-.03-.02-.035-.023-.03-.019-.035-.023-.03-.02-.035-.022-.03v1.634h-.731v-2.777h.789l.019.03.019.035.023.03.02.034.018.031.02.034.019.03.023.035.02.03.018.031.02.034.019.03.023.035.02.03.018.035.02.03.023.03.019.035.019.03.02.035.018.03.024.034.019.03.019.035.02.03.018.03.024.035.019.03.019.035.02.03.018.035.024.03.019.034.019.03.02-.03.019-.034.022-.03.02-.035.019-.03.02-.034.022-.03.02-.035.019-.03.019-.03.023-.035.02-.03.018-.035.02-.03.023-.035.019-.03.02-.034.018-.03.02-.031.023-.034.019-.031.02-.034.018-.03.023-.035.02-.03.019-.031.02-.034.022-.03.02-.035.018-.03.02-.035.023-.03.02-.034.018-.031h.788v2.777h-.038zM7.931 16.27l-.012-.035-.015-.038-.015-.034-.012-.035-.015-.034-.015-.038-.012-.035-.016-.034-.015-.035-.011-.034-.016-.038-.011-.035-.016-.034-.015-.035-.012-.034-.015-.038-.015-.035-.012-.034-.015-.035-.016-.038-.011-.034-.016-.035-.015.035-.011.034-.016.038-.015.035-.012.034-.015.035-.016.038-.015.034-.011.035-.016.034-.015.035-.012.038-.015.034-.015.035-.012.034-.015.035-.016.038-.015.034-.012.035-.015.034-.015.038-.012.035-.015.034h.649l-.015-.034zm1.207 1.144h-.753l-.016-.034-.011-.035-.016-.034-.015-.038-.011-.034-.016-.035-.015-.034-.012-.034-.015-.035-.016-.034-.011-.034-.015-.039-.016-.034-.011-.034-.016-.035H7.07l-.015.035-.012.034-.015.034-.016.039-.011.034-.016.034-.015.035-.012.034-.015.034-.015.035-.012.034-.015.038-.016.034-.011.035-.016.034h-.776l.015-.034.015-.035.016-.034.015-.038.012-.034.015-.035.016-.034.015-.034.015-.035.016-.038.015-.034.015-.035.012-.034.015-.034.016-.035.015-.038.016-.034.015-.034.015-.035.016-.034.011-.034.015-.039.016-.034.015-.034.016-.035.015-.034.016-.034.015-.038.011-.035.016-.034.015-.034.015-.035.016-.034.015-.038.016-.034.015-.035.012-.034.015-.034.015-.035.016-.038.015-.034.015-.035.016-.034.015-.034.012-.035.015-.034.016-.038.015-.034.015-.035.016-.034.015-.034.015-.035.012-.038.015-.034.016-.034.015-.035.015-.034.016-.034.015-.039.016-.034.011-.034.016-.035.015-.034.015-.034.016-.038.015-.035.015-.034.016-.034.011-.035.016-.034.015-.038.016-.035.015-.034.015-.034.016-.035.015-.034.012-.038.015-.034.015-.035.016-.034h.711l.015.034.016.035.015.034.015.038.012.034.015.035.016.034.015.034.016.035.015.038.015.034.016.035.011.034.016.034.015.035.015.038.016.034.015.034.016.035.015.034.011.034.016.039.015.034.015.034.016.035.015.034.016.034.015.038.012.035.015.034.015.034.016.035.015.034.015.038.016.034.015.035.012.034.015.034.016.035.015.034.015.038.016.035.015.034.015.034.012.035.015.034.016.038.015.034.015.035.016.034.015.034.016.035.011.038.015.034.016.034.015.035.015.034.016.034.015.039.016.034.011.034.016.035.015.034.015.034.016.038.015.035.016.034.015.034.011.035.016.034.015.038.016.035.015.034.015.034.016.035.015.034.012.038.015.034.015.035.016.034h-.039zM5.77 17.06l-.03.023-.028.02-.03.022-.031.02-.03.022-.032.02-.03.018-.035.02-.035.018-.034.02-.035.015-.034.019-.039.015-.034.015-.039.015-.034.016-.035.011-.035.012-.034.011-.039.011-.034.012-.039.008-.034.007-.039.008-.038.007-.039.004-.042.004-.038.004-.043.004-.038.004-.043.003h-.165l-.038-.003-.043-.004-.038-.004-.038-.004-.039-.004-.038-.007-.039-.008-.034-.008-.039-.007-.035-.012-.038-.007-.035-.012-.034-.015-.035-.012-.038-.015-.035-.015-.034-.015-.035-.016-.035-.019-.03-.018-.035-.02-.03-.019-.031-.019-.031-.023-.031-.022-.03-.023-.028-.023-.027-.023-.027-.027-.026-.023-.027-.026-.027-.027-.023-.027-.023-.03-.024-.027-.019-.03-.023-.031-.019-.03-.02-.031-.018-.035-.02-.03-.015-.034-.015-.035-.016-.034-.015-.034-.012-.03-.015-.035-.008-.035-.011-.034-.008-.038-.012-.034-.007-.039-.004-.034-.008-.038-.004-.034-.004-.038-.003-.039-.004-.038v-.126l.004-.042v-.038l.003-.038.004-.042.008-.038.004-.038.008-.034.011-.038.008-.039.011-.034.012-.038.011-.034.016-.039.015-.034.016-.034.015-.035.015-.034.02-.034.019-.03.019-.031.02-.03.019-.031.022-.03.024-.031.023-.03.023-.028.027-.026.023-.027.027-.027.027-.026.026-.023.031-.027.027-.023.03-.023.032-.019.03-.023.031-.019.03-.019.035-.019.035-.02.035-.018.034-.015.035-.016.038-.019.031-.011.038-.012.035-.015.035-.008.034-.011.039-.008.034-.011.039-.008.038-.004.039-.007.038-.004.039-.004.038-.004.039-.003h.165l.042.003.043.004h.038l.038.004.043.008.034.003.039.008.038.008.035.007.034.008.035.008.035.011.034.008.03.011.036.012.034.015.035.015.034.015.035.02.035.015.03.019.035.019.03.019.035.019.031.023.03.019.032.023.03.023.031.026.03.023-.022.03-.027.028-.023.03-.027.03-.023.031-.023.027-.027.03-.023.03-.023.028-.027.03-.023.03-.027.031-.023.027-.023.03-.027.03-.023.031-.027.027-.023.03-.031-.022-.03-.027-.032-.019-.03-.023-.031-.019-.03-.02-.032-.018-.034-.02-.031-.014-.03-.016-.032-.011-.034-.012-.035-.011-.034-.008-.039-.007-.038-.008-.039-.004-.042-.004-.042-.003h-.081l-.038.003-.035.004-.038.008-.035.008-.035.01-.034.012-.035.016-.034.015-.031.019-.03.02-.032.018-.027.023-.027.023-.026.023-.024.026-.026.027-.024.03-.019.027-.019.031-.02.034-.018.03-.016.035-.011.034-.016.035-.011.038-.008.038-.008.034-.007.042-.004.038-.004.038v.088l.004.038.004.035.003.038.008.034.008.035.008.034.011.034.012.03.015.039.015.034.02.035.019.03.02.03.022.031.023.027.027.027.023.026.027.023.031.023.03.023.031.019.031.019.035.015.034.016.035.015.038.011.039.012.038.007.039.008.038.004.042.004h.089l.042-.004.043-.004.038-.004.038-.007.039-.008.038-.012.035-.007.034-.015.031-.016.035-.015.027-.015.03-.02v-.346h-.56v-.557h1.268v1.239l-.027.023zM4.534 8.355v2.77h1.759v1.273H3.119V3.21h3.147v1.273H4.534v2.6H6.2v1.273H4.534zm11.935.276h1.389v2.14c0 1.142-.569 1.706-1.72 1.706h-.7c-1.15 0-1.72-.564-1.72-1.707V4.837c0-1.142.57-1.707 1.72-1.707h.687c1.15 0 1.706.552 1.706 1.694V6.7h-1.388V4.902c0-.367-.172-.538-.53-.538h-.237c-.37 0-.543.17-.543.538v5.803c0 .368.172.538.543.538h.264c.357 0 .53-.17.53-.538V8.631zm-4.914 3.767v-9.19h1.415v9.19h-1.415zM9.502 7.292v-2.31c0-.368-.172-.539-.53-.539h-.581V7.83h.582c.357 0 .529-.17.529-.538zm-.304-4.083c1.15 0 1.719.564 1.719 1.707v2.441c0 1.142-.569 1.707-1.72 1.707h-.806v3.334H6.976v-9.19h2.222zM6.457 20.707h8.1l-4.134 1.347-3.966-1.347z"
                              fill="currentColor"
                              fill-rule="evenodd"
                            ></path>
                          </svg>
                        );
                      }
                      if (storeId === 1) {
                        storeName = "Steam";
                        storeImg = (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 22 22"
                          >
                            <path
                              fill="currentColor"
                              d="M.028 10.277a21.629 21.629 0 00-.004-.008C.399 4.535 5.148 0 10.954 0c6.048 0 10.952 4.925 10.952 11s-4.904 11-10.953 11C6.015 22 1.84 18.719.473 14.208l4.147 1.719c.21.937.85 1.76 1.795 2.155a3.034 3.034 0 003.971-1.643c.167-.406.245-.832.234-1.257l3.835-2.752.094.001c2.295 0 4.16-1.879 4.16-4.186 0-2.308-1.865-4.185-4.16-4.185-2.294 0-4.16 1.877-4.16 4.185v.054l-2.68 3.91c-.434-.02-.87.057-1.282.228a2.976 2.976 0 00-.513.272L.028 10.276v.001zm9.718 5.892a2.342 2.342 0 01-3.065 1.27 2.334 2.334 0 01-1.206-1.156l1.354.564c.88.368 1.89-.051 2.256-.935a1.74 1.74 0 00-.929-2.27l-1.4-.582a2.331 2.331 0 012.993 1.305 2.355 2.355 0 01-.003 1.804zm4.803-5.135a2.784 2.784 0 01-2.771-2.789 2.784 2.784 0 012.771-2.788 2.784 2.784 0 012.773 2.788 2.784 2.784 0 01-2.773 2.789zm-2.077-2.793c0 1.157.933 2.094 2.082 2.094 1.15 0 2.082-.937 2.082-2.094a2.09 2.09 0 00-2.082-2.096 2.09 2.09 0 00-2.082 2.096z"
                            ></path>
                          </svg>
                        );
                      }
                      if (storeId === 2) {
                        storeName = "Xbox Store";
                        storeImg = (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            width={20}
                            height={20}
                          >
                            <path
                              fill="currentColor"
                              d="M3.564 1.357l-.022.02c.046-.048.11-.1.154-.128C4.948.435 6.396 0 8 0c1.502 0 2.908.415 4.11 1.136.086.052.324.215.446.363C11.4.222 7.993 2.962 7.993 2.962c-1.177-.908-2.26-1.526-3.067-1.746-.674-.185-1.14-.03-1.362.141zm10.305 1.208c-.035-.04-.074-.076-.109-.116-.293-.322-.653-.4-.978-.378-.295.092-1.66.584-3.342 2.172 0 0 1.894 1.841 3.053 3.723 1.159 1.883 1.852 3.362 1.426 5.415A7.969 7.969 0 0016 7.999a7.968 7.968 0 00-2.13-5.434zM10.98 8.77a55.416 55.416 0 00-2.287-2.405 52.84 52.84 0 00-.7-.686l-.848.854c-.614.62-1.411 1.43-1.853 1.902-.787.84-3.043 3.479-3.17 4.958 0 0-.502-1.174.6-3.88.72-1.769 2.893-4.425 3.801-5.29 0 0-.83-.913-1.87-1.544l-.007-.002s-.011-.009-.03-.02c-.5-.3-1.047-.53-1.573-.56a1.391 1.391 0 00-.878.431A8 8 0 0013.92 13.381c0-.002-.169-1.056-1.245-2.57-.253-.354-1.178-1.46-1.696-2.04z"
                            />
                          </svg>
                        );
                      }
                      if (storeId === 7) {
                        storeName = "Xbox 360 Store";
                        storeImg = (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            width={20}
                            height={20}
                          >
                            <path
                              fill="currentColor"
                              d="M3.564 1.357l-.022.02c.046-.048.11-.1.154-.128C4.948.435 6.396 0 8 0c1.502 0 2.908.415 4.11 1.136.086.052.324.215.446.363C11.4.222 7.993 2.962 7.993 2.962c-1.177-.908-2.26-1.526-3.067-1.746-.674-.185-1.14-.03-1.362.141zm10.305 1.208c-.035-.04-.074-.076-.109-.116-.293-.322-.653-.4-.978-.378-.295.092-1.66.584-3.342 2.172 0 0 1.894 1.841 3.053 3.723 1.159 1.883 1.852 3.362 1.426 5.415A7.969 7.969 0 0016 7.999a7.968 7.968 0 00-2.13-5.434zM10.98 8.77a55.416 55.416 0 00-2.287-2.405 52.84 52.84 0 00-.7-.686l-.848.854c-.614.62-1.411 1.43-1.853 1.902-.787.84-3.043 3.479-3.17 4.958 0 0-.502-1.174.6-3.88.72-1.769 2.893-4.425 3.801-5.29 0 0-.83-.913-1.87-1.544l-.007-.002s-.011-.009-.03-.02c-.5-.3-1.047-.53-1.573-.56a1.391 1.391 0 00-.878.431A8 8 0 0013.92 13.381c0-.002-.169-1.056-1.245-2.57-.253-.354-1.178-1.46-1.696-2.04z"
                            />
                          </svg>
                        );
                      }
                      if (storeId === 6) {
                        storeName = "Nintendo Store";
                        storeImg = (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 21 16"
                            width={20}
                            height={20}
                          >
                            <path
                              fill="currentColor"
                              fill-rule="evenodd"
                              d="M8 0h5a8 8 0 110 16H8A8 8 0 118 0zm-.135 1.935a6.065 6.065 0 000 12.13h5.12a6.065 6.065 0 000-12.13h-5.12zm-1.33 2.304h2.401l3.199 5.175V4.24h2.346v7.495H12.18L8.864 6.537v5.201H6.53l.005-7.499z"
                            />
                          </svg>
                        );
                      }
                      if (storeId === 5) {
                        storeName = "Gog";
                        storeImg = (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 23"
                          >
                            <g fill="none" fill-rule="evenodd">
                              <rect
                                width="23"
                                height="22"
                                x=".5"
                                y=".5"
                                stroke="currentColor"
                                rx="2"
                              ></rect>
                              <path
                                fill="currentColor"
                                fill-rule="nonzero"
                                d="M21.148 11.039c0 .56-.455 1.012-1.013 1.012h-4.348v-1.305h3.665a.39.39 0 00.39-.39V6.044a.39.39 0 00-.39-.39h-1.969a.39.39 0 00-.388.39v1.962c0 .216.174.39.388.39h1.573v1.305H16.8c-.56 0-1.014-.452-1.014-1.011V5.362c0-.559.453-1.012 1.014-1.012h3.334c.558 0 1.013.453 1.013 1.012v5.677zm-.004 7.57h-1.288v-3.987h-.905a.382.382 0 00-.383.384v3.602H17.28v-3.986h-.906a.383.383 0 00-.383.384v3.606h-1.288V14.33c0-.548.446-.995.999-.995h5.442v5.273zM13.73 9.7h-3.335c-.56 0-1.013-.452-1.013-1.011V5.362c0-.559.453-1.012 1.013-1.012h3.335c.558 0 1.012.453 1.012 1.012V8.69c0 .559-.454 1.011-1.012 1.011zm-.682-4.046h-1.97a.389.389 0 00-.39.39v1.961c0 .216.174.39.39.39h1.969a.385.385 0 00.385-.39V6.044a.385.385 0 00-.385-.39zm.624 11.957c0 .55-.447.996-.998.996H9.388a.997.997 0 01-.999-.996V14.33a.997.997 0 011-.995h3.284c.55 0 .998.446.998.995v3.28zm-1.67-2.99h-1.94a.383.383 0 00-.384.384v1.932c0 .211.171.385.384.385l.004-.003v.003h1.932v-.003l.004.003a.384.384 0 00.382-.385v-1.932a.382.382 0 00-.382-.384zm-3.665-3.583c0 .56-.455 1.012-1.014 1.012H2.975v-1.305H6.64a.389.389 0 00.389-.39V6.044a.389.389 0 00-.39-.39H4.67a.389.389 0 00-.388.39v1.962c0 .216.173.39.388.39h1.574v1.305H3.988c-.56 0-1.013-.452-1.013-1.011V5.362c0-.559.453-1.012 1.013-1.012h3.334c.56 0 1.014.453 1.014 1.012v5.677zm-.978 3.583H4.65a.383.383 0 00-.383.384v1.932c0 .212.17.386.383.386h2.708v1.288h-3.38v-.004c-.552 0-1-.446-1-.997v-3.28a.998.998 0 011-.995h3.38v1.286z"
                              ></path>
                            </g>
                          </svg>
                        );
                      }

                      if (storeId === 4) {
                        storeName = "App Store";
                        storeImg = (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 23 20"
                          >
                            <g fill="currentColor">
                              <path d="M8.493 12.576c1.463 0 2.74-.02 4.014.004 1.322.028 2.231.946 2.195 2.133-.016.473-.17.717-.708.713-4.11-.016-8.217-.004-12.328-.024-1.04-.004-1.682-.605-1.666-1.447.012-.806.692-1.367 1.706-1.379.906-.012 1.815-.032 2.72 0 .518.02.85-.164 1.1-.6a775.913 775.913 0 013.994-6.85c.218-.373.17-.658-.012-1.027-.376-.75-1.035-1.334-1.237-2.18-.198-.822.044-1.491.63-1.76.776-.348 1.455-.124 1.985.662.174.26.335.533.525.841.38-.204.461-.593.667-.873.55-.758 1.322-.998 1.993-.593.703.424.914 1.194.445 2.012-1.718 2.994-3.468 5.971-5.207 8.953-.242.417-.477.826-.816 1.415z"></path>
                              <path d="M13.61 5.45c.805 1.37 1.56 2.661 2.312 3.956.558.958 1.112 1.916 1.65 2.882.161.292.412.284.683.284.986 0 1.972-.012 2.959.008 1.07.024 1.774.622 1.746 1.447-.024.826-.68 1.355-1.726 1.379-.53.012-1.06.004-1.775.004.457.798.845 1.475 1.233 2.148.23.397.42.806.332 1.275-.097.5-.392.85-.882 1.042-.529.204-1.002.1-1.414-.249a2.147 2.147 0 01-.449-.553c-1.783-3.018-3.65-5.992-5.271-9.098-.792-1.499-.574-3.299.602-4.525zM1.888 18.88c.049-1.25.683-2.003 1.261-2.72.457-.566 2.292-.085 2.656.585.13.24 0 .404-.101.58-.38.662-.72 1.351-1.156 1.973-.368.52-.918.845-1.593.617-.594-.192-1.156-.477-1.067-1.034z"></path>
                            </g>
                          </svg>
                        );
                      }
                      if (storeId === 8) {
                        storeName = "Google Play";
                        storeImg = (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 18 20"
                          >
                            <path
                              fill="currentColor"
                              d="M16.9 8.09L3.354.29a2.173 2.173 0 00-2.178.007A2.208 2.208 0 00.088 2.198v15.603c0 .78.416 1.51 1.087 1.901a2.171 2.171 0 002.178.008L16.9 11.908a2.206 2.206 0 000-3.817zm-5.87-1.844l-1.86 2.61-4.45-6.243 6.31 3.633zM2.185 18.658a.847.847 0 01-.346-.109.87.87 0 01-.428-.748V2.198a.856.856 0 01.772-.86L8.355 10l-6.17 8.658zm2.536-1.272l4.449-6.243 1.86 2.61-6.31 3.633zm11.523-6.635l-4.059 2.337L9.985 10l2.2-3.088 4.059 2.337a.868.868 0 010 1.502z"
                            ></path>
                          </svg>
                        );
                      }

                      const storeNameAndImage = () => {
                        return (
                          <div className="flex h-full items-center justify-center gap-2">
                            <p>{storeName}</p>
                            {storeImg}
                          </div>
                        );
                      };

                      return (
                        <a
                          key={gameStore.id}
                          href={gameStore.url}
                          target="_blank"
                          rel="noreferrer nooponer"
                          className="rounded-sm bg-secondary px-4 py-2 text-center text-sm text-textSecondary transition-all duration-300 hover:bg-primary hover:text-secondaryLighter lg:text-base"
                        >
                          {storeNameAndImage()}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="hidden flex-col gap-4 lg:flex">
                {gameTrailers?.results && gameTrailers.results.length > 0 ? (
                  <div className={`relative aspect-video w-full`}>
                    <iframe
                      src={gameTrailers?.results[0].data.max}
                      allowFullScreen
                      loading="lazy"
                      title={gameData?.name + " trailer"}
                      className="h-full w-full"
                    />
                  </div>
                ) : null}

                <div className="hidden aspect-video gap-2 lg:grid lg:grid-cols-2">
                  {gameScreenshots?.results.map((screenshot, index) => {
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
                        alt={`${gameData?.name} game screenshot`}
                      />
                    );
                  })}
                </div>

                <div className="hidden grid-cols-2 flex-wrap gap-2 lg:grid">
                  {gameStores?.results.map((gameStore, index) => {
                    const storeId = gameStore.store_id;
                    let storeName = "";
                    let storeImg: JSX.Element;

                    if (storeId === 3) {
                      storeName = "PlayStation Store";
                      storeImg = (
                        <svg
                          viewBox="0 0 21 16"
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                        >
                          <path
                            d="M11.112 16L8 14.654V0s6.764 1.147 7.695 3.987c.931 2.842-.52 4.682-1.03 4.736-1.42.15-1.96-.748-1.96-.748V3.39l-1.544-.648L11.112 16zM12 14.32V16s7.666-2.338 8.794-3.24c1.128-.9-2.641-3.142-4.666-2.704 0 0-2.152.099-4.102.901-.019.008 0 1.51 0 1.51l4.948-1.095 1.743.73L12 14.32zm-5.024-.773s-.942.476-3.041.452c-2.1-.024-3.959-.595-3.935-1.833C.024 10.928 3.476 9.571 6.952 9v1.738l-3.693.952s-.632.786.217.81A11.934 11.934 0 007 12.046l-.024 1.5z"
                            fill="currentColor"
                          />
                        </svg>
                      );
                    }
                    if (storeId === 11) {
                      storeName = "Epic Games";
                      storeImg = (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 21 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.044.024H1.933C.546.024.034.53.034 1.9v16.54c0 .155.006.299.02.432.032.3.038.59.32.92.027.032.314.243.314.243.155.075.26.13.435.2l8.426 3.487c.437.198.62.275.938.269h.002c.318.006.501-.071.938-.27l8.426-3.486c.175-.07.28-.125.435-.2 0 0 .288-.211.315-.243.282-.33.288-.62.32-.92.013-.133.02-.277.02-.432V1.9c0-1.37-.512-1.876-1.9-1.876zm-1.146 16.628l-.004.038-.004.042-.008.038-.011.039-.008.034-.012.038-.015.034-.015.03-.016.035-.019.03-.02.031-.022.03-.02.031-.022.027-.027.027-.023.023-.031.026-.027.023-.031.023-.03.019-.031.023-.035.019-.035.015-.034.02-.039.014-.038.016-.039.011-.038.012-.035.011-.038.008-.035.007-.034.008-.039.008-.038.003-.035.004-.038.004-.043.004-.038.004h-.161l-.039-.004h-.042l-.039-.004-.038-.004-.042-.004-.039-.007-.038-.004-.039-.008-.038-.007-.039-.008-.038-.008-.039-.011-.034-.008-.039-.011-.038-.012-.035-.015-.038-.011-.035-.012-.038-.015-.035-.015-.034-.015-.035-.02-.035-.015-.034-.019-.03-.019-.036-.019-.03-.019-.031-.019-.03-.023-.031-.023-.031-.023-.031-.022-.027-.023-.03-.027.022-.03.027-.027.023-.03.027-.031.023-.027.023-.03.027-.031.023-.027.027-.03.023-.027.027-.03.023-.031.023-.027.027-.03.023-.03.027-.028.023-.03.031.023.035.023.03.023.035.023.031.019.035.022.03.02.035.015.03.019.035.015.035.015.034.016.035.011.035.015.038.012.038.011.035.012.039.007.038.008.038.008.043.003.038.008h.039l.042.004h.084l.043-.004.038-.008.035-.007.034-.008.031-.011.027-.016.031-.022.023-.027.015-.03.012-.035.004-.038v-.008l-.004-.046-.015-.038-.02-.026-.027-.023-.03-.023-.031-.015-.035-.016-.038-.015-.046-.019-.027-.008-.03-.007-.036-.012-.034-.007-.039-.012-.038-.007-.042-.012-.039-.008-.042-.011-.039-.008-.038-.011-.039-.008-.038-.011-.035-.012-.038-.007-.035-.012-.034-.011-.035-.012-.042-.015-.039-.015-.038-.015-.039-.016-.034-.019-.038-.019-.031-.019-.035-.019-.03-.023-.031-.019-.027-.023-.027-.026-.027-.027-.023-.027-.023-.027-.02-.026-.019-.03-.019-.035-.015-.027-.012-.03-.011-.034-.012-.031-.008-.038-.007-.034-.004-.039-.004-.038-.004-.042v-.087l.004-.039.004-.034.004-.038.007-.034.008-.035.012-.034.007-.034.016-.035.015-.034.015-.034.02-.035.019-.034.023-.03.023-.031.027-.03.027-.027.027-.03.03-.028.027-.019.031-.023.031-.022.03-.02.035-.019.035-.015.034-.019.035-.015.039-.012.038-.015.035-.011.03-.008.035-.008.035-.007.038-.008.035-.008.038-.003.039-.004.038-.004.038-.004h.166l.042.004.042.004h.039l.042.004.039.007.042.004.038.008.035.007.038.008.039.008.034.007.039.012.034.011.035.008.039.015.034.012.035.015.034.015.039.015.034.02.031.015.035.019.034.019.031.019.035.023.03.019.031.023.031.023.03.022-.022.031-.02.03-.023.031-.023.03-.023.035-.019.03-.023.031-.023.03-.02.031-.022.03-.024.031-.019.03-.023.035-.023.03-.023.03-.02.031-.022.03-.031-.022-.035-.019-.03-.02-.031-.022-.035-.015-.03-.02-.035-.015-.03-.015-.036-.015-.03-.015-.035-.012-.03-.015-.043-.011-.038-.012-.039-.011-.038-.008-.039-.008-.038-.007-.038-.004-.04-.004-.034-.004h-.083l-.042.008-.039.008-.035.007-.03.015-.027.016-.035.03-.023.035-.015.034-.004.038v.008l.004.05.019.041.015.023.027.027.035.019.03.019.039.015.042.016.047.015.03.007.03.012.036.007.034.012.039.008.042.011.042.011.043.012.042.007.038.012.042.011.04.008.038.011.038.012.034.011.039.012.035.011.034.012.043.015.038.019.038.015.039.02.035.018.034.02.03.018.032.023.03.02.031.026.03.027.028.03.027.027.023.03.023.035.019.03.02.035.015.03.011.034.012.035.007.034.008.038.008.039.004.038.003.042v.091l-.003.042zm-2.697.763h-2.203v-2.777h2.222v.63h-1.488v.452h1.338v.592h-1.338v.474h1.508v.629h-.04zm-2.809 0h-.704v-1.642l-.019.03-.023.035-.02.03-.022.031-.02.034-.023.03-.019.031-.019.035-.023.03-.02.031-.022.03-.02.035-.023.03-.019.031-.019.034-.023.031-.02.03-.022.035-.02.03-.023.031-.019.035-.02.03-.022.03-.02.035-.022.03-.02.031-.023.03-.019.035-.02.03-.022.031-.02.035-.023.03-.019.03-.023.035-.02.03h-.014l-.023-.033-.02-.031-.023-.035-.02-.03-.022-.034-.02-.031-.022-.035-.02-.03-.023-.034-.019-.03-.023-.035-.02-.031-.022-.034-.02-.03-.022-.035-.02-.03-.023-.035-.023-.03-.02-.035-.022-.03-.02-.035-.022-.03-.02-.035-.023-.03-.019-.035-.023-.03-.02-.035-.022-.03-.02-.035-.023-.03-.019-.035-.023-.03-.02-.035-.022-.03v1.634h-.731v-2.777h.789l.019.03.019.035.023.03.02.034.018.031.02.034.019.03.023.035.02.03.018.031.02.034.019.03.023.035.02.03.018.035.02.03.023.03.019.035.019.03.02.035.018.03.024.034.019.03.019.035.02.03.018.03.024.035.019.03.019.035.02.03.018.035.024.03.019.034.019.03.02-.03.019-.034.022-.03.02-.035.019-.03.02-.034.022-.03.02-.035.019-.03.019-.03.023-.035.02-.03.018-.035.02-.03.023-.035.019-.03.02-.034.018-.03.02-.031.023-.034.019-.031.02-.034.018-.03.023-.035.02-.03.019-.031.02-.034.022-.03.02-.035.018-.03.02-.035.023-.03.02-.034.018-.031h.788v2.777h-.038zM7.931 16.27l-.012-.035-.015-.038-.015-.034-.012-.035-.015-.034-.015-.038-.012-.035-.016-.034-.015-.035-.011-.034-.016-.038-.011-.035-.016-.034-.015-.035-.012-.034-.015-.038-.015-.035-.012-.034-.015-.035-.016-.038-.011-.034-.016-.035-.015.035-.011.034-.016.038-.015.035-.012.034-.015.035-.016.038-.015.034-.011.035-.016.034-.015.035-.012.038-.015.034-.015.035-.012.034-.015.035-.016.038-.015.034-.012.035-.015.034-.015.038-.012.035-.015.034h.649l-.015-.034zm1.207 1.144h-.753l-.016-.034-.011-.035-.016-.034-.015-.038-.011-.034-.016-.035-.015-.034-.012-.034-.015-.035-.016-.034-.011-.034-.015-.039-.016-.034-.011-.034-.016-.035H7.07l-.015.035-.012.034-.015.034-.016.039-.011.034-.016.034-.015.035-.012.034-.015.034-.015.035-.012.034-.015.038-.016.034-.011.035-.016.034h-.776l.015-.034.015-.035.016-.034.015-.038.012-.034.015-.035.016-.034.015-.034.015-.035.016-.038.015-.034.015-.035.012-.034.015-.034.016-.035.015-.038.016-.034.015-.034.015-.035.016-.034.011-.034.015-.039.016-.034.015-.034.016-.035.015-.034.016-.034.015-.038.011-.035.016-.034.015-.034.015-.035.016-.034.015-.038.016-.034.015-.035.012-.034.015-.034.015-.035.016-.038.015-.034.015-.035.016-.034.015-.034.012-.035.015-.034.016-.038.015-.034.015-.035.016-.034.015-.034.015-.035.012-.038.015-.034.016-.034.015-.035.015-.034.016-.034.015-.039.016-.034.011-.034.016-.035.015-.034.015-.034.016-.038.015-.035.015-.034.016-.034.011-.035.016-.034.015-.038.016-.035.015-.034.015-.034.016-.035.015-.034.012-.038.015-.034.015-.035.016-.034h.711l.015.034.016.035.015.034.015.038.012.034.015.035.016.034.015.034.016.035.015.038.015.034.016.035.011.034.016.034.015.035.015.038.016.034.015.034.016.035.015.034.011.034.016.039.015.034.015.034.016.035.015.034.016.034.015.038.012.035.015.034.015.034.016.035.015.034.015.038.016.034.015.035.012.034.015.034.016.035.015.034.015.038.016.035.015.034.015.034.012.035.015.034.016.038.015.034.015.035.016.034.015.034.016.035.011.038.015.034.016.034.015.035.015.034.016.034.015.039.016.034.011.034.016.035.015.034.015.034.016.038.015.035.016.034.015.034.011.035.016.034.015.038.016.035.015.034.015.034.016.035.015.034.012.038.015.034.015.035.016.034h-.039zM5.77 17.06l-.03.023-.028.02-.03.022-.031.02-.03.022-.032.02-.03.018-.035.02-.035.018-.034.02-.035.015-.034.019-.039.015-.034.015-.039.015-.034.016-.035.011-.035.012-.034.011-.039.011-.034.012-.039.008-.034.007-.039.008-.038.007-.039.004-.042.004-.038.004-.043.004-.038.004-.043.003h-.165l-.038-.003-.043-.004-.038-.004-.038-.004-.039-.004-.038-.007-.039-.008-.034-.008-.039-.007-.035-.012-.038-.007-.035-.012-.034-.015-.035-.012-.038-.015-.035-.015-.034-.015-.035-.016-.035-.019-.03-.018-.035-.02-.03-.019-.031-.019-.031-.023-.031-.022-.03-.023-.028-.023-.027-.023-.027-.027-.026-.023-.027-.026-.027-.027-.023-.027-.023-.03-.024-.027-.019-.03-.023-.031-.019-.03-.02-.031-.018-.035-.02-.03-.015-.034-.015-.035-.016-.034-.015-.034-.012-.03-.015-.035-.008-.035-.011-.034-.008-.038-.012-.034-.007-.039-.004-.034-.008-.038-.004-.034-.004-.038-.003-.039-.004-.038v-.126l.004-.042v-.038l.003-.038.004-.042.008-.038.004-.038.008-.034.011-.038.008-.039.011-.034.012-.038.011-.034.016-.039.015-.034.016-.034.015-.035.015-.034.02-.034.019-.03.019-.031.02-.03.019-.031.022-.03.024-.031.023-.03.023-.028.027-.026.023-.027.027-.027.027-.026.026-.023.031-.027.027-.023.03-.023.032-.019.03-.023.031-.019.03-.019.035-.019.035-.02.035-.018.034-.015.035-.016.038-.019.031-.011.038-.012.035-.015.035-.008.034-.011.039-.008.034-.011.039-.008.038-.004.039-.007.038-.004.039-.004.038-.004.039-.003h.165l.042.003.043.004h.038l.038.004.043.008.034.003.039.008.038.008.035.007.034.008.035.008.035.011.034.008.03.011.036.012.034.015.035.015.034.015.035.02.035.015.03.019.035.019.03.019.035.019.031.023.03.019.032.023.03.023.031.026.03.023-.022.03-.027.028-.023.03-.027.03-.023.031-.023.027-.027.03-.023.03-.023.028-.027.03-.023.03-.027.031-.023.027-.023.03-.027.03-.023.031-.027.027-.023.03-.031-.022-.03-.027-.032-.019-.03-.023-.031-.019-.03-.02-.032-.018-.034-.02-.031-.014-.03-.016-.032-.011-.034-.012-.035-.011-.034-.008-.039-.007-.038-.008-.039-.004-.042-.004-.042-.003h-.081l-.038.003-.035.004-.038.008-.035.008-.035.01-.034.012-.035.016-.034.015-.031.019-.03.02-.032.018-.027.023-.027.023-.026.023-.024.026-.026.027-.024.03-.019.027-.019.031-.02.034-.018.03-.016.035-.011.034-.016.035-.011.038-.008.038-.008.034-.007.042-.004.038-.004.038v.088l.004.038.004.035.003.038.008.034.008.035.008.034.011.034.012.03.015.039.015.034.02.035.019.03.02.03.022.031.023.027.027.027.023.026.027.023.031.023.03.023.031.019.031.019.035.015.034.016.035.015.038.011.039.012.038.007.039.008.038.004.042.004h.089l.042-.004.043-.004.038-.004.038-.007.039-.008.038-.012.035-.007.034-.015.031-.016.035-.015.027-.015.03-.02v-.346h-.56v-.557h1.268v1.239l-.027.023zM4.534 8.355v2.77h1.759v1.273H3.119V3.21h3.147v1.273H4.534v2.6H6.2v1.273H4.534zm11.935.276h1.389v2.14c0 1.142-.569 1.706-1.72 1.706h-.7c-1.15 0-1.72-.564-1.72-1.707V4.837c0-1.142.57-1.707 1.72-1.707h.687c1.15 0 1.706.552 1.706 1.694V6.7h-1.388V4.902c0-.367-.172-.538-.53-.538h-.237c-.37 0-.543.17-.543.538v5.803c0 .368.172.538.543.538h.264c.357 0 .53-.17.53-.538V8.631zm-4.914 3.767v-9.19h1.415v9.19h-1.415zM9.502 7.292v-2.31c0-.368-.172-.539-.53-.539h-.581V7.83h.582c.357 0 .529-.17.529-.538zm-.304-4.083c1.15 0 1.719.564 1.719 1.707v2.441c0 1.142-.569 1.707-1.72 1.707h-.806v3.334H6.976v-9.19h2.222zM6.457 20.707h8.1l-4.134 1.347-3.966-1.347z"
                            fill="currentColor"
                            fill-rule="evenodd"
                          ></path>
                        </svg>
                      );
                    }
                    if (storeId === 1) {
                      storeName = "Steam";
                      storeImg = (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 22 22"
                        >
                          <path
                            fill="currentColor"
                            d="M.028 10.277a21.629 21.629 0 00-.004-.008C.399 4.535 5.148 0 10.954 0c6.048 0 10.952 4.925 10.952 11s-4.904 11-10.953 11C6.015 22 1.84 18.719.473 14.208l4.147 1.719c.21.937.85 1.76 1.795 2.155a3.034 3.034 0 003.971-1.643c.167-.406.245-.832.234-1.257l3.835-2.752.094.001c2.295 0 4.16-1.879 4.16-4.186 0-2.308-1.865-4.185-4.16-4.185-2.294 0-4.16 1.877-4.16 4.185v.054l-2.68 3.91c-.434-.02-.87.057-1.282.228a2.976 2.976 0 00-.513.272L.028 10.276v.001zm9.718 5.892a2.342 2.342 0 01-3.065 1.27 2.334 2.334 0 01-1.206-1.156l1.354.564c.88.368 1.89-.051 2.256-.935a1.74 1.74 0 00-.929-2.27l-1.4-.582a2.331 2.331 0 012.993 1.305 2.355 2.355 0 01-.003 1.804zm4.803-5.135a2.784 2.784 0 01-2.771-2.789 2.784 2.784 0 012.771-2.788 2.784 2.784 0 012.773 2.788 2.784 2.784 0 01-2.773 2.789zm-2.077-2.793c0 1.157.933 2.094 2.082 2.094 1.15 0 2.082-.937 2.082-2.094a2.09 2.09 0 00-2.082-2.096 2.09 2.09 0 00-2.082 2.096z"
                          ></path>
                        </svg>
                      );
                    }
                    if (storeId === 2) {
                      storeName = "Xbox Store";
                      storeImg = (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          width={20}
                          height={20}
                        >
                          <path
                            fill="currentColor"
                            d="M3.564 1.357l-.022.02c.046-.048.11-.1.154-.128C4.948.435 6.396 0 8 0c1.502 0 2.908.415 4.11 1.136.086.052.324.215.446.363C11.4.222 7.993 2.962 7.993 2.962c-1.177-.908-2.26-1.526-3.067-1.746-.674-.185-1.14-.03-1.362.141zm10.305 1.208c-.035-.04-.074-.076-.109-.116-.293-.322-.653-.4-.978-.378-.295.092-1.66.584-3.342 2.172 0 0 1.894 1.841 3.053 3.723 1.159 1.883 1.852 3.362 1.426 5.415A7.969 7.969 0 0016 7.999a7.968 7.968 0 00-2.13-5.434zM10.98 8.77a55.416 55.416 0 00-2.287-2.405 52.84 52.84 0 00-.7-.686l-.848.854c-.614.62-1.411 1.43-1.853 1.902-.787.84-3.043 3.479-3.17 4.958 0 0-.502-1.174.6-3.88.72-1.769 2.893-4.425 3.801-5.29 0 0-.83-.913-1.87-1.544l-.007-.002s-.011-.009-.03-.02c-.5-.3-1.047-.53-1.573-.56a1.391 1.391 0 00-.878.431A8 8 0 0013.92 13.381c0-.002-.169-1.056-1.245-2.57-.253-.354-1.178-1.46-1.696-2.04z"
                          />
                        </svg>
                      );
                    }
                    if (storeId === 7) {
                      storeName = "Xbox 360 Store";
                      storeImg = (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          width={20}
                          height={20}
                        >
                          <path
                            fill="currentColor"
                            d="M3.564 1.357l-.022.02c.046-.048.11-.1.154-.128C4.948.435 6.396 0 8 0c1.502 0 2.908.415 4.11 1.136.086.052.324.215.446.363C11.4.222 7.993 2.962 7.993 2.962c-1.177-.908-2.26-1.526-3.067-1.746-.674-.185-1.14-.03-1.362.141zm10.305 1.208c-.035-.04-.074-.076-.109-.116-.293-.322-.653-.4-.978-.378-.295.092-1.66.584-3.342 2.172 0 0 1.894 1.841 3.053 3.723 1.159 1.883 1.852 3.362 1.426 5.415A7.969 7.969 0 0016 7.999a7.968 7.968 0 00-2.13-5.434zM10.98 8.77a55.416 55.416 0 00-2.287-2.405 52.84 52.84 0 00-.7-.686l-.848.854c-.614.62-1.411 1.43-1.853 1.902-.787.84-3.043 3.479-3.17 4.958 0 0-.502-1.174.6-3.88.72-1.769 2.893-4.425 3.801-5.29 0 0-.83-.913-1.87-1.544l-.007-.002s-.011-.009-.03-.02c-.5-.3-1.047-.53-1.573-.56a1.391 1.391 0 00-.878.431A8 8 0 0013.92 13.381c0-.002-.169-1.056-1.245-2.57-.253-.354-1.178-1.46-1.696-2.04z"
                          />
                        </svg>
                      );
                    }
                    if (storeId === 6) {
                      storeName = "Nintendo Store";
                      storeImg = (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 21 16"
                          width={20}
                          height={20}
                        >
                          <path
                            fill="currentColor"
                            fill-rule="evenodd"
                            d="M8 0h5a8 8 0 110 16H8A8 8 0 118 0zm-.135 1.935a6.065 6.065 0 000 12.13h5.12a6.065 6.065 0 000-12.13h-5.12zm-1.33 2.304h2.401l3.199 5.175V4.24h2.346v7.495H12.18L8.864 6.537v5.201H6.53l.005-7.499z"
                          />
                        </svg>
                      );
                    }
                    if (storeId === 5) {
                      storeName = "Gog";
                      storeImg = (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 23"
                        >
                          <g fill="none" fill-rule="evenodd">
                            <rect
                              width="23"
                              height="22"
                              x=".5"
                              y=".5"
                              stroke="currentColor"
                              rx="2"
                            ></rect>
                            <path
                              fill="currentColor"
                              fill-rule="nonzero"
                              d="M21.148 11.039c0 .56-.455 1.012-1.013 1.012h-4.348v-1.305h3.665a.39.39 0 00.39-.39V6.044a.39.39 0 00-.39-.39h-1.969a.39.39 0 00-.388.39v1.962c0 .216.174.39.388.39h1.573v1.305H16.8c-.56 0-1.014-.452-1.014-1.011V5.362c0-.559.453-1.012 1.014-1.012h3.334c.558 0 1.013.453 1.013 1.012v5.677zm-.004 7.57h-1.288v-3.987h-.905a.382.382 0 00-.383.384v3.602H17.28v-3.986h-.906a.383.383 0 00-.383.384v3.606h-1.288V14.33c0-.548.446-.995.999-.995h5.442v5.273zM13.73 9.7h-3.335c-.56 0-1.013-.452-1.013-1.011V5.362c0-.559.453-1.012 1.013-1.012h3.335c.558 0 1.012.453 1.012 1.012V8.69c0 .559-.454 1.011-1.012 1.011zm-.682-4.046h-1.97a.389.389 0 00-.39.39v1.961c0 .216.174.39.39.39h1.969a.385.385 0 00.385-.39V6.044a.385.385 0 00-.385-.39zm.624 11.957c0 .55-.447.996-.998.996H9.388a.997.997 0 01-.999-.996V14.33a.997.997 0 011-.995h3.284c.55 0 .998.446.998.995v3.28zm-1.67-2.99h-1.94a.383.383 0 00-.384.384v1.932c0 .211.171.385.384.385l.004-.003v.003h1.932v-.003l.004.003a.384.384 0 00.382-.385v-1.932a.382.382 0 00-.382-.384zm-3.665-3.583c0 .56-.455 1.012-1.014 1.012H2.975v-1.305H6.64a.389.389 0 00.389-.39V6.044a.389.389 0 00-.39-.39H4.67a.389.389 0 00-.388.39v1.962c0 .216.173.39.388.39h1.574v1.305H3.988c-.56 0-1.013-.452-1.013-1.011V5.362c0-.559.453-1.012 1.013-1.012h3.334c.56 0 1.014.453 1.014 1.012v5.677zm-.978 3.583H4.65a.383.383 0 00-.383.384v1.932c0 .212.17.386.383.386h2.708v1.288h-3.38v-.004c-.552 0-1-.446-1-.997v-3.28a.998.998 0 011-.995h3.38v1.286z"
                            ></path>
                          </g>
                        </svg>
                      );
                    }
                    if (storeId === 4) {
                      storeName = "App Store";
                      storeImg = (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 23 20"
                        >
                          <g fill="currentColor">
                            <path d="M8.493 12.576c1.463 0 2.74-.02 4.014.004 1.322.028 2.231.946 2.195 2.133-.016.473-.17.717-.708.713-4.11-.016-8.217-.004-12.328-.024-1.04-.004-1.682-.605-1.666-1.447.012-.806.692-1.367 1.706-1.379.906-.012 1.815-.032 2.72 0 .518.02.85-.164 1.1-.6a775.913 775.913 0 013.994-6.85c.218-.373.17-.658-.012-1.027-.376-.75-1.035-1.334-1.237-2.18-.198-.822.044-1.491.63-1.76.776-.348 1.455-.124 1.985.662.174.26.335.533.525.841.38-.204.461-.593.667-.873.55-.758 1.322-.998 1.993-.593.703.424.914 1.194.445 2.012-1.718 2.994-3.468 5.971-5.207 8.953-.242.417-.477.826-.816 1.415z"></path>
                            <path d="M13.61 5.45c.805 1.37 1.56 2.661 2.312 3.956.558.958 1.112 1.916 1.65 2.882.161.292.412.284.683.284.986 0 1.972-.012 2.959.008 1.07.024 1.774.622 1.746 1.447-.024.826-.68 1.355-1.726 1.379-.53.012-1.06.004-1.775.004.457.798.845 1.475 1.233 2.148.23.397.42.806.332 1.275-.097.5-.392.85-.882 1.042-.529.204-1.002.1-1.414-.249a2.147 2.147 0 01-.449-.553c-1.783-3.018-3.65-5.992-5.271-9.098-.792-1.499-.574-3.299.602-4.525zM1.888 18.88c.049-1.25.683-2.003 1.261-2.72.457-.566 2.292-.085 2.656.585.13.24 0 .404-.101.58-.38.662-.72 1.351-1.156 1.973-.368.52-.918.845-1.593.617-.594-.192-1.156-.477-1.067-1.034z"></path>
                          </g>
                        </svg>
                      );
                    }
                    if (storeId === 8) {
                      storeName = "Google Play";
                      storeImg = (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 18 20"
                        >
                          <path
                            fill="currentColor"
                            d="M16.9 8.09L3.354.29a2.173 2.173 0 00-2.178.007A2.208 2.208 0 00.088 2.198v15.603c0 .78.416 1.51 1.087 1.901a2.171 2.171 0 002.178.008L16.9 11.908a2.206 2.206 0 000-3.817zm-5.87-1.844l-1.86 2.61-4.45-6.243 6.31 3.633zM2.185 18.658a.847.847 0 01-.346-.109.87.87 0 01-.428-.748V2.198a.856.856 0 01.772-.86L8.355 10l-6.17 8.658zm2.536-1.272l4.449-6.243 1.86 2.61-6.31 3.633zm11.523-6.635l-4.059 2.337L9.985 10l2.2-3.088 4.059 2.337a.868.868 0 010 1.502z"
                          ></path>
                        </svg>
                      );
                    }

                    const storeNameAndImage = () => {
                      return (
                        <div className="flex h-full items-center justify-center gap-2">
                          <p>{storeName}</p>
                          {storeImg}
                        </div>
                      );
                    };

                    return (
                      <a
                        key={gameStore.id}
                        href={gameStore.url}
                        target="_blank"
                        rel="noreferrer nooponer"
                        className="rounded-sm bg-secondary px-4 py-2 text-center text-sm text-textSecondary transition-all duration-300 hover:bg-primary hover:text-secondaryLighter lg:text-base"
                      >
                        {storeNameAndImage()}
                      </a>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
