import type { Movie } from "../types/movie";

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  if (!movie) return null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "";

  const imdbUrl = `https://www.imdb.com/find?q=${encodeURIComponent(
    movie.title
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="relative w-[800px] h-200 overflow-hidden rounded-2xl bg-zinc-900 text-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {posterUrl && (
          <img
            src={posterUrl}
            alt={movie.title}
            className="h-[400px] w-full object-cover"
          />
        )}

        <div className="space-y-3 p-10">
          <h2 className="text-3xl font-bold">{movie.title}</h2>

          <div className="flex pt-2 items-center gap-2 text-sm text-zinc-300">
            <span>{movie.vote_average.toFixed(1)}</span>
            <span>•</span>
            <span>{movie.release_date}</span>
          </div>

          <p className="text-md leading-relaxed text-zinc-200 pt-7">
            {movie.overview}
          </p>

          <div className="flex flex-row gap-10 pt-10">
            <a
              href={imdbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-200 block rounded-lg bg-yellow-400 py-2 text-center font-semibold text-black transition hover:bg-yellow-300"
            >
              IMDb에서 검색하기
            </a>
            <div className="flex justify-center items-ceter w-100 bg-white text-black rounded-lg font-bold">
              <button onClick={onClose} className="">
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
