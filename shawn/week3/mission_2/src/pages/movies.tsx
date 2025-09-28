import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/movie";
import axios from "axios";

interface MoviesPageProps {
  category: string;
}

const MoviesPage = ({ category }: MoviesPageProps) => {
  // 영화 데이터를 저장할 상태 (빈 배열로 시작)
  const [movies, setMovies] = useState<Movie[]>([]);
  // 로딩 상태 (처음에는 true)
  const [loading, setLoading] = useState(true);
  // 에러 메시지를 저장할 상태 (처음에는 null)
  const [error, setError] = useState<string | null>(null);
  // 현재 페이지 번호
  const [currentPage, setCurrentPage] = useState(1);
  // 전체 페이지 수
  const [totalPages, setTotalPages] = useState(1);
  // 각 이미지의 로딩 상태
  const [imageLoading, setImageLoading] = useState<{ [key: number]: boolean }>(
    {}
  );

  // 카테고리별 API 엔드포인트 매핑
  const getApiEndpoint = (category: string) => {
    const baseUrl = "https://api.themoviedb.org/3/movie";
    switch (category) {
      case "popular":
        return `${baseUrl}/popular`;
      case "upcoming":
        return `${baseUrl}/upcoming`;
      case "top_rated":
        return `${baseUrl}/top_rated`;
      case "now_playing":
        return `${baseUrl}/now_playing`;
      default:
        return `${baseUrl}/popular`;
    }
  };

  // 컴포넌트가 처음 마운트되거나 category, currentPage가 변경될 때 실행되는 useEffect
  useEffect(() => {
    // 영화 데이터를 가져오는 비동기 함수
    const fetchMovies = async () => {
      try {
        // 로딩 시작
        setLoading(true);
        // 에러 상태 초기화
        setError(null);

        // TMDB API에서 영화 데이터 가져오기
        const { data } = await axios.get<MovieResponse>(
          `${getApiEndpoint(category)}?language=ko-KR&page=${currentPage}`,
          {
            headers: {
              // 환경변수에서 가져온 TMDB 토큰 사용
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );

        // 성공적으로 가져온 영화 데이터를 상태에 저장
        setMovies(data.results);
        setTotalPages(data.total_pages);
        // 새로운 영화 데이터가 로드될 때 모든 이미지 로딩 상태를 true로 설정
        const initialImageLoading: { [key: number]: boolean } = {};
        data.results.forEach((movie) => {
          initialImageLoading[movie.id] = true;
        });
        setImageLoading(initialImageLoading);
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
  }, [category, currentPage]); // category와 currentPage가 변경될 때마다 호출

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

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // 페이지 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 이미지 로딩 시작 핸들러
  const handleImageLoadStart = (movieId: number) => {
    setImageLoading((prev) => ({ ...prev, [movieId]: true }));
  };

  // 이미지 로딩 완료 핸들러
  const handleImageLoad = (movieId: number) => {
    setImageLoading((prev) => ({ ...prev, [movieId]: false }));
  };

  // 메인 영화 목록 UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-green-50">
      {/* 카테고리 제목 */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          {category === "popular" && "인기 영화"}
          {category === "upcoming" && "개봉 예정"}
          {category === "top_rated" && "평점 높은 영화"}
          {category === "now_playing" && "상영 중인 영화"}
        </h1>

        {/* 영화 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
          {movies.map((movie) => (
            <div
              key={movie.id} // React key (고유 식별자)
              className="relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 group"
            >
              {/* 이미지 로딩 스피너 */}
              {imageLoading[movie.id] && (
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-green-100 flex items-center justify-center z-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-300 border-t-pink-500"></div>
                </div>
              )}

              {/* 영화 포스터 이미지 */}
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` // TMDB 이미지 URL
                    : "https://via.placeholder.com/300x450/f3f4f6/9ca3af?text=No+Image" // 이미지 없을 때 플레이스홀더
                }
                alt={movie.title} // 접근성을 위한 alt 텍스트
                className="w-full h-auto object-cover transition-all duration-300 group-hover:blur-sm"
                onLoadStart={() => handleImageLoadStart(movie.id)}
                onLoad={() => handleImageLoad(movie.id)}
                onError={() => handleImageLoad(movie.id)}
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

        {/* 페이지네이션 */}
        <div className="flex justify-center items-center space-x-4">
          {/* 이전 페이지 버튼 */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-300 to-pink-400 text-white hover:from-pink-400 hover:to-pink-500"
            }`}
          >
            이전
          </button>

          {/* 현재 페이지 번호 */}
          <div className="px-4 py-2 bg-gradient-to-r from-green-300 to-green-400 text-white rounded-md font-medium">
            {currentPage}
          </div>

          {/* 다음 페이지 버튼 */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-300 to-pink-400 text-white hover:from-pink-400 hover:to-pink-500"
            }`}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
