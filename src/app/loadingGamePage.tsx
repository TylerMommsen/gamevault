import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function LoadingGamePage() {
  return (
    <>
      <div className="z-[100] mx-auto flex max-w-[500px] flex-col items-center gap-4 p-4 text-center lg:w-auto lg:flex-auto lg:items-start lg:text-start">
        <Skeleton className="bg-secondary">
          <p className="text-transparent">Game Name Nav</p>
        </Skeleton>

        <div className="flex gap-4 text-textSecondary">
          <Skeleton className="h-[20px] w-[20px] bg-secondary" />
          <Skeleton className="h-[20px] w-[20px] bg-secondary" />
          <Skeleton className="h-[20px] w-[20px] bg-secondary" />
          <Skeleton className="h-[20px] w-[20px] bg-secondary" />
        </div>

        <Skeleton className="w-[50%] bg-secondary">
          <p className="text-transparent">Average Playtime: 10 Hours</p>
        </Skeleton>

        <Skeleton className="h-[100px] w-full bg-secondary">
          <p className="text-transparent">Name</p>
        </Skeleton>

        <div className="max-w-screen lg:hidden">
          <Skeleton className="h-[100px] w-[200px] bg-secondary">
            <p className="text-transparent">Carousel</p>
          </Skeleton>
        </div>

        <Skeleton className="h-[100px] w-full bg-secondary px-6 py-2 ">
          <p className="text-transparent">Add to my collection</p>
        </Skeleton>

        <div className="mt-8 flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-[100px] w-[200px] bg-secondary">
              <p className="text-transparent">Ratings</p>
            </Skeleton>
          </div>

          <Skeleton className="h-[150px] w-full bg-secondary">
            <p className="text-transparent">About</p>
          </Skeleton>

          <div className="grid grid-cols-2 gap-8 text-start">
            <Skeleton className="h-[100px] w-[200px] bg-secondary">
              <p className="text-transparent">Platforms</p>
            </Skeleton>
            <Skeleton className="h-[100px] w-[200px] bg-secondary">
              <p className="text-transparent">Metascore</p>
            </Skeleton>
            <Skeleton className="h-[100px] w-[200px] bg-secondary">
              <p className="text-transparent">Genre</p>
            </Skeleton>
            <Skeleton className="h-[100px] w-[200px] bg-secondary">
              <p className="text-transparent">Release date</p>
            </Skeleton>
            <Skeleton className="h-[100px] w-[200px] bg-secondary">
              <p className="text-transparent">Developers</p>
            </Skeleton>
            <Skeleton className="h-[100px] w-[200px] bg-secondary">
              <p className="text-transparent">Publishers</p>
            </Skeleton>
          </div>

          <Skeleton className="h-[100px] w-[200px] bg-secondary">
            <p className="text-transparent">Age rating</p>
          </Skeleton>

          <Skeleton className="h-[100px] w-[200px] bg-secondary">
            <p className="text-transparent">Tags</p>
          </Skeleton>

          <Skeleton className="h-[100px] w-[200px] bg-secondary">
            <p className="text-transparent">Website</p>
          </Skeleton>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Skeleton className="flex flex-col bg-secondary">
          <div className="relative w-full">
            <Image
              src={"/android-icon.svg"}
              style={{
                objectFit: "cover",
                aspectRatio: "16 / 9",
              }}
              width={640}
              height={360}
              alt={`placeholder image`}
              className="rounded-t-2xl bg-transparent opacity-0"
            />
          </div>
        </Skeleton>

        <div className="hidden aspect-video gap-2 lg:grid lg:grid-cols-2">
          <Skeleton className="flex max-w-[440px] flex-col bg-secondary lg:w-auto">
            <div className="relative w-full">
              <Image
                src={"/android-icon.svg"}
                style={{
                  objectFit: "cover",
                  aspectRatio: "16 / 9",
                }}
                width={640}
                height={360}
                alt={`placeholder image`}
                className="rounded-t-2xl bg-transparent opacity-0"
              />
            </div>
          </Skeleton>
          <Skeleton className="flex max-w-[440px] flex-col bg-secondary lg:w-auto">
            <div className="relative w-full">
              <Image
                src={"/android-icon.svg"}
                style={{
                  objectFit: "cover",
                  aspectRatio: "16 / 9",
                }}
                width={640}
                height={360}
                alt={`placeholder image`}
                className="rounded-t-2xl bg-transparent opacity-0"
              />
            </div>
          </Skeleton>
          <Skeleton className="flex max-w-[440px] flex-col bg-secondary lg:w-auto">
            <div className="relative w-full">
              <Image
                src={"/android-icon.svg"}
                style={{
                  objectFit: "cover",
                  aspectRatio: "16 / 9",
                }}
                width={640}
                height={360}
                alt={`placeholder image`}
                className="rounded-t-2xl bg-transparent opacity-0"
              />
            </div>
          </Skeleton>
          <Skeleton className="flex max-w-[440px] flex-col bg-secondary lg:w-auto">
            <div className="relative w-full">
              <Image
                src={"/android-icon.svg"}
                style={{
                  objectFit: "cover",
                  aspectRatio: "16 / 9",
                }}
                width={640}
                height={360}
                alt={`placeholder image`}
                className="rounded-t-2xl bg-transparent opacity-0"
              />
            </div>
          </Skeleton>
        </div>

        <div className="grid w-full grid-cols-2 flex-wrap gap-2">
          <Skeleton className="h-[50px] w-full bg-secondary">
            <p className="text-transparent">Game Store</p>
          </Skeleton>
          <Skeleton className="h-[50px] w-full bg-secondary">
            <p className="text-transparent">Game Store</p>
          </Skeleton>
          <Skeleton className="h-[50px] w-full bg-secondary">
            <p className="text-transparent">Game Store</p>
          </Skeleton>
          <Skeleton className="h-[50px] w-full bg-secondary">
            <p className="text-transparent">Game Store</p>
          </Skeleton>
        </div>
      </div>
    </>
  );
}
