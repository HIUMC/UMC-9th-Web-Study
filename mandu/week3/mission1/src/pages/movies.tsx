import { useEffect, useState } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import axios from 'axios';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';
  console.log(movies);
  const POPULAR_TOKEN = import.meta.env.VITE_TMDB_API_AUTH_TOKEN; // 토큰 .env

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
        {
          headers: {
            Authorization: `Bearer ${POPULAR_TOKEN}`, // 본인 TMDB 토큰으로 교체
          },
        }
      );
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <ul className="grid grid-cols-5 gap-6">
      {/* 옵셔널 체인 활용 */}
      {movies?.map((movie) => (
        <li key={movie.id} className='group relative w-[200px] h-[286px] rounded-xl overflow-hidden'>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-50 opacity-0 transition-all group-hover:opacity-100 group-hover:z-100">
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
  );
};

export default MoviesPage;