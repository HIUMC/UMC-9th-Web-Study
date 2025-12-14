import { useEffect, useMemo } from "react";
import type { MoiveLanguage, Movie, MovieDetail } from "../types/movies";
import useFetch from "../hooks/useFetch";

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  language: MoiveLanguage;
}

const MovieModal = ({ movie, isOpen, onClose, language }: MovieModalProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w1280";
  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImage = "https://via.placeholder.com/1280x720?text=No+Image";

  const fetchOptions = useMemo(
    () => ({
      params: {
        language: language,
      },
    }),
    [language]
  );

  const { data: detailData, isLoading } = useFetch<MovieDetail>(
    isOpen && movie ? `/movie/${movie.id}` : "",
    fetchOptions
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !movie) return null;

  const displayData = detailData || (movie as unknown as MovieDetail);
  const imdbUrl = displayData.imdb_id
    ? `https://www.imdb.com/title/${displayData.imdb_id}`
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-60 p-4 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white shadow-2xl scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 w-full md:h-80">
          <img
            src={
              displayData.backdrop_path
                ? `${imageBaseUrl}${displayData.backdrop_path}`
                : fallbackImage
            }
            alt={`${displayData.title} 배경`}
            className="h-full w-full object-cover"
          />
          {/* 닫기 버튼 (X) */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full text-black transition-colors hover:bg-black/70"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {/* 그라데이션 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        </div>

        {/* --- 2. 중간: 컨텐츠 영역 (포스터 + 상세정보) --- */}
        <div className="relative -mt-16 px-6 pb-6 md:px-10">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* 좌측: 포스터 (요청하신대로 중간에 첨부) */}
            <div className="flex-shrink-0">
              <img
                src={
                  displayData.poster_path
                    ? `${posterBaseUrl}${displayData.poster_path}`
                    : fallbackImage
                }
                alt={`${displayData.title} 포스터`}
                className="mx-auto h-auto w-48 rounded-lg shadow-xl md:w-64"
              />
            </div>

            {/* 우측: 텍스트 정보 */}
            <div className="flex-1 pt-4 md:pt-16">
              <h2 className="mb-2 text-3xl font-bold text-gray-800">
                {displayData.title}
              </h2>

              {/* 태그라인 (존재할 경우) */}
              {detailData?.tagline && (
                <p className="mb-3 text-lg font-medium italic text-gray-500">
                  "{detailData.tagline}"
                </p>
              )}

              {/* 메타 정보 (평점, 시간, 장르) */}
              <div className="mb-6 flex flex-wrap items-center gap-3 text-sm font-medium text-gray-600">
                <span className="flex items-center text-yellow-500">
                  ⭐ {displayData.vote_average.toFixed(1)}
                </span>
                {detailData?.runtime && <span>⏰ {detailData.runtime}분</span>}
                {displayData.release_date && (
                  <span>📅 {displayData.release_date}</span>
                )}
              </div>

              {/* 장르 태그 */}
              <div className="mb-6 flex flex-wrap gap-2">
                {detailData?.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* 개요 */}
              <h3 className="mb-2 text-xl font-semibold text-gray-800">개요</h3>
              <p className="mb-8 leading-relaxed text-gray-700">
                {displayData.overview || "등록된 개요가 없습니다."}
              </p>

              {/* --- 3. 하단: 버튼 영역 --- */}
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                {/* IMDb 버튼 */}
                {imdbUrl ? (
                  <a
                    href={imdbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-[#F5C518] px-5 py-2.5 font-bold text-black transition-colors hover:bg-[#E2B616]"
                  >
                    IMDb 연결
                  </a>
                ) : (
                  /* 로딩 중이거나 ID가 없을 때 비활성화 버튼 */
                  <button
                    disabled
                    className="inline-flex cursor-not-allowed items-center justify-center rounded-lg bg-gray-200 px-5 py-2.5 font-bold text-gray-400"
                  >
                    {isLoading ? "정보 불러오는 중..." : "IMDb 정보 없음"}
                  </button>
                )}

                {/* 닫기 버튼 */}
                <button
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
