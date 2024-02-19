'use client';

import Image from 'next/image';
import ResourceLoader from '@/lib/ResourceLoader';
import { useEffect, useState } from 'react';
import GameCard from '@/components/common/GameCard';
import Link from 'next/link';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import getFetchUrl from '@/lib/getFetchUrl';
import NavSelections from '@/components/common/NavSelections';

export default function Home() {
	const [gameList, setGameList] = useState<GameList>(); // object parent of gameResults
	const [gameResults, setGameResults] = useState<GameResultsData[]>([]); // contains array of game results
	const [sortOption, setSortOption] = useState<string>('');
	const [platform, setPlatform] = useState<string>('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await ResourceLoader(getFetchUrl(''));

				setGameList(data);
				setGameResults(data.results);
			} catch (error) {
				console.error('Failed to fetch market data', error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		const updateGames = () => {
			let updatedGames = gameList?.results || [];

			if (platform) {
				updatedGames = updatedGames.filter((game) =>
					game.parent_platforms.some((p) => p.platform.name === platform)
				);
			}

			if (sortOption === 'release date') {
				updatedGames.sort((a, b) => {
					const dataA = new Date(a.released).getTime();
					const dateB = new Date(b.released).getTime();
					return dateB - dataA;
				});
			} else if (sortOption === 'name') {
				updatedGames.sort((a, b) => a.name.localeCompare(b.name));
			} else if (sortOption === 'popularity') {
				updatedGames.sort((a, b) => b.added - a.added);
			} else if (sortOption === 'average rating') {
				updatedGames.sort((a, b) => b.rating - a.rating);
			} else if (sortOption === 'relevance') {
			}

			setGameResults(updatedGames);
		};

		updateGames();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortOption, platform]);

	const handleSortChange = (value: string) => {
		setSortOption(value);
	};

	const handlePlatformChange = (value: string) => {
		setPlatform(value);
	};

	const pageContent = (
		<>
			{gameResults?.map((game: GameResultsData, index) => {
				const gameSlug = encodeURIComponent(game.slug);
				return (
					<Link href={`/games/${gameSlug}`} key={game.id} passHref>
						<GameCard
							key={game.id}
							id={game.id}
							image={game.background_image}
							name={game.name}
							parentPlatforms={game.parent_platforms}
						/>
					</Link>
				);
			})}
		</>
	);

	return (
		<main className="bg-background text-textNormal min-h-screen pt-16">
			<div className="block lg:flex lg:gap-8 max-w-[1920px] mx-auto p-4">
				<div className="hidden lg:block h-full min-w-fit">
					<NavSelections />
				</div>
				<div className="flex flex-col gap-4 p-4 max-w-[1920px] mx-auto">
					<div className="flex flex-col justify-center items-center lg:items-start lg:gap-4 mb-4">
						<h1 className="font-bold text-4xl lg:text-6xl">Top Picks</h1>
						<p className="text-textSecondary">Based on your ratings</p>
					</div>

					<div className="grid grid-cols-2 gap-2 w-full lg:max-w-[360px]">
						<Select onValueChange={handleSortChange}>
							<SelectTrigger className="bg-secondary border-none">
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent className="bg-secondary border-none text-textNormal">
								<SelectItem value="relevance">Relevance</SelectItem>
								<SelectItem value="release date">Release Date</SelectItem>
								<SelectItem value="name">Name</SelectItem>
								<SelectItem value="popularity">Popularity</SelectItem>
								<SelectItem value="average rating">Average Rating</SelectItem>
							</SelectContent>
						</Select>

						<Select onValueChange={handlePlatformChange}>
							<SelectTrigger className="bg-secondary border-none">
								<SelectValue placeholder="Platform" />
							</SelectTrigger>
							<SelectContent className="bg-secondary border-none text-textNormal">
								<SelectItem value="PC">PC</SelectItem>
								<SelectItem value="PlayStation">Playstation</SelectItem>
								<SelectItem value="Xbox">Xbox</SelectItem>
								<SelectItem value="iOS">iOS</SelectItem>
								<SelectItem value="Android">Android</SelectItem>
								<SelectItem value="Apple Macintosh">Apple Macintosh</SelectItem>
								<SelectItem value="Linux">Linux</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 place-items-center gap-4">
						{pageContent}
					</div>
				</div>
			</div>
		</main>
	);
}
