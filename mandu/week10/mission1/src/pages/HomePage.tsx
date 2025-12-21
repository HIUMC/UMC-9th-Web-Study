import { useCallback, useMemo, useState } from "react";
import MovieList from "../components/MoiveList";
import MovieFilter from "../components/MovieFilter";
import useFetch from "../hooks/useFetch";
import {
  type Movie,
  type MovieFilters,
  type MovieResponse,
} from "../types/movies";
import MovieModal from "../components/MovieModal";

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });

  const [selectMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const AxiosRequestConfig = useMemo(
    () => ({
      params: filters,
    }),
    [filters]
  );

  const { data, error, isLoading } = useFetch<MovieResponse>(
    "/search/movie",
    AxiosRequestConfig
  );

  const handleMovieFilters = useCallback(
    (filters: MovieFilters) => {
      setFilters(filters);
    },
    [setFilters]
  );

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <MovieFilter onChange={handleMovieFilters} />
      {isLoading ? (
        <div>로딩 중 입니다...</div>
      ) : (
        <MovieList
          onMovieClick={handleOpenModal}
          movies={data?.results || []}
        />
      )}

      <MovieModal
        movie={selectMovie}
        isOpen={!!selectMovie}
        onClose={handleCloseModal}
        language={filters.language}
      />
    </div>
  );
}
