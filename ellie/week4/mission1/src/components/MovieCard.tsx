import { useState } from "react";
import type { Movie } from "../types/movie"
import { useNavigate} from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({movie}:MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  // 컴포넌트 안에서 페이지 이동 할 수 있는 함수를 돌려줌
  const navigate = useNavigate();
  // /movie/${movie.id} , movie.id 값이 문자열 안에 들어가서 URL이 만들어짐
  return( 
  <div 
    onClick={() => navigate(`/movie/${movie.id}`)}
    className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer w-44 transition-transform duration-500 hover:scale-105" 
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <img 
      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
      alt={`${movie.title}의 이미지`}    
      className=""
    />

    {isHovered && (
      <div className="absolute inset-0 bg-gradient-to-t from-black/50
       to-transparent backdrop-blur-md flex flex-col justify-center item-center p-4 text-white">
        <h2 className="text-lg font-bold leading-snug">{movie.title}</h2>
        <p className="text-sm text-gray-300 leading-relaxed mt-2 line-clamp-5">{movie.overview}</p>
      </div>
    )}
  </div>
  );
}