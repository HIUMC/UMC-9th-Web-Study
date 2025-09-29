import { useEffect, useState } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import axios from 'axios';

const MoviesPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    console.log(movies);

    useEffect(() => {
        const fetchMovies = async () => {
        const { data } = await axios.get<MovieResponse>(
            'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
            {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDAxZjAyMTY3ZmU2ZDc4NjhlNmFhMmNjMzlmOGExYiIsIm5iZiI6MTc1ODc4NzU2NS41MzcsInN1YiI6IjY4ZDRmN2VkYTQ5ZDA0ZWE4ODg4MjAzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hBdMJh6mYGGFpMW0LrfhosrP_8jYJFVth8wyFFeA8a0' 
            },
            }
        );
        setMovies(data.results);
        };

        fetchMovies();
    }, []);

    return (
        <ul>
        {movies?.map((movie) => (
            <li key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.release_date}</p>
            </li>
        ))}
        </ul>
    );
};

export default MoviesPage;