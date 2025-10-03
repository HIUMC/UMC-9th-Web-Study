import { useEffect, useState } from "react";
import axios from "axios";
import type { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";

export default function MoviePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  //1. 로딩 상태
  const [isPending, setIsPending] = useState(false);
  //2. 에러 상태
  const [isError, setIsError] = useState(false);
  //3. 페이지
  const [page, setPage] = useState(1);

  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsPending(true);
        setIsError(false);
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovies(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovies();
  }, [page, category]);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">Error</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center gap-4 mt-5">
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
          hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300
          disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          {"<"}
        </button>
        <span>{page}</span>
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
          hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300
          disabled:cursor-not-allowed"
          disabled={page === 100}
          onClick={() => setPage((prev) => prev + 1)}
        >
          {">"}
        </button>
      </div>
      {isPending && (
        <div className="flex justify-center items-center h-dvh">
          <LoadingSpinner />
        </div>
      )}
      {!isPending && (
        <div
          className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 
      xl:grid-cols-5 2xl:grid-cols-6 gap-4"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
