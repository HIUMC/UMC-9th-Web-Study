import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";

interface MovieGridProps {
  movies: Movie[];
  imageLoading: { [key: number]: boolean };
  onImageLoadStart: (movieId: number) => void;
  onImageLoad: (movieId: number) => void;
}

const MovieGrid = ({
  movies,
  imageLoading,
  onImageLoadStart,
  onImageLoad,
}: MovieGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
      {movies.map((movie) => (
        <Link
          key={movie.id}
          to={`/movies/${movie.id}`}
          className="relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 group block"
        >
          {/* 이미지 로딩 스피너 */}
          {imageLoading[movie.id] && (
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-green-100 flex items-center justify-center z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-300 border-t-pink-500"></div>
            </div>
          )}

          {/* 영화 포스터 이미지 */}
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "https://via.placeholder.com/300x450/f3f4f6/9ca3af?text=No+Image"
            }
            alt={movie.title}
            className="w-full h-auto object-cover transition-all duration-300 group-hover:blur-sm"
            onLoadStart={() => onImageLoadStart(movie.id)}
            onLoad={() => onImageLoad(movie.id)}
            onError={() => onImageLoad(movie.id)}
          />

          {/* 호버 시 나타나는 오버레이 (제목과 줄거리) */}
          <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
            {/* 영화 제목 */}
            <h2 className="text-xl font-bold mb-2 line-clamp-2">
              {movie.title}
            </h2>
            {/* 영화 줄거리 (4줄로 제한) */}
            <p className="text-sm line-clamp-4">{movie.overview}</p>
            {/* 상세보기 버튼 */}
            <div className="mt-4 px-4 py-2 bg-gradient-to-r from-pink-300 to-pink-400 text-white rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              상세보기
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MovieGrid;
