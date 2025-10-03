import { useState } from "react";
import type { Movie } from "../types/movie";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      // onClick={() => (window.location.href = `/movies/now_playing/${movie.id}`)}
      // 자바스크립트 코드를 한번 더 받아옴. 처음에 모든 스크립트를 받아오는데 계속 받아오는중
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer w-44
      transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={`${movie.title} 영화의 이미지`}
        className=""
      />

      {isHovered && (
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/50 
        to-transparent backdrop-blur-md flex flex-col justify-center items-center
         text-white p-4"
        >
          <h2 className="text-lg font-bold leading-snug">{movie.title}</h2>
          <p className="text-sm text-gray-300 leading-relaxed mt-2 line-clamp-5">
            {movie.overview}
          </p>
        </div>
      )}
    </div>
  );
}
