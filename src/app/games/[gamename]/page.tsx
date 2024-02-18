'use client';

import React, { useEffect, useState } from 'react';
import ResourceLoader from '@/lib/ResourceLoader';
import Image from 'next/image';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import GamePlatforms from '@/components/common/GamePlatforms';

export default function GamePage({ params }: { params: { gamename: string } }) {
	const [gameData, setGameData] = useState<GameDetailedData>();
	const [gameScreenshots, setGameScreenshots] = useState<GameScreenshots>();
	const [showFullDescription, setShowFullDescription] = useState(false);
	const gameSlug = params.gamename;

	useEffect(() => {
		const fetchData = async () => {
			if (!gameSlug) return;

			try {
				const data = await ResourceLoader(`https://api.rawg.io/api/games/${gameSlug}`);
				const screenshots = await ResourceLoader(
					`https://api.rawg.io/api/games/${gameSlug}/screenshots`
				);
				console.log(data);
				console.log(screenshots);
				setGameData(data);
				setGameScreenshots(screenshots);
			} catch (error) {
				console.error('Failed to fetch game data', error);
			}
		};

		fetchData();
	}, [gameSlug]);

	if (!gameData || !gameScreenshots) {
		return <div className="bg-background">Loading...</div>;
	}

	function removeSpanishText(htmlString: any) {
		const parts = htmlString.split('Español');
		return parts[0]; // Return the English part
	}

	const toggleDescription = () => {
		setShowFullDescription(!showFullDescription);
	};

	return (
		<main id="game-detail-page" className="min-h-screen text-textNormal relative pt-16">
			<div className="absolute top-0 left-0 w-full z-[-2] h-full bg-background">
				<div
					style={{
						height: '33vh',
						width: '100%',
						background: 'no-repeat-top',
						backgroundSize: 'cover',
						backgroundColor: 'transparent',
						backgroundImage: `linear-gradient(rgba(15, 15, 15, 0), rgb(15, 15, 15)), linear-gradient(rgba(15, 15, 15, 0.8), rgba(15, 15, 15, 0.5)), url(${gameData.background_image})`,
						zIndex: '1',
					}}
				></div>
			</div>

			<div className="flex flex-col text-center items-center gap-4 p-4 z-[100]">
				<p className="text-textSecondary">{`HOME / GAMES / ${gameData.name}`}</p>

				<div className="flex flex-col items-center gap-1">
					<div className="flex gap-4 text-textSecondary">
						<GamePlatforms parentPlatforms={gameData.parent_platforms} />
					</div>

					<p className="text-textSecondary">Average Playtime: {gameData.playtime} Hours</p>
				</div>

				<h1 className="font-bold text-3xl">{gameData.name}</h1>

				<div className="max-w-screen">
					<Carousel>
						<CarouselContent>
							{gameScreenshots.results.map((screenshot, index) => {
								return (
									<CarouselItem key={screenshot.id} className="basis-3/4">
										<Image
											src={screenshot.image}
											width={640}
											height={360}
											style={{
												objectFit: 'cover',
												aspectRatio: '16/9',
												width: '100%',
												height: 'auto',
											}}
											className="w-full p-1"
											alt={`${gameData.name} game screenshot`}
										/>
									</CarouselItem>
								);
							})}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
				</div>

				<button className="flex justify-between items-center bg-primary text-textDark w-full rounded-sm py-2 px-6 text-start">
					<div className="flex-col">
						<p className="text-textDark text-sm">Add to</p>
						<p className="font-bold text-xl">My Collection</p>
					</div>
					<p className="font-bold text-2xl">+</p>
				</button>

				<div className="flex flex-col gap-8 mt-4">
					<div className="flex flex-col gap-1">
						<h2 className="font-bold text-2xl">
							{gameData.rating_top === 5 ? 'Exceptional' : null}
							{gameData.rating_top === 4 ? 'Recommended' : null}
							{gameData.rating_top === 3 ? 'Meh' : null}
							{gameData.rating_top === 1 ? 'Skip' : null}
						</h2>
						<p className="text-sm text-textSecondary">{gameData.ratings_count} Ratings</p>
					</div>

					<div id="about" className="flex flex-col gap-1 text-start w-full">
						<h2 className="font-bold text-2xl">About</h2>
						<p
							className={`text-sm tracking-wider ${showFullDescription ? '' : 'line-clamp-4'}`}
							dangerouslySetInnerHTML={{
								__html: removeSpanishText(gameData.description),
							}}
						></p>
						<button className="text-textSecondary text-start underline" onClick={toggleDescription}>
							{showFullDescription ? 'Read Less' : 'Read More'}
						</button>
					</div>

					<div className="grid grid-cols-2 gap-4 text-start">
						<div className="flex flex-col gap-1">
							<h3 className="text-textSecondary">Platforms</h3>
							<div className="flex flex-wrap gap-2">
								{gameData.parent_platforms.map((parentPlatform, index) => {
									const isLast = index === gameData.parent_platforms.length - 1;
									return (
										<p key={parentPlatform.platform.id}>
											{parentPlatform.platform.name}
											{!isLast && ','}
										</p>
									);
								})}
							</div>
						</div>

						<div className="flex flex-col gap-1">
							<h3 className="text-textSecondary">Metascore</h3>
							<p>{gameData.metacritic}</p>
						</div>

						<div className="flex flex-col gap-1">
							<h3 className="text-textSecondary">Genre</h3>
							<div className="flex flex-wrap gap-2">
								{gameData.genres.map((genre, index) => {
									const isLast = index === gameData.genres.length - 1;
									return (
										<p key={genre.id}>
											{genre.name}
											{!isLast && ','}
										</p>
									);
								})}
							</div>
						</div>

						<div className="flex flex-col gap-1">
							<h3 className="text-textSecondary">Release Date</h3>
							<p>{gameData.released}</p>
						</div>

						<div className="flex flex-col gap-1">
							<h3 className="text-textSecondary">Developers</h3>
							<div className="flex flex-col">
								{gameData.developers.map((developer, index) => {
									const isLast = index === gameData.developers.length - 1;
									return (
										<p key={developer.id}>
											{developer.name}
											{!isLast && ','}
										</p>
									);
								})}
							</div>
						</div>

						<div className="flex flex-col gap-1">
							<h3 className="text-textSecondary">Publishers</h3>
							<div className="flex flex-col">
								{gameData.publishers.map((publisher, index) => {
									const isLast = index === gameData.publishers.length - 1;
									return (
										<p key={publisher.id}>
											{publisher.name}
											{!isLast && ','}
										</p>
									);
								})}
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-1 text-start">
						<h3 className="text-textSecondary">Age Rating</h3>
						<p>{gameData.esrb_rating.name}</p>
					</div>

					<div className="flex flex-col gap-1 text-start">
						<h3 className="text-textSecondary">Tags</h3>
						<div className="flex flex-wrap gap-2">
							{gameData.tags.map((tag, index) => {
								const isLast = index === gameData.tags.length - 1;
								return (
									<p key={tag.id}>
										{tag.name}
										{!isLast && ','}
									</p>
								);
							})}
						</div>
					</div>

					<div className="flex flex-col gap-1 text-start">
						<h3 className="text-textSecondary">Website</h3>
						<a
							href={gameData.website}
							target="_blank"
							rel="noopener noreferrer"
							className="underline"
						>
							{gameData.website}
						</a>
					</div>
				</div>
			</div>
		</main>
	);
}
