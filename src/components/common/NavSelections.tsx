import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function NavSelections() {
	const renderNavLink = (
		href: string,
		iconSrc: string,
		label: string,
		isGenreLink: boolean = false,
		classNames: string = ''
	) => {
		return (
			<Link href={href} className="flex items-center gap-2 hover:underline">
				<div
					className={`flex relative items-center justify-center bg-secondary rounded-md w-[28px] h-[28px] ${classNames}`}
				>
					{isGenreLink ? (
						<Image
							src={iconSrc}
							sizes="100vw"
							layout="fill"
							objectFit="cover"
							alt={label + 'icon'}
							className="rounded-md"
						/>
					) : (
						<>
							<Image src={iconSrc} width={20} height={20} alt={label + 'icon'} />
						</>
					)}
				</div>
				<p>{label}</p>
			</Link>
		);
	};

	return (
		<div className="flex flex-col gap-8 text-textNormal pt-16 lg:pt-4 bg-transparent h-full">
			<Link href="/" className="font-bold text-3xl">
				Home
			</Link>

			<div className="flex flex-col gap-2">
				<h2 className="font-bold text-2xl">My Library</h2>
				<div className="flex flex-col gap-2 text-xl lg:text-base">
					{renderNavLink('/collection', '/NavIcons/my-collection-icon.svg', 'My Collection')}
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<h2 className="font-bold text-2xl">New Releases</h2>
				<div className="flex flex-col text-xl lg:text-base gap-2">
					{renderNavLink(
						'/discover/last-30-days',
						'/NavIcons/last-30-days-icon.svg',
						'Last 30 Days'
					)}
					{renderNavLink('/discover/this-week', '/NavIcons/this-week-icon.svg', 'This Week')}
					{renderNavLink('/discover/next-week', '/NavIcons/next-week-icon.svg', 'Next Week')}
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<h2 className="font-bold text-2xl">Top</h2>
				<div className="flex flex-col text-xl lg:text-base gap-2">
					{renderNavLink(
						`/discover/popular-in-${new Date().getFullYear()}`,
						'/NavIcons/popular-in-year-icon.svg',
						`Popular In ${new Date().getFullYear()}`
					)}

					{renderNavLink(
						'/discover/top-of-this-year',
						'/NavIcons/top-of-this-year-icon.svg',
						'Top Of This Year'
					)}
					{renderNavLink(
						'/discover/top-of-all-time',
						'/NavIcons/top-of-all-time-icon.svg',
						'Top Of All Time'
					)}
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<h2 className="font-bold text-2xl">Genres</h2>
				<div className="flex flex-col text-xl lg:text-base gap-2">
					{renderNavLink('/discover/action', '/NavIcons/action-icon.png', 'Action', true)}
					{renderNavLink('/discover/strategy', '/NavIcons/strategy-icon.png', 'Strategy', true)}
					{renderNavLink('/discover/role-playing-games-rpg', '/NavIcons/rpg-icon.png', 'RPG', true)}
					{renderNavLink('/discover/shooter', '/NavIcons/shooter-icon.png', 'Shooter', true)}
					{renderNavLink('/discover/adventure', '/NavIcons/adventure-icon.png', 'Adventure', true)}
					{renderNavLink('/discover/puzzle', '/NavIcons/puzzle-icon.png', 'Puzzle', true)}
					{renderNavLink('/discover/racing', '/NavIcons/racing-icon.png', 'Racing', true)}
					{renderNavLink('/discover/sports', '/NavIcons/sports-icon.png', 'Sports', true)}
					{renderNavLink('/discover/indie', '/NavIcons/indie-icon.png', 'Indie', true)}
					{renderNavLink('/discover/casual', '/NavIcons/casual-icon.jpg', 'Casual', true)}
					{renderNavLink(
						'/discover/simulation',
						'/NavIcons/simulation-icon.png',
						'Simulation',
						true
					)}
					{renderNavLink('/discover/arcade', '/NavIcons/arcade-icon.png', 'Arcade', true)}
					{renderNavLink(
						'/discover/platformer',
						'/NavIcons/platformer-icon.jpg',
						'Platformer',
						true
					)}
					{renderNavLink('/discover/fighting', '/NavIcons/fighting-icon.png', 'Fighting', true)}
					{renderNavLink('/discover/family', '/NavIcons/family-icon.jpg', 'Family', true)}
					{renderNavLink(
						'/discover/board-games',
						'/NavIcons/board-games-icon.png',
						'Board Games',
						true
					)}
					{renderNavLink(
						'/discover/educational',
						'/NavIcons/educational-icon.webp',
						'Educational',
						true
					)}
					{renderNavLink('/discover/card', '/NavIcons/card-icon.jpeg', 'Card', true)}
				</div>
			</div>
		</div>
	);
}
