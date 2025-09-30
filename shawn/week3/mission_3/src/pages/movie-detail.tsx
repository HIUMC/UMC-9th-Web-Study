import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import type { MovieDetails, Credits } from "../types/movie";
import CastSection from "../components/CastSection";
import ProductionSection from "../components/ProductionSection";

const MovieDetail = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!movieId) return;

      try {
        setLoading(true);
        setError(null);

        // 영화 상세 정보와 크레딧을 병렬로 가져오기
        const [movieResponse, creditsResponse] = await Promise.all([
          axios.get<MovieDetails>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
              },
            }
          ),
          axios.get<Credits>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
              },
            }
          ),
        ]);

        setMovieDetails(movieResponse.data);
        setCredits(creditsResponse.data);
      } catch (err) {
        console.error("영화 데이터 불러오기 실패:", err);
        setError("영화 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  // 로딩 상태
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-400 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">영화 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error || !movieDetails) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-xl mb-4 text-red-600">
            {error || "영화 정보를 찾을 수 없습니다."}
          </p>
          <Link
            to="/movies/popular"
            className="inline-block px-6 py-3 bg-gradient-to-r from-pink-300 to-pink-400 text-white rounded-lg hover:from-pink-400 hover:to-pink-500 transition-colors"
          >
            영화 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  // 감독 추출
  const director = credits?.crew.find((person) => person.job === "Director");

  return (
    <div className="relative">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 rounded-lg"
        style={{
          backgroundImage: movieDetails.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})`
            : "none",
        }}
      ></div>

      <div className="relative z-10 bg-white bg-opacity-90 rounded-lg p-8 shadow-lg">
        {/* 뒤로가기 버튼 */}
        <Link
          to="/movies/popular"
          className="inline-flex items-center text-gray-700 hover:text-pink-500 transition-colors mb-6"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          영화 목록으로 돌아가기
        </Link>

        {/* 영화 정보 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* 포스터 */}
          <div className="lg:col-span-1">
            <img
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                  : "https://via.placeholder.com/300x450/1f2937/9ca3af?text=No+Image"
              }
              alt={movieDetails.title}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>

          {/* 영화 정보 */}
          <div className="lg:col-span-2 text-gray-800">
            <h1 className="text-4xl font-bold mb-4">{movieDetails.title}</h1>

            {/* 기본 정보 */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-lg">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-yellow-400 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold">
                  {movieDetails.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-500">/10</span>
              </div>

              <span className="text-gray-500">•</span>
              <span>{new Date(movieDetails.release_date).getFullYear()}</span>
              <span className="text-gray-500">•</span>
              <span>{movieDetails.runtime}분</span>
            </div>

            {/* 장르 */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movieDetails.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-gradient-to-r from-pink-300 to-pink-400 text-white rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* 줄거리 */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">줄거리</h2>
              <p className="text-lg leading-relaxed text-gray-600">
                {movieDetails.overview || "줄거리 정보가 없습니다."}
              </p>
            </div>

            {/* 감독 정보 */}
            {director && (
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">감독</h3>
                <p className="text-lg text-gray-600">{director.name}</p>
              </div>
            )}
          </div>
        </div>

        {/* 출연진 섹션 */}
        <CastSection credits={credits} />

        {/* 제작사 정보 */}
        <ProductionSection movieDetails={movieDetails} />
      </div>
    </div>
  );
};

export default MovieDetail;
