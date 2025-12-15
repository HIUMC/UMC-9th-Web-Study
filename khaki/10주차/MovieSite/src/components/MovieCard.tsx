import { useState } from "react";
import type { Movie } from "../types/movie";
import MovieModal from "./MovieModal";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  // TMDB 포스터 없을 때 보여줄 대체 이미지
  const fallbackImage = "https://via.placeholder.com/500x750/1f2937/ffffff?text=No+Poster";

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        onClick={openModal}
        className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
      >
        <div className="relative h-90 overflow-hidden">
          <img
            src={movie.poster_path ? imageBaseUrl + movie.poster_path : fallbackImage}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105 "
          />
          <div className="absolute right-2 top-2 rounded-md bg-black px-2 py-1 text-sm font-bold text-white">
            ⭐ {movie.vote_average.toFixed(1)}
          </div>
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold">{movie.title}</h3>
          <p className="text-sm text-gray-600">출시일: {movie.release_date}</p>
          <p className="mt-2">{movie.overview.length > 100 ? movie.overview.slice(0, 100) + "..." : movie.overview}</p>
        </div>
      </div>

      <MovieModal isOpen={isModalOpen} onClose={closeModal} movie={movie} />
    </>
  );
};

export default MovieCard;
