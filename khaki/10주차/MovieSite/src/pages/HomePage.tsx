import { useCallback, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch";
import type { MovieFilters, MovieResponse } from "../types/movie";

const HomePage = () => {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });

  const axiosRequestConfig = useMemo(() => ({ params: filters }), [filters]);

  const { data, error, isLoading } = useFetch<MovieResponse>("search/movie", axiosRequestConfig);

  const handleMovieFilters = useCallback(
    (filters: MovieFilters): void => {
      setFilters(filters);
    },
    [setFilters]
  );

  if (error) {
    return <div className="container">에러 발생: {error}</div>;
  }

  return (
    <div className="w-full">
      <MovieFilter onChange={handleMovieFilters} />
      {isLoading ? <div>로딩중...</div> : <MovieList movies={data?.results || []} />}
    </div>
  );
};

export default HomePage;
