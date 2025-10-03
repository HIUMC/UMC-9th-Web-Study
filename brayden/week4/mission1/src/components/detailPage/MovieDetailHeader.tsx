import type { MovieDetails } from "../../types/movie";

interface MovieDetailHeaderProps {
  movie: MovieDetails;
}

export default function MovieDetailHeader({ movie }: MovieDetailHeaderProps) {
  return (
    <div className="relative w-full rounded-lg overflow-hidden border-b-5 border-gray-500">
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
        className="h-[400px] w-full object-cover"
      />
      <div className="absolute top-4 left-5 text-white max-w-150 ">
        <h1 className="text-3xl font-bold mt-2 mb-2">{movie.title}</h1>
        <p className="text-m ">{movie.vote_average.toFixed(1)}</p>
        <p className="text-m">{movie.release_date}</p>
        <p>{movie.runtime}분</p>
        <p className="text-2xl font-semibold italic mt-1 mb-4">
          {movie.tagline}
        </p>
        <p className="line-clamp-5 max-w-[60%]">{movie.overview}</p>
      </div>
    </div>
  );
}
