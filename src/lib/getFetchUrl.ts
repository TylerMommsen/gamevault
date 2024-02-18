const genres = [
	'action',
	'indie',
	'adventure',
	'role-playing-games-rpg',
	'strategy',
	'shooter',
	'casual',
	'simulation',
	'puzzle',
	'arcade',
	'platformer',
	'racing',
	'sports',
	'fighting',
	'family',
	'board-games',
	'educational',
	'card',
];

const baseURL = 'https://api.rawg.io/api/games?';

const getDateRangeForNewReleases = () => {
	const endDate = new Date().toISOString().split('T')[0];
	const startDate = new Date(new Date().setDate(new Date().getDate() - 30))
		.toISOString()
		.split('T')[0];
	return `dates=${startDate},${endDate}`;
};

const getDateRangeForThisWeek = () => {
	const today = new Date();
	const sevenDaysFromNow = new Date(new Date().setDate(today.getDate() + 7));

	const startDate = today.toISOString().split('T')[0];
	const endDate = sevenDaysFromNow.toISOString().split('T')[0];

	return `dates=${startDate},${endDate}`;
};

const getDateRangeForNextWeek = () => {
	const sevenDaysFromNow = new Date(new Date().setDate(new Date().getDate() + 7));
	const fourteenDaysFromNow = new Date(new Date().setDate(new Date().getDate() + 14));

	const startDate = sevenDaysFromNow.toISOString().split('T')[0];
	const endDate = fourteenDaysFromNow.toISOString().split('T')[0];

	return `dates=${startDate},${endDate}`;
};

const getDateRangeForThisYear = () => {
	const currentYear = new Date().getFullYear();
	return `dates=${currentYear}-01-01,${currentYear}-12-31`;
};

interface URLMapping {
	[key: string]: string;
}

// Mapping of specific categories to URL components or functions that return URL components
const categoryToURLMapping: URLMapping = {
	'last-30-days': `${baseURL}${getDateRangeForNewReleases()}&`,
	'this-week': `${baseURL}${getDateRangeForThisWeek()}&`,
	'next-week': `${baseURL}${getDateRangeForNextWeek()}&`,
	[`popular-in-${new Date().getFullYear()}`]: `${baseURL}${getDateRangeForThisYear()}&ordering=rating&ordering=-added&`,
	'top-of-this-year': `${baseURL}${getDateRangeForThisYear()}&ordering=metacritic&ordering=-added&`,
	'top-of-all-time': `${baseURL}ordering=-added&`,
};

export default function getFetchUrl(urlSlug: string) {
	// Check if the urlSlug matches one of the predefined categories
	if (categoryToURLMapping[urlSlug]) {
		return categoryToURLMapping[urlSlug];
	}

	// If the urlSlug is one of the genres
	if (genres.includes(urlSlug)) {
		return `${baseURL}genres=${urlSlug}&`;
	}

	// Fallback URL or handling for unexpected urlSlugs
	return baseURL;
}
