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
      className="group relative rounded-2xl shadow-2xl overflow-hidden cursor-pointer 
      transition-all duration-500 hover:scale-105 hover:shadow-3xl transform"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* 포스터 이미지 */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* 기본 정보 */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
        <h3 className="text-white font-bold text-lg leading-tight mb-1 line-clamp-2">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-300">
          <span className="flex items-center gap-1">
            ⭐ {movie.vote_average.toFixed(1)}
          </span>
          <span>{new Date(movie.release_date).getFullYear()}</span>
        </div>
      </div>

      {/* 호버 시 상세 정보 */}
      {isHover && (
        <div
          className="absolute inset-0 bg-gradient-to-t from-purple-900/95 via-pink-900/80 to-transparent 
        backdrop-blur-sm flex flex-col justify-end p-6 text-white"
        >
          <h2 className="text-2xl font-bold leading-tight mb-3">
            {movie.title}
          </h2>
          <p className="text-gray-200 text-sm leading-relaxed mb-4 line-clamp-4">
            {movie.overview}
          </p>
          <div className="space-y-3">
            {/* 평점 섹션 */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-2 rounded-xl shadow-lg">
                <div className="flex items-center gap-1">
                  <span className="text-sm">⭐</span>
                  <span className="font-bold text-sm">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
              <div className="text-white text-xs">
                <span className="font-semibold">
                  {movie.vote_count.toLocaleString()}명 평가
                </span>
              </div>
            </div>

            {/* 자세히 보기 버튼 */}
            <button
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2.5 rounded-xl 
            font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-200 
            transform hover:scale-105 shadow-lg"
            >
              자세히 보기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
