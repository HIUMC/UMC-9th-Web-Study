import { useState } from "react";
import type { Movie } from "../types/movie";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 
      hover:scale-105"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className=""
      />

      {isHover && (
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-md flex
        flex-col justify-center items-center text-white p-4"
        >
          <h2 className="text-2xl font-bold leading-snug">{movie.title}</h2>
          <p className="text-gray text-sm leading-relaxed mt-2 line-clamp-3">
            {movie.overview}
          </p>
        </div>
      )}
    </div>
  );
}
