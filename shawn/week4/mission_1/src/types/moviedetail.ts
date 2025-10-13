export interface MovieDetail {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  genres: { id: number; name: string }[];
  production_companies: { name: string; logo_path: string }[];
  production_countries: { name: string }[];
  spoken_languages: { name: string }[];
  tagline: string;
  homepage: string;
}
