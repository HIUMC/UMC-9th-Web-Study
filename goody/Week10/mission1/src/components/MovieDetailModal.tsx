import { useEffect } from "react";
import type { Movie } from "../types/movie";

interface MovieDetailModalProps {
  movie : Movie | null;
  onClose : () => void;
}
const MovieDetailModal = ({movie, onClose} : MovieDetailModalProps) => {
  useEffect(() => { // 모달이 열렸을 때 백그라운드 스크롤을 방지하기 위함
    if (movie) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [movie]);

  if(!movie) return null;
  
  const handleIMDbSearch = () => {
    if (movie?.title) {
      window.open(
        `https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`,
        "_blank"
      );
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImageUrl = "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fadeIn"
      onClick={handleOverlayClick}
    >
      {/* 모달 카드 박스 */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl animate-scaleIn">
        {/* 닫기 버튼 */}
        <button
          onClick={()=> onClose()}
          className="absolute cursor-pointer right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {/* 상단 포스터 이미지 영역 */}
        <div className="relative h-64 w-full sm:h-80 ">
          <img
            src={movie?.poster_path ? `${imageBaseUrl}${movie.backdrop_path}` : fallbackImageUrl }
            alt={`${movie?.title} 포스터`}
            className="h-full w-full object-cover overflow-hidden"
          />
              
          {/* 이미지 위 그라데이션 (텍스트 가독성용) */}
          <div className="absolute inset-0 bg-gradient-to-top from-black/60 to-transparent" />
            {/* 타이틀 오버레이 (이미지 위에 배치) */}
            <div className="absolute top-[50%] left-6 text-white text-">
              <h2 className="text-3xl font-bold shadow-black drop-shadow-lg">
                {movie?.title}
              </h2>
            </div>
          </div>
          {/* 상세 정보 컨텐츠 영역 */}
          <div className="p-8 flex flex-row gap-8">
            {/* [왼쪽] 포스터 이미지 영역 */}
            <div className="w-1/3 lg:w-1/4 flex-none relative -mt-24 z-10">
              <img
                src={movie?.poster_path ? `${imageBaseUrl}${movie.poster_path}` : fallbackImageUrl}
                alt={`${movie?.title} 포스터`}
                className="w-full rounded-lg shadow-xl border border-gray-100 object-cover"
                style={{ aspectRatio: "2/3" }}
              />
            </div>

            {/*상세 정보 컨텐츠 영역 */}
            <div className="flex-1 flex flex-col">
              <div className="mb-6 flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-yellow-500">★</span>
                  <span>
                    {movie?.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                  </span>
                  <span className="text-gray-400">({movie?.vote_count} 평가)</span>
                </div>
                <div>
                  <span className="font-semibold">개봉일:</span> {movie?.release_date}
                </div>
                <div>
                  <span className="font-semibold">인기도:</span>{" "}
                  {movie?.popularity?.toFixed(0)}
                </div>
              </div>
              {/* 줄거리 */}
              <div className="mb-8">
                <h3 className="mb-2 text-lg font-bold text-gray-800">줄거리</h3>
                <p className="line-clamp-6 leading-relaxed text-gray-600">
                  {movie?.overview || "줄거리 정보가 없습니다."}
                </p>
              </div>
              {/* 하단 버튼 영역 */}
              <div className="flex justify-end gap-3 mt-auto">
                <button
                  onClick={handleIMDbSearch}
                  className="rounded-lg bg-[#f5c518] px-5 py-2.5 text-sm font-bold text-black hover:bg-[#e2b616] transition-colors"
                >
                  IMDb에서 검색
                </button>
                <button
                  onClick={() => onClose()}
                  className="cursor-pointer rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default MovieDetailModal
