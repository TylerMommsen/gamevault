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
					<Link href="/last-30-days">Last 30 Days</Link>
					<Link href="/this-week">This Week</Link>
					<Link href="/next-week">Next Week</Link>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<h2 className="font-bold text-2xl">Top</h2>
				<div className="flex flex-col text-xl gap-2">
					<Link href="/popular">Popular</Link>
					<Link href="/top-this-year">Top Of This Year</Link>
					<Link href="/overview">Top Of All Time</Link>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<h2 className="font-bold text-2xl">Platforms</h2>
				<div className="flex flex-col text-xl gap-2">
					<Link href="/pc">PC</Link>
					<Link href="/playstation">Playstation</Link>
					<Link href="/xbox">Xbox</Link>
					<Link href="/nintendo-switch">Nintendo Switch</Link>
					<Link href="/ios">iOS</Link>
					<Link href="/android">Android</Link>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<h2 className="font-bold text-2xl">Genres</h2>
				<div className="flex flex-col text-xl gap-2">
					<Link href="/action">Action</Link>
					<Link href="/strategy">Strategy</Link>
					<Link href="/rpg">RPG</Link>
					<Link href="/shooter">Shooter</Link>
					<Link href="/adventure">Adventure</Link>
					<Link href="/puzzle">Puzzle</Link>
					<Link href="/racing">Racing</Link>
					<Link href="/sports">Sports</Link>
				</div>
			</div>
		</div>
	);
}
