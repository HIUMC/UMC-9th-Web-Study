import { useEffect, useState } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import axios from 'axios';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGJjYTg2ZjlhNTE2ZjQyYjQxYjFlMTQxNGI1OTMzYiIsIm5iZiI6MTc1OTMyNjgyOS4xNjIsInN1YiI6IjY4ZGQzMjZkMDg4MTlkNTdjY2UxZDhkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3bmfe5vUOBvvVuWenZxK_pW8YDIEn9WksodeD1pNhzk`, // 본인 TMDB 토큰으로 교체
          },
        }
      );
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  console.log(movies);

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