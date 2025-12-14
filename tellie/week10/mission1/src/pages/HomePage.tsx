import useFetch from "../hooks/useFetch";
import { type MovieFilters, type MovieResponse, type Movie } from "../types/movie";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import MovieModal from "../components/MovieModal";
import { useCallback, useMemo, useState } from "react";

export default function HomePage() {
    const [filters, setFilters] = useState<MovieFilters>({
        query: "",
        include_adult: false,
        language: "ko-KR",
    });

    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const axiosRequestConfig = useMemo(
        () => {
            // query가 비어있으면 trending 영화 가져오기
            if (!filters.query) {
                return {
                    params: {
                        language: filters.language,
                    },
                };
            }
            return {
                params: filters,
            };
        },
        [filters],
    );

    const endpoint = !filters.query ? "/trending/movie/week" : "/search/movie";

    const { data, error, isLoading } = useFetch<MovieResponse>(
        endpoint, 
        axiosRequestConfig,
    );

    const handleMovieFilters = useCallback((filters: MovieFilters) => {
        setFilters(filters);
    }, [setFilters]);

    const handleMovieClick = useCallback((movie: Movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedMovie(null);
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="mx-auto max-w-6xl px-4">
                <MovieFilter onChange={handleMovieFilters} />
                <div className="mt-8">
                    {isLoading ? (
                        <div className="flex h-60 items-center justify-center">
                            <p className="text-lg font-semibold text-gray-600">로딩 중입니다...</p>
                        </div>
                    ) : (
                        <MovieList 
                          movies={data?.results || []}
                          onMovieClick={handleMovieClick}
                        />
                    )}
                </div>
                <MovieModal 
                  movie={selectedMovie}
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                />
            </div>
        </div>
    );
}