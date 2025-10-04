import { useEffect, useState } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import MovieCard from '../components/MovieCards';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useParams } from 'react-router-dom';
import { useCustomFetch } from '../hooks/useCustomFetch';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);

  const { category } = useParams<{
    category :  string
  }>();

  
const { data, isLoading, isError } = useCustomFetch<MovieResponse>({ 
  type : 'category', 
  category, 
  page,
 });

 useEffect(()=>{
  if(data){
    setMovies(data.results);
  }
 }, [data]);
  
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

    {isLoading && (
      <div className='flex items-center justify-center h-dvh'>
      <LoadingSpinner />
      </div>
    )}
    {!isLoading && (
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