"use client";

import NavSelections from "@/components/NavSelections";
import Catalog from "@/components/Catalog";

export default function DiscoverGames({
  params,
}: {
  params: { discover: string };
}) {
  const urlSlug = params.discover;

  return (
    <main className="min-h-screen bg-background pt-16 text-textNormal">
      <div className="mx-auto block max-w-[1920px] p-4 lg:flex lg:gap-8">
        <div className="hidden h-full min-w-fit lg:block">
          <NavSelections />
        </div>

        <Catalog urlSlug={urlSlug} />
      </div>
    </main>
  );
}