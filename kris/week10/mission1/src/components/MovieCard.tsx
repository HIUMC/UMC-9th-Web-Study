import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImageUrl = "https://via.placeholder.com/500x750?text=No+Image";
  return (
    <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg ">
      <div className="overflow-hidden relative h-80">
        <img
          src={
            movie.poster_path
              ? `${imageBaseUrl}${movie.poster_path}`
              : fallbackImageUrl
          }
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
        <div className="absolute right-2 top-2 rounded-md px-2 py-1 text-sm font-bold text-white bg-black">
          {movie.vote_average.toFixed(1)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold">{movie.title}</h3>
        <p className="text-sm text-gray-600">{movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
