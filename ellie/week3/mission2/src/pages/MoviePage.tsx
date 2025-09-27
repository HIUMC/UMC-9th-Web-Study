import axios from "axios";
import { useEffect, useState } from "react"
import type { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import {BackButton} from "../components/PageButton";
import { useParams } from "react-router-dom";

export default function MoviePage() {
  const [movies,setMovies] = useState<Movie[]>([]);
  // 1. 로딩 상태
  const [isPending,setIsPending] = useState(false);
  // 2. 에러 상태
  const [isError, setIsError] =useState(false);
  // 3. 페이지
  const [page,setPage] = useState(1);

  const {category} = useParams<{
    category : string;
  }>();

  

  useEffect(() => {
    const fetchMovies = async () => {
      setIsPending(true);
      
      try {
        const {data} = await axios(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            accept: "application/json",
          },
        }
      );
      
      setMovies(data.results);
      } catch {
        setIsError(true);
        setIsPending(false);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovies();
  },[page,category]);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 font-2xl">에러가 발생했습니다.</span>
      </div>
    )
  } 
  
  if (page < 1) {
    setIsError(true);
    setIsPending(false);
    return;
  }

  return (
   <>
    <BackButton page={page} setPage={setPage}/>

    {isPending && (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    )}

    {!isPending && (
    <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies?.map((movie) => 
        <MovieCard key={movie.id} movie={movie}/>
      )}
    </div>
    )}
   </>
  )
}
