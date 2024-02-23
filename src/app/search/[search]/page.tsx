"use client";

import NavSelections from "@/components/NavSelections";
import Catalog from "@/components/Catalog";

export default function SearchGames({
  params,
}: {
  params: { search: string };
}) {
  const urlSlug = params.search;

  return (
    <main className="min-h-screen w-screen bg-background pt-24 text-textNormal">
      <div className="mx-auto block max-w-[1920px] p-4 lg:flex lg:gap-12">
        <div className="hidden h-full min-w-fit lg:block">
          <NavSelections />
        </div>

        <Catalog urlSlug={urlSlug} />
      </div>
    </main>
  );
}
