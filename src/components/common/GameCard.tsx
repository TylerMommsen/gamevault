import React from "react";
import Image from "next/image";
import GamePlatforms from "@/components/common/GamePlatforms";

interface GameCardProps {
  id: number;
  image: string;
  name: string;
  parentPlatforms: ParentPlatform[];
}

export default function GameCard({
  id,
  image,
  name,
  parentPlatforms,
}: GameCardProps) {
  return (
    <div
      id="game-card"
      className="flex max-w-[440px] flex-col rounded-2xl bg-secondary text-primary lg:w-auto"
    >
      <div className="relative w-full">
        <Image
          src={image}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            aspectRatio: "16 / 9",
          }}
          width={640}
          height={360}
          alt={`${name} image`}
          className="rounded-t-2xl"
        />
      </div>

      <div className="flex flex-col gap-2 p-4">
        <div className="flex gap-4 text-textSecondary">
          <GamePlatforms parentPlatforms={parentPlatforms} />
        </div>

        <h3 className="text-2xl font-bold">{name}</h3>

        <div className="flex h-[32px] items-center gap-2 text-xl">
          <button className="relative h-full rounded-sm bg-secondaryLighter px-2">
            &#43;
          </button>

          <button className="relative h-full rounded-sm bg-secondaryLighter px-2">
            <div className="relative h-full px-2">
              <Image
                src={"/gift-icon.svg"}
                layout="fill"
                objectFit="contain"
                alt="ellipsis icon"
              />
            </div>
          </button>

          <button className="relative h-full rounded-sm bg-secondaryLighter px-2">
            <div className="relative h-full px-2">
              <Image
                src={"/horizontal-ellipsis-icon.svg"}
                layout="fill"
                objectFit="contain"
                alt="ellipsis icon"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
