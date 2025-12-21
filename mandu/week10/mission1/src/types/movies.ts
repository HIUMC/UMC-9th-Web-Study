export type MoiveLanguage = "ko-KR" | "en-US" | "ja-JP";

export type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type MovieFilters = {
  query: string;
  include_adult: boolean;
  language: MoiveLanguage;
};

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetail extends Movie {
  belongs_to_collection: null | object;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  revenue: number;
  runtime: number; // 상영 시간
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
}
