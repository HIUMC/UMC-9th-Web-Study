import { useEffect, useState } from "react"
import axios from 'axios'
import { type MovieResponse, type Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";

const MoviePage = () => {
  // 영화 목록
  const [movies,setMovies] = useState<Movie[]>([]);
  // 1. 로딩 상태
  const [isPending, setIsPending] = useState(false);
  // 2. 에러 상태
  const [isError, setIsError] = useState(false);
  // 3. 페이지
  const [page, setPage] = useState(1);
  // 동적 라우팅
  const {category} = useParams<{
    category: string;
  }>();
  

  useEffect(():void =>{
      const fetchMovies = async () => {
        setIsError(false);
        // 한 번 에러가 생기면, 다음에 성공해도 그 에러를 다시 false로 바꾸지 않아 계속 에러에 머물수 있음
        setIsPending(true); 
        // 데이터를 호출하는 중이므로 이때는 항상 로딩상태
        
        try { 
        const {data} = await axios.get<MovieResponse>(`https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`, // <- v4 토큰
          },
        });
        setMovies(data.results);
        } 

        catch {
          setIsError(true);
        }

        finally{
          setIsPending(false);
          // 데이터를 잘 불러와도, 에러가 나도 로딩은 false처리를 해주므로 finally에 넣어줌
        }
      }

    fetchMovies();
    console.log(movies)
   
    
  },[page, category])

  //데이터를 불러오는 과정에서 에러가 발생하면 에러페이지를 띄움
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

      
      {/* pending 상태에 따라 다른 화면 렌더 (삼항 연산자로 구현해도 됨!!) 
          로딩 같은 경우는 아래 컴포넌트에만 로딩화면이 뜨면되므로 여기에다가 코드를 쓴다!
      */} 
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner/>
        </div>
      )}
      
      {!isPending && (
        <div 
        className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {
          movies.map((movie) => <MovieCard key={movie.id} movie={movie}/> )
        }
        </div>
      )}
      
    </>
  
  )
}
export default MoviePage


/*
<동작 흐름>
1. 초기 렌더
  - movies=[], isPending=false, isError=false, page=1
  - useParams()로 category를 읽음 (/movies/popular이면 "popular").

  2. useEffect([page, category]) 실행
  - setIsPending(true) → 로딩 시작.
  - axios.get으로 https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page} 호출

  3. 응답 도착
  - 성공: setMovies(data.results)
  - 실패: setIsError(true)
  - finally에서 setIsPending(false)
 
4. 리렌더
  - isError===true면 에러 UI를 바로 return (하단 UI는 렌더되지 않음)
  - isPending===true면 스피너 렌더
  - 둘 다 아니면 그리드로 영화 카드 렌더

5. 페이지 버튼 클릭
  - setPage(prev±1) → page 변경 → useEffect 다시 실행 → 2단계부터 반복

6. 카테고리 탭 이동(NavLink)
  - URL이 /movies/top_rated 등으로 바뀜 → category 변경 → useEffect 다시 실행
*/