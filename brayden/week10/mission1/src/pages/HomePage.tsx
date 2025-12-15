import { useCallback, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch";
import type { MovieFilters, MovieResponse } from "../types/movie";

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });

  const axiosRequestConfig = useMemo(
    () => ({
      params: filters,
    }),
    [filters]
  );

  const handleMovieFilters = useCallback(
    (filters: MovieFilters) => {
      setFilters(filters);
    },
    [setFilters]
  );

  const { data, error, isLoading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestConfig
  );

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      {/* useCallback으로 감싸면 참조 동일성이 유지 -> 같은 함수로 판단 */}
      {/* but props로 전달하기 때문에 memo로 감싸지 않으면 리액트는 그대로 리렌더링 진행 */}
      {/* 따라서 MovieFilter를 memo로 감싸야 함 */}
      <MovieFilter onChange={handleMovieFilters} />
      {isLoading ? (
        <div>로딩중입니다...</div>
      ) : (
        <MovieList movies={data?.results || []} />
      )}
    </div>
  );
}
