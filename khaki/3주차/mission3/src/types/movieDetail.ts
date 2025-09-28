// 배우 전용 타입
export interface CastCredit {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
  order: number;
}

// 크루 전용 타입
export interface CrewCredit {
  id: number;
  name: string;
  profile_path: string | null;
  department: string;
  job: string;
}

// Credits 전용 타입
export interface Credits {
    cast: CastCredit[];
    crew: CrewCredit[];
  };


export interface MovieDetail {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  runtime: number | null;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genres: { id: number; name: string }[];
  belongs_to_collection: null | { id: number; name: string; poster_path: string | null; backdrop_path: string | null };
  production_companies: { id: number; name: string; logo_path: string | null; origin_country: string }[];
  spoken_languages: { iso_639_1: string; english_name: string; name: string }[];
  status: string;
  tagline: string | null;
  vote_average: number;
  vote_count: number;

};

export type MovieDetailWithCredits = MovieDetail & {credits: Credits };
// &는 type에서만 사용가능! interface는 사용불가능하다.

