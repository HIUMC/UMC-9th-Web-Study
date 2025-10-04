import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Movie } from "../types/movie";
import MovieCredits from "../components/MovieCredits";
import { useCustomFetch } from "../hooks/useCustomFetch";


const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>(); // URL 파라미터 추출
  const movieIdNumber = Number(movieId);
  const [movie, setMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useCustomFetch<Movie>({ 
    type : 'detail',
    movieId : movieIdNumber,
  });

  useEffect(() => {
    if(data){
      setMovie(data)
    }
  }, [data])

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>에러 발생 😢</div>;
  if (!movie) return <div>영화가 존재하지 않습니다.</div>;

  return (
  <div className="w-full p-6 flex flex-col">
    <div className="relative w-full h-[400px]">
      {/* 영화 포스터 */}
      <img
        className="rounded-xl w-full h-full object-cover"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      {/* 오버레이 텍스트 */}
      <div className="absolute inset-0 bg-black/60 text-white p-4 rounded-b-xl text-left">
        <h1 className="text-2xl font-bold">{movie.title}</h1>
        <p className="text-sm mt-1">평균 {movie.vote_average}</p>
      <p className="text-sm">{movie.release_date.split("-")[0]}</p> 
        <p className="text-sm ">{movie.runtime}분</p>
        <p className="text-sm mt-2 line-clamp-3">{movie.overview}</p>
      </div>
    </div>
    <MovieCredits movieId={movieIdNumber} />
  </div>
);

};

export default MovieDetailPage;
