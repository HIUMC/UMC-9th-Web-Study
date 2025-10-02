import { useEffect, useState } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import axios from 'axios';
import MovieCard from '../components/MovieCards';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useParams } from 'react-router-dom';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isPending, setIsPendging] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);

  const { category } = useParams<{
    category :  string
  }>();

  useEffect(() => {
       const fetchMovies = async () : Promise<void> => {
      setIsPendging(true);

      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`, // 본인 TMDB 토큰으로 교체
            },
          }
        );
        setMovies(data.results);
        setIsPendging(false)

      }
      catch{ console.log("error"); setIsError(true);}
    };
    fetchMovies();
  }, [page, category]);

  
  if (isError) {
    return (
    <div> 
      <span>에러발생</span> 
    </div>)
  }

  return (
    <div className='flex flex-col gap-6'>
    <div className='flex justify-center items-center gap-6 mt-5'>
      <button 
        className='!bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md !hover:bg-[#b2dab1] transition-all duratoin-200 cursor-pointer disabled:cursor-not-allowed'      
      disabled={page === 1}
      onClick={(): void => setPage((prev): number => prev -1)}>{`<`}</button>
      <span>{page} 페이지</span>
       <button 
        className='!bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md !hover:bg-[#b2dab1] transition-all duratoin-200 cursor-pointer'      
        onClick={(): void => setPage((prev): number => prev +1)}>{`>`}</button>
    </div>
    {isPending && (
      <div className='flex items-center justify-center h-dvh'>
      <LoadingSpinner />
      </div>
    )}
    {!isPending && (
    <div className='p-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4'>
      {movies?.map((movie)  => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
    )}

    </div>
  );
};

export default MoviesPage;