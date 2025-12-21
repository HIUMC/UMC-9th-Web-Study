import { useCallback, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch"
import type { MovieFilters, MovieResponse } from "../types/movie"


export default function HomePage() {

  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult : false,
    language : "ko-KR"
  })
  
  const axiosRequestConfig = useMemo(() => ({
      params:filters,
    }) , [filters]);

  
  const handleMovieFilters = useCallback((filters : MovieFilters) => {
    setFilters(filters)
  }, [setFilters]);
  // 객체 값 동결 레퍼런스 함수 
  // 의존성배열함수인 setFilters변경없으면 같은 함수

  const { data, error, isLoading } = useFetch<MovieResponse>("search/movie", axiosRequestConfig);

  
  if(error) {
    return <div>{error}</div>
  }

  return (
    <div className="container">
      {/* props 객체 참조값을 같게 하면 리렌더링 두번 X */}
      <MovieFilter onChange = {handleMovieFilters}/> 
      {isLoading ? (
        <div>로딩 중 입니다...</div>
      ) :(
        <MovieList movies={data?.results || []} />
      )}
    </div>
  )
}
