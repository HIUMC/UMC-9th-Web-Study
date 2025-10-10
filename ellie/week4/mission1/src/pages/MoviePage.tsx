import {useState } from "react"
import type { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import {BackButton} from "../components/PageButton";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useCustomFetch";

export default function MoviePage() {

  // 페이지
  const [page,setPage] = useState(1);
  
  // URL 파라미터 사용
  // useParams 훅으로 :category 값 추출
  // ex. /movies/popular => category = "popular"
  const {category} = useParams<{category : string;}>();

  const {datas,isError,isPending} = useFetch<{results:Movie[]}>(
    `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
    [page,category]
  )

  // 에러처리 1
  // 에러 발생 시 경고문 표시
  if (isError) {
    return (
      <div>
        <span className="text-red-500 font-2xl">에러가 발생했습니다.</span>
      </div>
    )
  } 

  // <BackButton /> : 페이지 이동 버튼 컴포넌트
  // 로딩중? -> <LoadingSpinner /> 표시
  // 로딩 완료 -> <MovieCard /> 보여줌
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
      {datas?.results.map((data) => 
        <MovieCard key={data.id} movie={data} />
      )}
    </div>
    )}
   </>
  )
}
