import { useState } from "react";
import type { Movie } from "../types/movie"
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie : Movie
}


const MovieCard = ({movie} : MovieCardProps) => {
  const [isHovered,setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => navigate(`/movies/now_playing/${movie.id}`)}
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
        </div>) // 가독성을 위해 소괄호로 한번 묶어줌!
        }
    </div>
    // 그저 경로에 있는 이미지 경로만 붙이면 안띄워짐, tmdb같은 경우 앞에 저걸 붙여줘야 함!!
    // 위의 w뒤에 붙는 수가 이미지의 width임! 애초에 서버가 원본을 리사이징해서 반환해주어 성능 최적화에 도움됨
  )
}

export default MovieCard
