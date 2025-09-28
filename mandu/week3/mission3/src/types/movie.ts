export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  // 필요하다면 추가 필드도 정의 가능
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};


export interface Details {
  title: string;
  overview:string;
  poster_path: string;
  release_date: string;
  runtime: number;
}

export interface CastResponse {
  id: number;
  cast: Cast[];
}
export interface Cast{
  id:number;
  name:string;
  profile_path:string;
}