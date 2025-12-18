import type { Movie } from "../types/movie";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const backdropBaseUrl = "https://image.tmdb.org/t/p/original";
  const fallbackImageUrl = "https://via.placeholder.com/500x750?text=No+Image";

  const handleIMDbSearch = () => {
    const searchQuery = encodeURIComponent(movie.title);
    window.open(`https://www.imdb.com/find?q=${searchQuery}`, "_blank");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      aria-modal="true"
    >
      <div className="relative mx-4 max-h-[90vh] w-full max-w-4xl rounded-lg bg-white shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-all hover:bg-black/70"
        >
          X
        </button>
        <div className="relative h-64 w-full overflow-hidden">
          <img
            src={
              movie.backdrop_path
                ? `${backdropBaseUrl}${movie.backdrop_path}`
                : fallbackImageUrl
            }
            alt={movie.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="text-2xl font-bold">{movie.title}</h2>
            {movie.original_title && movie.original_title !== movie.title && (
              <p className="text-sm text-gray-300">{movie.original_title}</p>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex-shrink-0">
              <div className="relative w-48">
                <img
                  src={
                    movie.poster_path
                      ? `${imageBaseUrl}${movie.poster_path}`
                      : fallbackImageUrl
                  }
                  alt={movie.title}
                  className="w-full rounded-lg shadow-lg"
                />
                <div className="absolute -top-3 -right-3 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 shadow-lg">
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">
                      {movie.vote_average.toFixed(1)}
                    </div>
                    <div className="text-xs text-blue-200">
                      ({movie.vote_count})
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-gray-400">
                  개봉일
                </h3>
                <p className="text-lg">
                  {movie.release_date
                    ? new Date(movie.release_date).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "정보 없음"}
                </p>
              </div>
              {movie.popularity && (
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-gray-400">
                    인기도
                  </h3>
                  <p className="text-lg">{movie.popularity.toFixed(0)}</p>
                </div>
              )}
              <div>
                <h3 className="mb-2 text-sm font-semibold text-gray-400">
                  줄거리
                </h3>
                <p className="leading-relaxed text-gray-300">
                  {movie.overview || "줄거리 정보가 없습니다."}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={handleIMDbSearch}
              className="rounded-md bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              IMDb에서 검색
            </button>
            <button
              onClick={onClose}
              className="rounded-md bg-gray-700 px-6 py-2 font-semibold text-white transition-colors hover:bg-gray-600"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
