export type Movie = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string; // (포스터 이미지)
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  video: boolean;
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};