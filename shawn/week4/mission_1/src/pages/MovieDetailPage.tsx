import { useParams } from "react-router-dom";
import { LoadingSpinner, ErrorMessage } from "../components/LoadingSpinner";
import type { MovieDetail } from "../types/moviedetail";
import { useCustomFetch } from "../hooks/useCustomFetch";

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();

  const {
    data: movie,
    loading,
    error,
    refetch,
  } = useCustomFetch<MovieDetail>(
    movieId
      ? `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
      : null
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <LoadingSpinner size="lg" message="영화 정보를 불러오는 중..." />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <ErrorMessage
          message="영화 정보를 불러올 수 없습니다."
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* 히어로 섹션 */}
      <div
        className="relative h-[70vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-end pb-12">
          <div className="flex gap-8 max-w-7xl">
            {/* 포스터 */}
            <div className="flex-shrink-0">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-64 h-96 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* 영화 정보 */}
            <div className="flex-1 flex flex-col justify-end">
              <h1 className="text-5xl font-bold mb-3 leading-tight">
                {movie.title}
              </h1>
              <p className="text-2xl text-gray-300 mb-4 font-light">
                {movie.original_title}
              </p>
              {movie.tagline && (
                <p className="text-xl italic text-yellow-400 mb-6 font-light">
                  "{movie.tagline}"
                </p>
              )}

              {/* 평점 및 기본 정보 */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-2 rounded-full font-bold text-lg">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="text-gray-300 text-lg">
                    ({movie.vote_count.toLocaleString()}명 평가)
                  </span>
                </div>
                <div className="flex items-center gap-4 text-gray-300 text-lg">
                  <span>⏱️ {movie.runtime}분</span>
                  <span>📅 {new Date(movie.release_date).getFullYear()}</span>
                </div>
              </div>

              {/* 장르 */}
              <div className="flex flex-wrap gap-3 mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-full text-sm font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-200"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 상세 정보 섹션 */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* 줄거리 */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
                📖 줄거리
              </h2>
              <p className="text-gray-200 leading-relaxed text-lg">
                {movie.overview}
              </p>
            </div>
          </div>

          {/* 추가 정보 */}
          <div className="space-y-8">
            {/* 제작 정보 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                🎬 제작 정보
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm mb-1">제작사</span>
                  <span className="text-white font-medium">
                    {movie.production_companies
                      .map((company) => company.name)
                      .join(", ")}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm mb-1">제작국</span>
                  <span className="text-white font-medium">
                    {movie.production_countries
                      .map((country) => country.name)
                      .join(", ")}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm mb-1">언어</span>
                  <span className="text-white font-medium">
                    {movie.spoken_languages.map((lang) => lang.name).join(", ")}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm mb-1">상영시간</span>
                  <span className="text-white font-medium">
                    {movie.runtime}분
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm mb-1">개봉일</span>
                  <span className="text-white font-medium">
                    {new Date(movie.release_date).toLocaleDateString("ko-KR")}
                  </span>
                </div>
              </div>
            </div>

            {/* 공식 홈페이지 */}
            {movie.homepage && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  🌐 공식 홈페이지
                </h3>
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105"
                >
                  🔗 공식 홈페이지 방문
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
