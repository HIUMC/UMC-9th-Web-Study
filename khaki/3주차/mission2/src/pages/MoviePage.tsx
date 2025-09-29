import { useEffect, useState } from "react"
import axios from 'axios'
import { type MovieResponse, type Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";

const MoviePage = () => {
  const [movies,setMovies] = useState<Movie[]>([]);
  // 초기값이 빈배열이므로 ts가 타입을 추론하기 어려움, 따라서 제네릭 써주기!!

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
        setIsPending(true); // 데이터를 호출하는 중이므로 이때는 항상 로딩상태
        
        
        try { 
        // 팁: axios는 data값이 항상 data키에 담겨오기 때문에 이렇게 구조분해   할당을 해도 괜찮음
        const {data} = await axios.get<MovieResponse>(`https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`, // <- v4 토큰
          },
        }
        );
        // fetch : 네트워크를 통해 URL로부터 데이터를 가져오거나 서버에 보낼 때 사용/ Promise 기반 → 비동기(async/await) 코드와 잘 어울립니다
      

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
    
  },[page, category])

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

      {/* pending 상태에 따라 다른 화면 렌더 (삼항 연산자로 구현해도 됨!!) */} 
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner/>
        </div>
      )}
      
      {!isPending && (
        <div 
        className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:gird-cols-5 xl:grid-cols-6">
        {
          movies.map((movie) => <MovieCard key={movie.id} movie={movie}/> )
        }
        </div>
      )}
      
    </>
  
  )
}
export default MoviePage
