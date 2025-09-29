import { useEffect, useState } from "react"
import axios from 'axios'
import { type MovieResponse, type Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";

const MoviePage = () => {
  const [movies,setMovies] = useState<Movie[]>([]);
  // 초기값이 빈배열이므로 ts가 타입을 추론하기 어려움, 따라서 제네릭 써주기!!
  
  
  useEffect(():void =>{
    const fetchMovies = async () => {
      
      // 팁: axios는 data값이 항상 data키에 담겨오기 때문에 이렇게 구조분해 할당을 해도 괜찮음
      const {data} = await axios.get<MovieResponse>("https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`, // <- v4 토큰
          },
        }
      );
      // fetch : 네트워크를 통해 URL로부터 데이터를 가져오거나 서버에 보낼 때 사용/ Promise 기반 → 비동기(async/await) 코드와 잘 어울립니다

      setMovies(data.results);
    }
    fetchMovies();
    
  },[])

  console.log(movies[0]?.adult);  
  // 얘는 렌더링 중에 실행되어 useEffect보다 먼저 실행됨!

  return (
  <div 
  className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:gird-cols-5 xl:grid-cols-6"
  >
    {movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie}/>
    ))
    
    }
  </div>
)
}
export default MoviePage
