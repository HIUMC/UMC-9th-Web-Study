import { useParams } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner";
import PeopleCard from "../components/PeopleCard";
import useCustomFetch from "../hooks/useCustomFetch";
import type { MovieDetailWithCredits } from "../types/movieDetail";

const MovieDetailPage2 = () => {
  // useParams 값은 항상 문자열 | undefined이다. 숫자 id가 필요하면 변환+검증을 해야한다.
  const {movieId} = useParams<{movieId : string}>();

  const path = movieId ? `/movie/${movieId}` : null;
  const params = {append_to_response:'credits'};
  const {apiData, isPending, isError} = useCustomFetch<MovieDetailWithCredits>(path,params);
  
  if(isError)
  {
    return(
    <div>
      <span className="text-red-500 text-2xl">에러가 발생!!</span>
    </div>
    )
  }

  return (
    <>
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner/>
        </div>
      )}
      
      {!isPending && (
        <main className="bg-black min-h-screen">
          <div className="p-4 h-screen grid grid-rows-2 gap-4">
            <div
            className="text-white bg-cover bg-center rounded-xl p-2 grid grid-cols-5"
            style={{
              backgroundImage: `linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/w500${apiData?.poster_path})`,
              // axios를 통해 data 안에 들어있는 poster_path는 이미지의 상대경로이다. 따라서 실제 이미지를 보려면 위와 같이 TMDB의 이미지 CDN 도메인에 앞의 경로를 붙여야 한다.
              // backgroundSize: "cover", -> 배경 이미지의 크기를 어떻게 맞출지
              // backgroundPosition: "center" ->  배경 이미지를 요소 안에서 어디에 위치시킬지 결정
          
            }}
            >
              <div className="col-span-2">
                <h1 className="text-3xl font-bold">{apiData?.title}</h1>
                <p className="mt-2 text-sm">
                  평균 {apiData?.vote_average}
                  <br></br>
                  {apiData?.release_date.slice(0,4)}
                  <br></br>
                  {apiData?.runtime}분
                </p>
                <p className="mt-2 text-lg italic">{apiData?.tagline}</p>
                <p className="mt-3 line-clamp-5">{apiData?.overview}</p>
              </div>
              <div className="col-span-3"></div>
            </div>
            <div className="bg-transparent p-2 min-h-0 overflow-y-auto">
              <h2 className="text-3xl text-white font-bold ">감독/출연</h2>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {apiData?.credits.cast.map((casts) => <PeopleCard key={`cast-${casts.id}`} photo={casts.profile_path} name={casts.name} character={casts.character}/>)
                }
                {apiData?.credits.crew.map((crew) => <PeopleCard key={`crew-${crew.id}`} photo={crew.profile_path} name={crew.name} character={crew.job}/>)
                }
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  )
}


export default MovieDetailPage2


