import { memo } from "react";
import type { Movie } from "../types/movie"
import { MovieCard } from "./MovieCard";

interface MovieListProps {
    movies: Movie[];
    onSelectMovie: (movie: Movie) => void;
}

export const MovieList = memo(({movies, onSelectMovie}: MovieListProps) => {
    console.log("Movie List 리렌더링")
    if (movies.length === 0) {
        return (
            <div className="flex h-60 items-center justify-center">
                <p className="font-bold text-gray-500">검색 결과가 없습니다.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onClick={() => onSelectMovie(movie)}/>
            ))}

        </div>
    )
});