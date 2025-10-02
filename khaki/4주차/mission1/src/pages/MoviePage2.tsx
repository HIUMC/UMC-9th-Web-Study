import { useState } from "react"
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import type { MovieResponse } from "../types/movie";

const MoviePage2 = () => {
  // 라우터에서 params 가져오기
  const {category} = useParams<{ category: string; }>();
  // path에 저장
  const path = category ? `/movie/${category}`: null;
  // 페이지 상태
  const [page, setPage] = useState(1);
  // 각 path별로 추가해야할 axios params
  const params = {page};
  
  
  const {apiData, isPending, isError} = useCustomFetch<MovieResponse>(path,params);
  // 인자로 path와 params를 넘겨줌
  // 다른 페이지(다른 라우트)로 이동하면 MoviePage는 언마운트된다. (컴포넌트, 커스텀 훅도 새로 실행)
  // 그러나 같은 라우트 안에서 page상태만 바뀌는 경우 컴포넌트는 리렌더되지만 커스텀훅 안의 useEffect는 의존성이 바뀌어야 재실행된다.

  
  if(isError)
  {
    return(
    <div>
      <span className="text-red-500 text-2xl">에러가 발생!!</span>
    </div>
    )
  }
  //데이터를 불러오는 과정에서 에러가 발생하면 에러페이지를 띄움(얘는 ui니깐 훅이 아니라 컴포넌트에서 처리)

  return (
    <>
      <div className="flex items-center justify-center gap-6 mt-5">
        <button 
        className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer "
        disabled={page===1} 
        onClick={() => setPage(prev => prev-1)}>
        {'<'}
        </button>

        <span>{page} 페이지</span>

        <button 
        className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200 cursor-pointer "
        onClick={() => setPage(prev => prev+1)}>
        {'>'}
        </button>
      </div>

      {isPending ? (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner/>
        </div>
      )
      :
      (
        <div 
        className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {
          apiData?.results.map((movie) => <MovieCard key={movie.id} movie={movie}/> )
        }
        </div>
      )}
      
    </>
  
  )
}
export default MoviePage2


