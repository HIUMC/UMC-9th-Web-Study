import { memo, useState } from "react";
import { type Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onClick: (movie : Movie) => void;
}

const MovieCard = ({movie, onClick}: MovieCardProps) =>  {
    const moviePath = 'https://image.tmdb.org/t/p/w500';
    const [isHovered, setIsHovered] = useState(false);

  return(
    <div
    className="relative rounded-2xl h-[380px]  shadow-lg px-[8px] cursor-pointer transition-trasnform duration-500 hover:scale-105"
    onMouseEnter={(): void => setIsHovered(true) }
    onMouseLeave={():void => setIsHovered(false)}
    onClick={() => onClick(movie)}
    >
      <div className="w-full h-[370px] flex items-center justify-center">
        <img className=' z-0 w-full h-full object-cover border-gray-500 transition duration-300' src={moviePath + movie.poster_path} alt={movie.title} />
      </div>
  
    {/* {isHovered && (
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-md flex flex-col justify-center items-center text-white p-4">
        <h2 className="text-lg font-bold text-center leading-snug">{movie.title}</h2>
        <p className="text-sm text-gray-300 leading-relaxed mt-3 line-clamp-5">{movie.overview}</p>
      </div>
    )} */}
    </div>
  )
}

export default memo(MovieCard)