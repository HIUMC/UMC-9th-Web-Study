export interface Credit {
  adult: boolean,
  gender: number,
  id: number,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string,
  credit_id: string,
  // cast
  cast_id?: number,
  character?: string,
  order?: number,
  // crew
  department?: string,
  job?: string,
}

export interface CreditsResponse {
  id: number;
  cast: Credit[];
  crew: Credit[];
}