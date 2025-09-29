import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieDetailInfo({ movie }: MovieCardProps) {
  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4)
    : "N/A";
  const runningTime = movie.runtime ? `${movie.runtime}분` : "N/A";

  const backgroundImageUrl = movie.poster_path
    ? `url(https://image.tmdb.org/t/p/w1280${movie.poster_path})`
    : "none";
  const tagline = movie.tagline ? movie.tagline : "N/A";

  return (
    <div className="w-full bg-black flex flex-col">
      <div
        className="relative w-full py-15 bg-cover bg-bottom"
        style={{ backgroundImage: backgroundImageUrl }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div className="relative max-w-6xl mx-auto p-1 flex text-left">
          <div className="flex flex-col md:flex-row w-full">
            <div>
              <h1 className="text-4xl font-extrabold mb-3 drop-shadow-lg text-left text-white">
                {movie.title}
              </h1>
              <div className="space-y-4 mb-10 text-left">
                <p className="text-xl text-white">
                  {movie.vote_average?.toFixed(1)} / 10
                </p>
                <p className="text-xl text-white">
                  {movie.popularity?.toFixed(1)}
                </p>
                <p className="text-xl text-white">{releaseYear}</p>
                <p className="text-xl text-white">{runningTime}</p>
                <p className="text-xl text-white">{tagline}</p>
                <p className="text-xl text-white">
                  {movie.overview || "제공된 줄거리 정보가 없습니다."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
