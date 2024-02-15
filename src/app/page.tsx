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
		<main className="flex min-h-screen flex-col items-center justify-between p-4">
			<div className="grid gap-4">{pageContent}</div>
		</main>
	);
}
