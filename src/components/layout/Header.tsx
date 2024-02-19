'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import MobileMenu from '../common/NavSelections';

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<header
			className={`flex justify-center w-screen fixed z-[100] ${isScrolled ? 'bg-background' : null} transition-all duration-300`}
		>
			<div className="max-w-[1920px] flex justify-between items-center text-primary p-4 w-full">
				<Link href="/" className="font-bold text-2xl">
					GameVault
				</Link>

				<Sheet>
					<SheetTrigger className="text-2xl">&#9776;</SheetTrigger>
					<SheetContent className="border-transparent overflow-y-scroll">
						<MobileMenu />
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}
