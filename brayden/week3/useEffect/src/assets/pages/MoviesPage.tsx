import { useEffect, useState } from "react";
import { MovieResponse, type Movie } from "../../types/movie";
import axios from "axios";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        {
          headers: {
            Authorization: `Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWMxNzk3ZmY1MDMwNTI1ZWZkMjEyZDFmMzMzOTZhMyIsIm5iZiI6MTc1OTA2MDIyOC42ODgsInN1YiI6IjY4ZDkyMTA0YjdmNzg2ZjRmMGI0MTRlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uaivpZiytJm9nT6H5Xi8LlvXQWrEkuj4xlBU6Y43RMg`,
          },
        }
      );
    };

    fetchMovies();
  }, []);

  return (
    <ul>
      {movies?.map((movie) => (
        // 옵셔널 체인 사용
        // why? 처음 렌더링될 때에는 빈 배열이기 때문에 데이터가 없음
        // 이때 state는 비동기기 때문에 정의되지 않은 state에 접근하여 에러 발생
        // 이를 안전하게 처리하기 위해서 optional chaining 사용
        <li key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.release_date}</p>
        </li>
      ))}
    </ul>
  );
};

export default MoviesPage;
