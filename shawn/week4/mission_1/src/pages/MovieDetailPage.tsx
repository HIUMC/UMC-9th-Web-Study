import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";
import type { MovieDetail } from "../types/moviedetail";

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        console.log("Fetching movie detail for ID:", movieId);
        console.log("Token:", import.meta.env.VITE_TMDB_TOKEN);
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        console.log("Movie data received:", data);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie detail:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetail();
    }
  }, [movieId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-2xl">
          영화 정보를 불러올 수 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 배경 이미지 */}
      <div
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-8">
          <div className="flex gap-6">
            {/* 포스터 */}
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-48 h-72 object-cover rounded-lg shadow-2xl"
            />
            {/* 영화 정보 */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
              <p className="text-xl text-gray-300 mb-4">
                {movie.original_title}
              </p>
              {movie.tagline && (
                <p className="text-lg italic text-yellow-400 mb-4">
                  "{movie.tagline}"
                </p>
              )}
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-yellow-500 text-black px-3 py-1 rounded-full font-bold">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-300">
                  ({movie.vote_count}명 평가)
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-300">{movie.runtime}분</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-300">{movie.release_date}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-purple-600 px-3 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 상세 정보 */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 줄거리 */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">줄거리</h2>
            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
          </div>

          {/* 추가 정보 */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-3">제작 정보</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-gray-400">제작사:</span>
                  <span className="ml-2">
                    {movie.production_companies
                      .map((company) => company.name)
                      .join(", ")}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">제작국:</span>
                  <span className="ml-2">
                    {movie.production_countries
                      .map((country) => country.name)
                      .join(", ")}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">언어:</span>
                  <span className="ml-2">
                    {movie.spoken_languages.map((lang) => lang.name).join(", ")}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">상영시간:</span>
                  <span className="ml-2">{movie.runtime}분</span>
                </div>
                <div>
                  <span className="text-gray-400">개봉일:</span>
                  <span className="ml-2">{movie.release_date}</span>
                </div>
              </div>
            </div>

            {movie.homepage && (
              <div>
                <h3 className="text-xl font-bold mb-3">공식 홈페이지</h3>
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  공식 홈페이지 방문
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
