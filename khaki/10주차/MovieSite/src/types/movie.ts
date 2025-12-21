export type MovieLanguage = "en-US" | "ko-KR" | "ja-JP" | "zh-CN";

// 영화 필터 타입
export type MovieFilters = {
  query: string;
  include_adult: boolean;
  language: string;
};

// TMDB 기본 영화 타입
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
  video: boolean;
  vote_average: number;
  vote_count: number;
};

// 목록 응답 형태 (예: /movie/popular)
export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
