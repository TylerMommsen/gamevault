import React from 'react';
import Image from 'next/image';

interface GameCardProps {
	id: number;
	image: string;
	name: string;
	parentPlatforms: ParentPlatform[];
	price: number;
}

export default function GameCard({ id, image, name, parentPlatforms, price }: GameCardProps) {
	return (
		<div id="game-card" className="flex flex-col rounded-2xl bg-gray-700">
			<div className="w-full relative">
				<Image
					src={image}
					sizes="100vw"
					style={{ width: '100%', height: 'auto', objectFit: 'cover', aspectRatio: '16 / 9' }}
					width={640}
					height={360}
					alt={`${name} image`}
					className="rounded-t-2xl"
				/>
			</div>

			<div className="flex flex-col p-4">
				<div className="flex justify-between">
					<p>Add to cart +</p>
					<p>{price}</p>
				</div>

				<h3 className="text-2xl font-bold">{name}</h3>
			</div>
		</div>
	);
}
