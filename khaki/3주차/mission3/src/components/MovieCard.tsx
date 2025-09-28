import { useState } from "react";
import type { Movie } from "../types/movie"
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie : Movie
}


const MovieCard = ({movie} : MovieCardProps) => {
  const [isHovered,setIsHovered] = useState(false);
  const navigate = useNavigate();
  // navigate: 브라우저 전체 리로드 없이 주소(URL)를 바꾸어 라우터 매칭을 트리거하는 명령형(프로그램적) 내비게이션 함수.
  
  return (
    <div 
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="relative rounded-xl shadow-hidden overflow-hidden cursor-pointer w-44 transition-transform duration-500 hover:scale-105"
      onMouseEnter={():void => setIsHovered(true)}  
      // 마우스 포인터가 요소 위에 올라갔을 때 isHovered는 true
      onMouseLeave={():void => setIsHovered(false)}
      // 마우스 포인터가 요소 밖으로 나왔을 때 isHovered는 false
    >
      <img 
      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
      alt={`${movie.title} 영화의 이미지`}
      />
      
      {isHovered && (
        <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-md flex flex-col justify-center items-center text-white p-4'>
          <h2 className="text-lg font-bold leading-snug">{movie.title}</h2>
          <p className="text-sm text-gray-300 leading-relaxed mt-2 line-clamp-5">{movie.overview}</p>
        </div>)
        }
    </div>
  )
}

export default MovieCard
