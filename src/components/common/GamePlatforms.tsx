import React from 'react';
import Image from 'next/image';

type GamePlatFormProps = {
	parentPlatforms: ParentPlatform[];
};

export default function GamePlatforms({ parentPlatforms }: GamePlatFormProps) {
	return (
		<>
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
						<Image src={'/nintendo-icon.svg'} width={16} height={16} alt="nintendo platform icon" />
					)}
					{platform.platform.name === 'Apple Macintosh' && (
						<Image src={'/apple-icon.svg'} width={16} height={16} alt="apple platform icon" />
					)}
					{platform.platform.name === 'Android' && (
						<Image src={'/android-icon.svg'} width={16} height={16} alt="android platform icon" />
					)}
					{platform.platform.name === 'Linux' && (
						<Image src={'/linux-icon.svg'} width={16} height={16} alt="linux platform icon" />
					)}
				</React.Fragment>
			))}
		</>
	);
}
