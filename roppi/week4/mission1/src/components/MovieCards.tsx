import { useState } from "react";
import { type Movie } from "../types/movie";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({movie}: MovieCardProps) {
    const moviePath = 'https://image.tmdb.org/t/p/w500';
    const [isHovered, setIsHovered]=useState(false);
      const navigate = useNavigate();
    const handleClick = () => {
      navigate(`/movies/popular/${movie.id}`); // 영화 상세 페이지로 이동
    };  

  return(
    <div
    className="relative rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-trasnform duration-500 hover:scake-105"
    onMouseEnter={(): void => setIsHovered(true) }
    onMouseLeave={():void => setIsHovered(false)}
    onClick={handleClick} // 카드 전체 클릭으로 이동

    >
      <img className='border border-gray-500 rounded-2xl overflow-hidden  min-h-[345px] transition duration-300 hover:blur-sm' src={moviePath + movie.poster_path} alt={movie.title} />
    {isHovered && (
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-md flex flex-col justify-center items-center text-white p-4">
        <h2 className="text-lg font-bold text-center leading-snug">{movie.title}</h2>
        <p className="text-sm text-gray-300 leading-relaxed mt-3 line-clamp-5">{movie.overview}</p>
      </div>
    )}
    </div>
  )
}