"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import ResourceLoader from "@/lib/ResourceLoader";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MobileMenu from "../common/NavSelections";

import { Command, CommandInput } from "@/components/ui/command";

import { GameDataContext } from "../../contexts/GameDataProvider";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  const { fetchGameData } = useContext(GameDataContext);

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
      fetchGameData(searchInput);
    }
  };

  return (
    <header
      className={`fixed z-[100] flex w-screen justify-center ${isScrolled ? "bg-background" : null} transition-all duration-300`}
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

        <p>My Collection</p>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger className="text-2xl">&#9776;</SheetTrigger>
            <SheetContent className="overflow-y-scroll border-transparent">
              <MobileMenu />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
