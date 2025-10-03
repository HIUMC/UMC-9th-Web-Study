export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export type MovieResponse = {
  page: number,
  results: Movie[],
  total_pages: number,
  total_results: number,
}

export type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  poster_path: string | null;
  backdrop_path: string | null;
};

export type Credit = {
  id: number;
  name: string;
  character?: string; // 배우일 때
  job?: string;       // 스태프(감독 등)일 때
  profile_path: string | null;
};

export type CreditsResponse = {
  cast: Credit[];
  crew: Credit[];
};