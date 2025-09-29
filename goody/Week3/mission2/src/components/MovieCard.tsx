import { useState } from "react";
import type { Movie } from "../types/movie";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
    movie : Movie;
}


export default function MovieCard({ movie } : MovieCardProps) {

    const [isHoverd, setIsHoverd] = useState(false);

    // 무비 상세페이지로 이동 시켜주기 위한 onclick 
    // onClick={() => (window.location.href = `/movies/now_playing/${movie.id}`)}
    // => 새로고침 ( js 번들 다시 불러옴 => 메모리 낭비)

    // 컴포넌트만 변경하는 방식 navigate!
    const navigate = useNavigate();



    return (
        <div 
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer w-44
            transition-transform duration-500 hover:scale-105" 
            onMouseEnter={() => setIsHoverd(true)}
            onMouseLeave={() => setIsHoverd(false)}
        >
            <img 
                src={`http://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                alt={`${movie.title} 영화의 이미지`} 
                className=""
                />
            {isHoverd && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-md 
                flex flex-col justify-center items-center text-white p-4">
                    <h2 className="text-lg font-bold leading-snug">{movie.title}</h2>
                    <p className="text-sm text-gray-300 leading-relaxed mt-2 line-clamp-5">{movie.overview}</p>
                </div>
            )}
        </div>
    )
}
