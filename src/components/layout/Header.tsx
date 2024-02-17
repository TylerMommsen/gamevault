import React from 'react';

export default function Header() {
	return (
		<header className="flex justify-center w-screen fixed">
			<div className="max-w-7xl flex justify-between items-center text-primary p-4 w-full">
				<h1 className="font-bold text-2xl">GameVault</h1>
				<p className="text-2xl">&#9776;</p>
			</div>
		</header>
	);
}
