import type { Movie } from "../types/movies";
import MovieCard from "./MovieCard";

interface MovieListProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

const MovieList = ({ movies, onMovieClick }: MovieListProps) => {
  if (movies.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="font-bold text-gray-500">검색 결과가 없습니다.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {movies.map((movie) => (
        <MovieCard
          onClick={() => onMovieClick(movie)}
          key={movie.id}
          movie={movie}
        />
      ))}
    </div>
  );
};

export default MovieList;
