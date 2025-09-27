import { useEffect, useState } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import axios from 'axios';
// axios는 브라우저나 Node.js에서 HTTP 요청을 쉽게 보내고 응답을 받게 해주는 라이브러리, 백엔드 서버(API)와 통신할 때 주로 사용

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      // async : 이 함수는 비동기 api요청을 할 거야
      // 왜냐하면 useEffect의 콜백함수는 동기함수여야 하기 때문
      const { data } = await axios.get<MovieResponse>
      // 제네릭 : 응답 데이터의 타입은 MovieResponse라고 지정
      // axois.get(url, config): 서버에 GET요청을 보냄
      // - url : 요청할 주소
      // - config : 요청 옵션(선택) -> 헤더,쿼리, 파라미터 등
      // Promise<AxiosResponse<MovieResponse>>를 반환
      (
        'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
        {
          headers: {
            Authorization: `Bearer 토큰값`, // 본인 TMDB 토큰으로 교체
          },
        }
      );
      // await axios.get(...) → 응답이 올 때까지 기다렸다가 결과(data)를 받음
      setMovies(data.results);
      // setMovies(...) → 받은 데이터로 상태 업데이트
    };

    fetchMovies();
    // 영화 데이터를 서버에서 가져오고(fetch) 상태에 넣는 일을 하는 함수
  }, []);
  // 두번째 인자가 빈 배열 -> 처음 마운트될 때 1번 실행

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.release_date}</p>
        </li>
      ))}
    </ul>
  );
};

export default MoviesPage;

// 코드 흐름
/*
1. 초기 렌더
movies의 초깃값이 [] → return은 <ul></ul> (빈 목록)
이게 DOM에 그려짐

2. useEffect 실행 → fetchMovies() 실행
axios로 API 요청
응답이 오면 setMovies(data.results) 실행

3. 상태 변경 → 다시 렌더
이번엔 movies 안에 데이터가 들어있음
return이 <ul><li>…</li></ul>로 바뀌어서 DOM이 업데이트
*/