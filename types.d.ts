type ParentPlatform = {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
};

type ESRBRating = {
  id: number;
  name: string;
  slug: string;
};

type Genre = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
};

type Platform = {
  games_count: number;
  id: number;
  image: string | null;
  image_background: string;
  name: string;
  slug: string;
  year_end: number | null;
  year_start: number | null;
};

type Rating = {
  count: number;
  id: number;
  percent: number;
  title: string;
};

type Store = {
  id: number;
  store: {
    domain: string;
    games_count: number;
    id: number;
    image_background: string;
    name: string;
    slug: string;
  };
};

type Tag = {
  games_count: number;
  id: number;
  image_background: string;
  language: string;
  name: string;
  slug: string;
};

type ShortScreenshot = {
  id: number;
  image: string;
};

type GameResultsData = {
  added: number;
  added_by_status: {
    beaten: number;
    dropped: number;
    owned: number;
    playing: number;
    toplay: number;
    yet: number;
  };
  background_image: string;
  clip: null | any;
  dominant_color: string;
  esrb_rating: ESRBRating;
  genres: Genre[];
  id: number;
  metacritic: number;
  name: string;
  parent_platforms: ParentPlatform[];
  platforms: Platform[];
  playtime: number;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  ratings_count: number;
  released: string;
  reviews_count: number;
  reviews_text_count: number;
  saturated_color: string;
  short_screenshots: ShortScreenshot[];
  slug: string;
  stores: Store[];
  suggestions_count: number;
  tags: Tag[];
  tba: boolean;
  updated: string;
  user_game: null;
};

type YearFilter = {
  count: number;
  decade: number;
  filter: string;
  from: number;
  to: number;
  years: { year: number; count: number; nofollow: boolean }[];
};

type GameList = {
  count: number;
  description: string;
  filters: {
    years: YearFilter[];
  };
  next: string | null;
  nofollow: boolean;
  nofollow_collections: string[];
  noindex: boolean;
  previous: string | null;
  results: GameResultsData[];
  seo_description: string;
  seo_h1: string;
  seo_keywords: string;
  seo_title: string;
};

type MetacriticPlatform = {
  metascore: number;
  url: string;
  platform: {
    name: string;
    platform: number;
    slug: string;
  };
};

type GameDetailedData = {
  achievements_count: number;
  added: number;
  added_by_status: {
    beaten: number;
    dropped: number;
    owned: number;
    playing: number;
    toplay: number;
    yet: number;
  };
  additions_count: number;
  alternative_names: string[];
  background_image: string;
  background_image_additional: string;
  clip: null | any;
  creators_count: number;
  description: string;
  description_raw: string;
  developers: {
    games_count: number;
    id: number;
    image_background: string;
    name: string;
    slug: string;
  }[];
  dominant_color: string;
  esrb_rating: {
    id: number;
    name: string;
    slug: string;
  };
  game_series_count: number;
  genres: Genre[];
  id: number;
  metacritic: number;
  metacritic_platforms: MetacriticPlatform[];
  metacritic_url: string;
  movies_count: number;
  name: string;
  name_original: string;
  parent_achievements_count: number;
  parent_platforms: ParentPlatform[];
  parents_count: number;
  platforms: Platform[]; // Reuse the existing 'Platform' type
  playtime: number;
  publishers: {
    games_count: number;
    id: number;
    image_background: string;
    name: string;
    slug: string;
  }[];
  rating: number;
  rating_top: number;
  ratings: Rating[];
  ratings_count: number;
  reactions: Record<number, number>;
  reddit_count: number;
  reddit_description: string;
  reddit_logo: string;
  reddit_name: string;
  reddit_url: string;
  released: string;
  reviews_count: number;
  reviews_text_count: number;
  saturated_color: string;
  screenshots_count: number;
  slug: string;
  stores: Store[];
  suggestions_count: number;
  tags: Tag[];
  tba: boolean;
  twitch_count: number;
  updated: string;
  user_game: null;
  website: string;
  youtube_count: number;
};

type GameScreenshots = {
  count: number;
  next: null | any;
  previous: null | any;
  results: {
    height: number;
    id: number;
    image: string;
    is_deleted: boolean;
    width: number;
  }[];
};

type GameStores = {
  count: number;
  next: null | any;
  previous: null | any;
  results: {
    game_id: number;
    id: number;
    store_id: number;
    url: string;
  }[];
};

type GameTrailers = {
  count: number;
  next: null | any;
  previous: null | any;
  results: Array<{
    data: {
      "480": string;
      max: string;
    };
    id: number;
    name: string;
    preview: string;
  }>;
};

type GameSearch = {
  count: number;
  next: null | any;
  previous: null | any;
  results: Array<GameResultsData>;
};
