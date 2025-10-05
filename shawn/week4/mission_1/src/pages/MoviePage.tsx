import { useState } from "react";
import type { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner, ErrorMessage } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import { useCustomFetch } from "../hooks/useCustomFetch";

interface MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export default function MoviePage() {
  const [page, setPage] = useState(1);
  const { category } = useParams<{ category: string }>();

  const { data, loading, error, refetch } = useCustomFetch<MovieResponse>(
    category
      ? `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`
      : null
  );

  const movies = data?.results || [];

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage
          message="영화 목록을 불러오는 중 오류가 발생했습니다."
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* 페이지네이션 */}
      <div className="flex justify-center items-center gap-4 mt-8 mb-8">
        <button
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg
          hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:bg-gray-300
          disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          ← 이전
        </button>
        <div className="bg-white px-6 py-3 rounded-xl shadow-lg">
          <span className="text-gray-700 font-semibold">{page} 페이지</span>
        </div>
        <button
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg
          hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:bg-gray-300
          disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
          disabled={page === 100}
          onClick={() => setPage((prev) => prev + 1)}
        >
          다음 →
        </button>
      </div>

      {/* 로딩 상태 */}
      {loading && (
        <div className="flex justify-center items-center min-h-[60vh]">
          <LoadingSpinner size="lg" message="영화 목록을 불러오는 중..." />
        </div>
      )}

      {/* 영화 그리드 */}
      {!loading && (
        <div className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
