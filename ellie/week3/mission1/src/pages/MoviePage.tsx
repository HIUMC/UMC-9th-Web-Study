import axios from "axios";
import { useEffect, useState } from "react"
import type { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";

export default function MoviePage() {
  // 영화 목록 상태 변수
  // moive[] 타입 지정으로 TMDB API에서 오는 데이터 구조 보장
  // 초기값 빈배열
  const [movies,setMovies] = useState<Movie[]>([]);

  // useEffect(...,[]) : 두번째 인자가 빈 배열?
  //  -> 컴포넌트가 처음 렌더링될 때 한 번만 실행하고 싶을 때
  // useEffect함수에서 api 호출
  useEffect(() => {

    // 1) API 호출
    // 2) 응답 데이터 구조 분해
    // 3) 상태 업데이트 과정
    const fetchMovies = async () => { // async 키워드 : 함수 안에서 await 사용 가능
      // axios : HTTP GET 요청을 보냄
      // awat : 요청 완료까지 기다리고 결과를 data에 구조분해 할당
      const {data} = await axios('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        // 요청 설정 (헤더에 인증토큰 추가해야함)
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            accept: "application/json",
          },
        }
      );
    // 받아온 영화 배열을 movies상태에 저장
    // 상태가 바뀌면 컴포넌트도 리렌더링
      setMovies(data.results);
    };
    // 함수 호출
    fetchMovies();
  },[]);

  // 렌더링!!
  // tailwind 사용 : 패딩 10 display:grid sm일 때 한줄에 3개 오게 ... 반응형
  // movies?.map(...) : movies 배열을 순회하면서 MovieCard 컴포넌트 생성
  //  -> 옵셔널체이닝 : movies값이 null이나 undefined일 수도 있는 상황 대비
  return <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
    {movies?.map((movie) => 
      <MovieCard key={movie.id} movie={movie}/>
    )}
  </div>
}