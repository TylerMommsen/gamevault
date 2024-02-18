import Link from 'next/link';
import React from 'react';

export default function MobileMenu() {
	return (
		<div className="flex flex-col gap-8 text-textNormal pt-8">
			<Link href="/" className="font-bold text-3xl">
				Home
			</Link>

			<div className="flex flex-col gap-2">
				<h2 className="font-bold text-2xl">My Library</h2>
				<div className="flex flex-col gap-2 text-xl">
					<Link href="/my-collection">Collection</Link>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<h2 className="font-bold text-2xl">New Releases</h2>
				<div className="flex flex-col text-xl gap-2">
					<Link href="/discover/last-30-days">Last 30 Days</Link>
					<Link href="/discover/this-week">This Week</Link>
					<Link href="/discover/next-week">Next Week</Link>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<h2 className="font-bold text-2xl">Top</h2>
				<div className="flex flex-col text-xl gap-2">
					<Link href="/discover/popular">Popular In 2023</Link>
					<Link href="/discover/top-this-year">Top Of This Year</Link>
					<Link href="/discover/overview">Top Of All Time</Link>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<h2 className="font-bold text-2xl">Genres</h2>
				<div className="flex flex-col text-xl gap-2">
					<Link href="/discover/action">Action</Link>
					<Link href="/discover/indie">Indie</Link>
					<Link href="/discover/adventure">Adventure</Link>
					<Link href="/discover/role-playing-games-rpg">RPG</Link>
					<Link href="/discover/strategy">Strategy</Link>
					<Link href="/discover/shooter">Shooter</Link>
					<Link href="/discover/casual">Casual</Link>
					<Link href="/discover/simulation">Simulation</Link>
					<Link href="/discover/puzzle">Puzzle</Link>
					<Link href="/discover/arcade">Arcade</Link>
					<Link href="/discover/platformer">Platformer</Link>
					<Link href="/discover/racing">Racing</Link>
					<Link href="/discover/sports">Sports</Link>
					<Link href="/discover/fighting">Fighting</Link>
					<Link href="/discover/family">Family</Link>
					<Link href="/discover/board-games">Board Games</Link>
					<Link href="/discover/educational">Educational</Link>
					<Link href="/discover/card">Card</Link>
				</div>
			</div>
		</div>
	);
}
