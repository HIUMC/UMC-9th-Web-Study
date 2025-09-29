import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { Credit, Movie } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";
import MovieCreditCard from "../components/MovieCreditCard";

export default function MovieDetailPage() {
  
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie|null>(null);
  const [credits, setCredits] = useState<Credit[]>();
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    console.log("MovieDetailPage mounted", movieId);
  }, [movieId]);
  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      setIsError(false);

      try {
        const detail= await axios.get<Movie>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovie(detail.data);
        const credit= await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }          
        );
        setCredits([...credit.data.cast,...credit.data.crew]);
      } catch {
        setIsError(true);
        setIsPending(false);
      } finally {
        setIsPending(false);
      }
    };
    fetchData();
  },[movieId])
  if (isError) {
    return (
      <div>
        <span className="text-red-500 font-2xl">에러가 발생했습니다.</span>
      </div>
    )
  }
  if (isPending || !movie) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }
  return (
        <div className="bg-black/100">
          <div className="relative w-full">
            <img 
              src= {`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-[300px] object-cover p-3"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30 "/>
            <div className="absolute top-4 left-4 text-white max-w-2xl">
              <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
              <p className="">{movie.vote_average}</p>
              <p>{movie.release_date}</p>
              <p className="mb-2">{movie.runtime}분</p>
              <p className="text-xl font-bold mb-5">{movie.tagline}</p>
              <p className="text-sm line-clamp-4 max-w-[50%]">{movie.overview}</p>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white m-4">감독/출연</h1>
          <div className="grid gap-4 grid-cols-8">
              {credits?.map((credit) => 
                <MovieCreditCard key={credit.credit_id} credit={credit}/>
              )}
          </div>
        </div>
  )
}