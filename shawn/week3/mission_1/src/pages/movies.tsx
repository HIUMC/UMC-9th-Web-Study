import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/movie";
import axios from "axios";

const MoviesPage = () => {
  // 영화 데이터를 저장할 상태 (빈 배열로 시작)
  const [movies, setMovies] = useState<Movie[]>([]);
  // 로딩 상태 (처음에는 true)
  const [loading, setLoading] = useState(true);
  // 에러 메시지를 저장할 상태 (처음에는 null)
  const [error, setError] = useState<string | null>(null);

  // 컴포넌트가 처음 마운트될 때 실행되는 useEffect
  useEffect(() => {
    // 영화 데이터를 가져오는 비동기 함수
    const fetchMovies = async () => {
      try {
        // 로딩 시작
        setLoading(true);

        // TMDB API에서 인기 영화 데이터 가져오기
        const { data } = await axios.get<MovieResponse>(
          "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
          {
            headers: {
              // 환경변수에서 가져온 TMDB 토큰 사용
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );

        // 성공적으로 가져온 영화 데이터를 상태에 저장
        setMovies(data.results);
        console.log("영화 데이터 불러오기 성공:", data.results); // 데이터 확인용 로그
      } catch (err) {
        // 에러 발생 시 에러 메시지 설정
        console.error("영화 데이터 불러오기 실패:", err);
        setError("영화 데이터를 불러오는 데 실패했습니다.");
      } finally {
        // 성공/실패 관계없이 로딩 상태를 false로 변경
        setLoading(false);
      }
    };

    // 함수 실행
    fetchMovies();
  }, []); // 빈 의존성 배열 = 컴포넌트가 처음 렌더링될 때 한 번만 호출

  // 로딩 중일 때 보여줄 UI
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          {/* 회전하는 로딩 스피너 */}
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">영화 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러가 발생했을 때 보여줄 UI
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-red-500">
        <div className="text-center">
          {/* 에러 메시지 표시 */}
          <p className="text-xl">{error}</p>
          {/* 페이지 새로고침 버튼 */}
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white border-none rounded cursor-pointer hover:bg-red-700"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  // 메인 영화 목록 UI
  return (
    <div className="min-h-screen bg-white p-8 grid grid-cols-5 gap-6">
      {/* 영화 데이터를 순회하며 카드 생성 */}
      {movies.map((movie) => (
        <div
          key={movie.id} // React key (고유 식별자)
          className="relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 group"
        >
          {/* 영화 포스터 이미지 */}
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` // TMDB 이미지 URL
                : "https://via.placeholder.com/300x450/f3f4f6/9ca3af?text=No+Image" // 이미지 없을 때 플레이스홀더
            }
            alt={movie.title} // 접근성을 위한 alt 텍스트
            className="w-full h-auto object-cover transition-all duration-300 group-hover:blur-sm"
          />

          {/* 호버 시 나타나는 오버레이 (제목과 줄거리) */}
          <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
            {/* 영화 제목 */}
            <h2 className="text-xl font-bold mb-2 line-clamp-2">
              {movie.title}
            </h2>
            {/* 영화 줄거리 (4줄로 제한) */}
            <p className="text-sm line-clamp-4">{movie.overview}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoviesPage;
