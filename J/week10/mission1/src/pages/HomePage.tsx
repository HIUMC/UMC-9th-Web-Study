import { useCallback, useMemo, useState } from "react";
import { MovieFilter } from "../components/MovieFilter";
import { MovieList } from "../components/MovieList";
import { useFetch } from "../hooks/useFetch"
import type { Movie, MovieFilters, MovieResponse } from "../types/movie"
import { MovieDetailModal } from "../components/MovieDetailModal";

export default function HomePage() {
    const [filters, setFilters] = useState<MovieFilters>({
        query: "어벤져스",
        include_adult: false,
        language: "ko-KR",
    });
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>();

    const axiosRequestConfig = useMemo(() => ({
        params: filters, 
    }), [filters])

    const {data, error, isLoading} = useFetch<MovieResponse>("/search/movie", axiosRequestConfig);

    const handleMovieFilters = useCallback((filters: MovieFilters) => {
        setFilters(filters);
    }, [setFilters]);

    const handleSelectMovie = useCallback((movie: Movie) => {
        setSelectedMovie(movie);
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedMovie(null);
    }, [])

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className="min-h-screen w-full px-6 space-y-2">
            <MovieFilter onChange={handleMovieFilters}/>
                {isLoading ? (
                    <div>로딩 중 입니다...</div>
                ) : (
                    <MovieList movies={data?.results || []} onSelectMovie={handleSelectMovie} />
                )}
                {selectedMovie && (
                    <MovieDetailModal
                        movie={selectedMovie}
                        onClose={handleCloseModal}
                    />
                )}
        </div>
    )
}

// 검색 필터
// 영화 무비