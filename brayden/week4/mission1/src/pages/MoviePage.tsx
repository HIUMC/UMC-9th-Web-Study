import { useState } from "react";
import type { MovieResponse } from "../types/movie";
import MovieCard from "../components/mainPage/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import MoviePageButton from "../components/mainPage/MoviePageButton";

export default function MoviePage() {
  const [page, setPage] = useState(1);

  const params = useParams<{ category: string }>();

  const url = `https://api.themoviedb.org/3/movie/${params.category}?language=en-US&page=${page}`;

  const {
    data: MovieResponse,
    isPending,
    isError,
  } = useCustomFetch<MovieResponse>(url);

  if (isError) {
    return (
      <div className="text-red-500 text-2xl">
        <span>에러가 발생했습니다. </span>
      </div>
    );
  }
  console.log("isPending : ", isPending);
  return (
    <>
      <MoviePageButton page={page} setPage={setPage} />

      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {MovieResponse?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
