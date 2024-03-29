"use client";

import React, { useState } from "react";
import Image from "next/image";
import GamePlatforms from "@/components/common/GamePlatforms";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useUser } from "@/contexts/UserContext";

interface GameCardProps {
  id: number;
  image: string;
  name: string;
  parentPlatforms: ParentPlatform[];
  game: GameResultsData;
}

export default function GameCard({
  id,
  image,
  name,
  parentPlatforms,
  game,
}: GameCardProps) {
  const [imgSrc, setImgSrc] = useState<string>(image);
  const [imgFailed, setImgFailed] = useState<boolean>(false);

  const {
    gameCollection,
    gameWishlist,
    addToCollection,
    addToWishlist,
    removeFromCollection,
    removeFromWishlist,
  } = useUser();

  const isGameInCollection = gameCollection.some(
    (g: GameResultsData) => g.id === game.id,
  );
  const isGameInWishlist = gameWishlist.some(
    (g: GameResultsData) => g.id === game.id,
  );

  const handleImgErr = () => {
    setImgSrc("/android-icon.svg"); // just placeholder to maintain sizing, opacity will be 0
    setImgFailed(true);
  };

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    btn: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (btn === "addToCollection") {
      if (isGameInCollection) {
        removeFromCollection(id);
      } else {
        addToCollection(game);
      }
    } else if (btn === "addToWishlist") {
      if (isGameInWishlist) {
        removeFromWishlist(id);
      } else {
        addToWishlist(game);
      }
    }
  };

  return (
    <div
      id="game-card"
      className="before-gradient-border relative z-[0] flex max-w-[440px] flex-col rounded-2xl bg-secondary text-primary lg:w-auto"
    >
      <div className="relative w-full">
        <Image
          src={imgSrc}
          style={{
            objectFit: "cover",
            aspectRatio: "16 / 9",
          }}
          width={640}
          height={360}
          alt={`${name} image`}
          className={`rounded-t-2xl ${imgFailed ? "opacity-0" : null}`}
          onError={handleImgErr}
        />
      </div>

      <div className="z-[0] flex w-auto flex-col gap-2 rounded-b-2xl bg-secondary p-4">
        <div className="flex gap-4 text-textSecondary">
          <GamePlatforms parentPlatforms={parentPlatforms} />
        </div>

        <h3 className="min-h-[64px] text-2xl font-bold">{name}</h3>

        <div className="flex h-[32px] items-center gap-2 text-xl">
          <button
            className={`${isGameInCollection ? "bg-green-500 text-primary" : "bg-secondaryLighter hover:bg-primary hover:text-secondaryLighter"} relative h-full rounded-sm px-2 transition-all duration-300 `}
            onClick={(e) => handleButtonClick(e, "addToCollection")}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M4 12H20M12 4V20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </button>

          <button
            className={`${isGameInWishlist ? "bg-green-500 text-primary" : "bg-secondaryLighter hover:bg-primary hover:text-secondaryLighter"} relative h-full rounded-sm px-2 transition-all duration-300`}
            onClick={(e) => handleButtonClick(e, "addToWishlist")}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffff"
              width={20}
              height={20}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M12 7V20M12 7H8.46429C7.94332 7 7.4437 6.78929 7.07533 6.41421C6.70695 6.03914 6.5 5.53043 6.5 5C6.5 4.46957 6.70695 3.96086 7.07533 3.58579C7.4437 3.21071 7.94332 3 8.46429 3C11.2143 3 12 7 12 7ZM12 7H15.5357C16.0567 7 16.5563 6.78929 16.9247 6.41421C17.293 6.03914 17.5 5.53043 17.5 5C17.5 4.46957 17.293 3.96086 16.9247 3.58579C16.5563 3.21071 16.0567 3 15.5357 3C12.7857 3 12 7 12 7ZM5 12H19V17.8C19 18.9201 19 19.4802 18.782 19.908C18.5903 20.2843 18.2843 20.5903 17.908 20.782C17.4802 21 16.9201 21 15.8 21H8.2C7.07989 21 6.51984 21 6.09202 20.782C5.71569 20.5903 5.40973 20.2843 5.21799 19.908C5 19.4802 5 18.9201 5 17.8V12ZM4.6 12H19.4C19.9601 12 20.2401 12 20.454 11.891C20.6422 11.7951 20.7951 11.6422 20.891 11.454C21 11.2401 21 10.9601 21 10.4V8.6C21 8.03995 21 7.75992 20.891 7.54601C20.7951 7.35785 20.6422 7.20487 20.454 7.10899C20.2401 7 19.9601 7 19.4 7H4.6C4.03995 7 3.75992 7 3.54601 7.10899C3.35785 7.20487 3.20487 7.35785 3.10899 7.54601C3 7.75992 3 8.03995 3 8.6V10.4C3 10.9601 3 11.2401 3.10899 11.454C3.20487 11.6422 3.35785 11.7951 3.54601 11.891C3.75992 12 4.03995 12 4.6 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="relative h-full rounded-sm bg-secondaryLighter px-2 transition-all duration-300 hover:bg-primary hover:text-secondaryLighter">
              <svg
                fill="currentColor"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                width={20}
                height={20}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <title>ionicons-v5-f</title>
                  <circle cx="256" cy="256" r="48"></circle>
                  <circle cx="416" cy="256" r="48"></circle>
                  <circle cx="96" cy="256" r="48"></circle>
                </g>
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-primary text-textDark"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <DropdownMenuLabel className="text-xl">
                Quick Rating
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-base hover:bg-secondary hover:text-primary">
                <div className="flex items-center justify-center gap-2">
                  <Image
                    src="/exceptional-icon.png"
                    width={28}
                    height={28}
                    alt="exceptional rating icon"
                  />
                  <p>Exceptional</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-base hover:bg-secondary hover:text-primary">
                <div className="flex items-center justify-center gap-2">
                  <Image
                    src="/recommended-icon.png"
                    width={24}
                    height={24}
                    alt="recommended rating icon"
                  />
                  <p>Recommended</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-base hover:bg-secondary hover:text-primary">
                <div className="flex items-center justify-center gap-2">
                  <Image
                    src="/meh-icon.webp"
                    width={24}
                    height={24}
                    alt="meh rating icon"
                  />
                  <p>Meh</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-base hover:bg-secondary hover:text-primary">
                <div className="flex items-center justify-center gap-2">
                  <Image
                    src="/skip-icon.png"
                    width={24}
                    height={24}
                    alt="skip rating icon"
                  />
                  <p>Skip</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
