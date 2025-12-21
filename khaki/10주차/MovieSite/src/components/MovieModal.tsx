import type { Movie } from "../types/movie";

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie;
}

const MovieModal = ({ isOpen, onClose, movie }: MovieModalProps) => {
  if (!isOpen) return null;

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImage = "https://via.placeholder.com/500x750/1f2937/ffffff?text=No+Poster";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* X 버튼 */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute right-4 top-4 z-10 text-3xl text-white drop-shadow-lg hover:text-gray-200"
        >
          ×
        </button>

        {/* 상단: Backdrop 이미지 (2/5) */}
        <div className="relative h-64 w-full flex-shrink-0">
          <img
            src={movie.backdrop_path ? imageBaseUrl + movie.backdrop_path : fallbackImage}
            alt={movie.title}
            className="h-full w-full object-cover"
          />
          {/* 하단 그라데이션 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          {/* 제목 */}
          <h2 className="absolute bottom-4 left-6 z-10 text-4xl font-bold text-white">{movie.title}</h2>
        </div>

        {/* 하단: 콘텐츠 (3/5) */}
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-8 md:flex-row">
          {/* 왼쪽: 포스터 이미지 */}
          <div className="flex-shrink-0">
            <img
              src={movie.poster_path ? imageBaseUrl + movie.poster_path : fallbackImage}
              alt={movie.title}
              className="h-auto w-64 rounded-lg shadow-lg"
            />
          </div>

          {/* 오른쪽: 영화 정보 */}
          <div className="flex flex-1 flex-col gap-4">
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold">개봉일:</span> {movie.release_date}
              </p>
              <p>
                <span className="font-semibold">평점:</span> ⭐ {movie.vote_average.toFixed(1)}
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">줄거리</h3>
              <p className="leading-relaxed text-gray-700">
                {movie.overview.length > 300 ? movie.overview.slice(0, 300) + "..." : movie.overview}
              </p>
            </div>

            {/* 버튼 */}
            <div className="mt-auto flex gap-3">
              <a
                href={`https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg bg-yellow-500 px-6 py-2.5 text-center text-sm font-semibold text-black transition-colors hover:bg-yellow-600"
              >
                IMDB에서 검색
              </a>
              <button
                onClick={onClose}
                className="flex-1 rounded-lg bg-gray-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-600"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
