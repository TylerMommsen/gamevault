'use client';

import Image from 'next/image';
import ResourceLoader from '@/lib/ResourceLoader';
import { useEffect, useState } from 'react';
import GameCard from '@/components/common/GameCard';

export default function Home() {
	const [games, setGames] = useState<GameList>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await ResourceLoader('https://api.rawg.io/api/games');
				console.log(data);

				setGames(data);
			} catch (error) {
				console.error('Failed to fetch market data', error);
			}
		};

		fetchData();
	}, []);

	const generatePrice = () => {
		const prices = [9.99, 19.99, 29.99, 49.99, 69.99];
		const randomIndex = Math.floor(Math.random() * prices.length);
		return prices[randomIndex];
	};

	const pageContent = (
		<>
			{games?.results.map((game: GameResultsData, index) => {
				return (
					<GameCard
						key={game.id}
						id={game.id}
						image={game.background_image}
						name={game.name}
						parentPlatforms={game.parent_platforms}
						price={19.99}
					/>
				);
			})}
		</>
	);

	return (
		<main className="bg-background text-textNormal min-h-screen">
			<div className="flex flex-col gap-4 max-w-7xl p-4">
				<div className="flex flex-col justify-center items-center mb-4">
					<h1 className="font-bold text-4xl">Top Picks</h1>
					<p className="text-textSecondary">Based on your ratings</p>
				</div>

				<div className="text-sm px-4 py-2 inline-flex justify-between items-center gap-2 bg-secondary rounded-xl w-fit">
					<p>Order by:</p>
					<p className="font-bold">Relevance</p>
					<Image
						src={'/arrow-icon.png'}
						width={16}
						height={16}
						alt="arrow icon"
						className="rotate-90"
					/>
				</div>

				<div className="grid gap-4">{pageContent}</div>
			</div>
		</main>
	);
}
