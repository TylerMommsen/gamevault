"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NavSelections from "../NavSelections";
import { Command, CommandInput } from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { useCatalog } from "@/contexts/CatalogContext";

export default function Header() {
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  const { filters, setFilters } = useCatalog();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchEnter = (e: any) => {
    if (e.key === "Enter") {
      setFilters({ ...filters, setFilters: { searchInput } });
      router.push(`/search/${searchInput}`);
    }
  };

  return (
    <header
      className={`fixed z-50 flex w-screen justify-center ${isScrolled ? "bg-background" : null} transition-all duration-300`}
    >
      <div className="flex w-full max-w-[1920px] items-center justify-between p-4 text-primary">
        <Link href="/" className="text-2xl font-bold">
          GameVault
        </Link>

        <Command
          className="w-[50%] self-center rounded-full border-none bg-secondary outline-none"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchInput(e.target.value)
          }
          onKeyDown={handleSearchEnter}
        >
          <CommandInput placeholder="Search..." />
        </Command>

        <div className="hidden gap-4 lg:flex">
          <Link href={"/collection"}>
            <p className="hidden hover:underline lg:block">Collection</p>
          </Link>
          <Link href={"/wishlist"}>
            <p className="hidden hover:underline lg:block">Wishlist</p>
          </Link>
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger className="text-2xl">&#9776;</SheetTrigger>
            <SheetContent className="z-[101] overflow-y-scroll border-transparent">
              <NavSelections />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
