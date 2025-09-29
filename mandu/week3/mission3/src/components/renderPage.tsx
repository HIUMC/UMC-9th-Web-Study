import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie";

const RenderPage = ({ movies }: { movies: Movie[] }) => {
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

    const nav = useNavigate()
    const handleClick = (movieId:number) => {
      nav(`/movie/${movieId}`);
    }
    
    return (
    <ul className="grid grid-cols-5 gap-6">
      {/* 옵셔널 체인 활용 */}
      {movies?.map((movie) => (
        <li key={movie.id} className='group relative w-[200px] h-[286px] rounded-xl overflow-hidden'>
          <div onClick={() => handleClick(movie.id)} className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-50 opacity-0 transition-all group-hover:opacity-100 group-hover:z-100">
            <h1 className="text-center text-lg font-bold text-white">
              {movie.title}
            </h1>
            <p className='mt-2 text-center text-xs text-white'>
              {movie.overview.length > 200 ? `${movie.overview.slice(0, 200)}...`: movie.overview}
            </p>
          </div>
          <img alt={`${movie.title} 포스터`} src={`${IMAGE_BASE_URL}${movie.poster_path}`} className="h-full w-full object-cover transition-all duration-300 group-hover:blur-sm group-hover:scale-110" />
        </li>
      ))}
    </ul>
    )
} 

export default RenderPage;