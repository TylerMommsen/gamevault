import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function Loading() {
  const catalogLoadingContent = () => {
    let skeletons = [];
    for (let i = 0; i < 20; i++) {
      skeletons.push(
        <Skeleton
          key={i}
          className="flex max-w-[440px] flex-col bg-secondary lg:w-auto"
        >
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

          <p className="text-2xl font-bold text-transparent">Placeholder</p>
          <p className="min-h-[64px] text-2xl font-bold text-transparent">
            Placeholder
          </p>
          <p className="text-2xl font-bold text-transparent">Placeholder</p>
        </Skeleton>,
      );
    }

    return skeletons;
  };

  return (
    <div className="grid place-items-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {catalogLoadingContent()}
    </div>
  );
}
