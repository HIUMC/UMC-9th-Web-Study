import { useNavigate, useParams } from "react-router-dom";
import type { Movie } from "../types/movie";
import MovieCredits from "../components/MovieCredits";
import { useCustomFetch } from "../hooks/useCustomFetch";


const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>(); // URL 파라미터 추출
  const movieIdNumber = Number(movieId);
  const navigate = useNavigate();

  const handleHomeBtn = () => {
    navigate('/');
    console.log('홈으로')
  }

  const { data : movie, isLoading, isError } = useCustomFetch<Movie>({ 
    type : 'detail',
    movieId : movieIdNumber,
  });


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>에러 발생 😢</div>;
  if (!movie) return <div>영화가 존재하지 않습니다.</div>;

  return (
  <div className="w-[calc(100%-400px)] flex flex-col mx-[200px] relative bg-black">
    <div className="relative w-full h-[600px]">
      {/* 영화 포스터 */}
      <img
        className=" w-full h-full object-cover"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

    <span className="absolute text-white top-0 left-[10px] text-[30px] cursor-pointer"
    onClick={handleHomeBtn}
    >{'<'}</span>
      {/* 오버레이 텍스트 */}
      <div className="absolute w-full  bottom-0 bg-gradient-to-b from-[#00000000] from-5% to-[#000000] to-30% text-white px-4 text-left">
        <h1 className="text-2xl font-bold mt-[40px]">{movie.title}</h1>
        <p className="text-sm mt-1">평균 {movie.vote_average}</p>
      <p className="text-sm">{movie.release_date.split("-")[0]}</p> 
        <p className="text-sm ">{movie.runtime}분</p>
        <p className="text-sm mt-2 mb-[50px]">{movie.overview}</p>
      </div>
    </div>
    <MovieCredits movieId={movieIdNumber} />
  </div>
);

};

export default MovieDetailPage;
