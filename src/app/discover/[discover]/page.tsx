'use client';

import Image from 'next/image';
import ResourceLoader from '@/lib/ResourceLoader';
import getFetchUrl from '@/lib/getFetchUrl';
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

export default function DiscoverGames({ params }: { params: { discover: string } }) {
	const [gameList, setGameList] = useState<GameList>(); // object parent of gameResults
	const [gameResults, setGameResults] = useState<GameResultsData[]>([]); // contains array of game results
	const [sortOption, setSortOption] = useState<string>('');
	const [platform, setPlatform] = useState<string>('');

	const urlSlug = params.discover;

	const formatUrlSlug = () => {
		let slug = urlSlug;

		if (slug === 'role-playing-games-rpg') return 'RPG';

		const withSpaces = slug.replace(/-/g, ' ');
		const capitalized = withSpaces
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
		return capitalized;
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await ResourceLoader(getFetchUrl(urlSlug));
				setGameList(data);
				setGameResults(data.results);
			} catch (error) {
				console.error('Failed to fetch market data', error);
			}
		};

		fetchData();
	}, [urlSlug]);

	const updateGames = (sort: string, plat: string) => {
		let updatedGames = gameList?.results || [];

		if (plat || platform) {
			updatedGames = updatedGames.filter((game) =>
				game.parent_platforms.some((p) => p.platform.name === plat)
			);
		}

		if (sort === 'release date') {
			updatedGames.sort((a, b) => {
				const dataA = new Date(a.released).getTime();
				const dateB = new Date(b.released).getTime();
				return dateB - dataA;
			});
		} else if (sort === 'name') {
			updatedGames.sort((a, b) => a.name.localeCompare(b.name));
		} else if (sort === 'popularity') {
			updatedGames.sort((a, b) => b.added - a.added);
		} else if (sort === 'average rating') {
			updatedGames.sort((a, b) => b.rating - a.rating);
		}

		setGameResults(updatedGames);
	};

	const handleSortChange = (value: string) => {
		setSortOption(value);
		updateGames(value, platform);
	};

	const handlePlatformChange = (value: string) => {
		setPlatform(value);
		updateGames(sortOption, value);
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
			<div className="flex flex-col gap-4 max-w-7xl p-4">
				<div className="flex flex-col justify-center items-center mb-4">
					<h1 className="font-bold text-4xl">{formatUrlSlug()}</h1>
				</div>

				<div className="grid grid-cols-2 gap-2 w-full">
					<Select onValueChange={handleSortChange}>
						<SelectTrigger className="bg-secondary border-none">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent className="bg-secondary border-none text-textNormal">
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

				<div className="grid gap-4">{pageContent}</div>
			</div>
		</main>
	);
}
