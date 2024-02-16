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
		<div id="game-card" className="flex flex-col rounded-2xl bg-secondary text-primary">
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

			<div className="flex flex-col gap-2 p-4">
				<div className="flex gap-4 text-textSecondary">
					{parentPlatforms.map((platform) => (
						<React.Fragment key={platform.platform.id}>
							{platform.platform.name === 'PlayStation' && (
								<Image
									src={'/playstation-icon.svg'}
									width={16}
									height={16}
									alt="playstation platform icon"
								/>
							)}
							{platform.platform.name === 'PC' && (
								<Image src={'/pc-icon.svg'} width={16} height={16} alt="pc platform icon" />
							)}
							{platform.platform.name === 'Xbox' && (
								<Image src={'/xbox-icon.svg'} width={16} height={16} alt="xbox platform icon" />
							)}
							{platform.platform.name === 'Nintendo' && (
								<Image
									src={'/nintendo-icon.svg'}
									width={16}
									height={16}
									alt="nintendo platform icon"
								/>
							)}
							{platform.platform.name === 'Apple Macintosh' && (
								<Image src={'/apple-icon.svg'} width={16} height={16} alt="apple platform icon" />
							)}
							{platform.platform.name === 'Android' && (
								<Image
									src={'/android-icon.svg'}
									width={16}
									height={16}
									alt="android platform icon"
								/>
							)}
							{platform.platform.name === 'Linux' && (
								<Image src={'/linux-icon.svg'} width={16} height={16} alt="linux platform icon" />
							)}
						</React.Fragment>
					))}
				</div>

				<h3 className="text-2xl font-bold">{name}</h3>

				<div className="flex items-center gap-2 text-xl h-[32px]">
					<button className="px-2 bg-secondaryLighter relative rounded-sm h-full">&#43;</button>

					<button className="px-2 bg-secondaryLighter rounded-sm relative h-full">
						<div className="relative px-2 h-full">
							<Image src={'/gift-icon.svg'} layout="fill" objectFit="contain" alt="ellipsis icon" />
						</div>
					</button>

					<button className="px-2 bg-secondaryLighter rounded-sm relative h-full">
						<div className="relative px-2 h-full">
							<Image
								src={'/horizontal-ellipsis-icon.svg'}
								layout="fill"
								objectFit="contain"
								alt="ellipsis icon"
							/>
						</div>
					</button>
				</div>
			</div>
		</div>
	);
}
