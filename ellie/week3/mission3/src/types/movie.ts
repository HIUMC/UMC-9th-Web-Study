export type Movie = {
  adult: boolean;
  backdrop_path: string;
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
  runtime: string;
  tagline: string;
}

export type Credit = {
  id: number;
  name: string;
  gender: number;
  profile_path: string | null;
  credit_id: string;

  // Cast 전용
  character?: string;
  order?: number;

  // Crew 전용
  job?: string;
  department?: string;
};

