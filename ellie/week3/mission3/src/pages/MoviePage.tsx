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
  
  // URL 파라미터 사용
  // useParams 훅으로 :category 값 추출
  // ex. /movies/popular => category = "popular"
  const {category} = useParams<{
    category : string;
  }>();

  // useEffect(() => { ... }, [page, category]) : 두 번째 인자(page,category)가 바뀔 때마다 재실행
  useEffect(() => {
    // 비동기 함수 정의 -> 실제 영화 데이터를 API에서 가져옴
    const fetchMovies = async () => {
      // 로딩중(true) -> <LoadingSpinner /> 가 보임
      setIsPending(true);
      // API에게 요청 시도 -> 실패할 경우 catch
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
        setIsError(true); // 에러 메시지 표시
        setIsPending(false); // 로딩 종료
      } finally {
        setIsPending(false); // 성공하든 실패하든 무조건 로딩 종료 -> 안쓰면 try성공해도 로딩 안끝남
      }
    };
    fetchMovies();
  },[page,category]);

  // 에러처리 1
  // 에러 발생 시 경고문 표시
  if (isError) {
    return (
      <div>
        <span className="text-red-500 font-2xl">에러가 발생했습니다.</span>
      </div>
    )
  } 
  
  // 에러처리 2
  // 페이지가 1미만이면 에러처리
  if (page < 1) {
    setIsError(true);
    setIsPending(false);
    return;
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
      {movies?.map((movie) => 
        <MovieCard key={movie.id} movie={movie} />
      )}
    </div>
    )}
   </>
  )
}
