import { useEffect, useState } from "react"
import axios from 'axios'
import type { MovieResponse, Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";

export default function MoviePage() {

    const [movies,setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fecthMovies = async () =>{
            /* // fetch 사용 => 실질적인 데이터들은 response.json으로 한번 풀어줘야함
            const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1');
            const result = await response.json();
            => axios 사용하면 편리하다 

            구조분해할당 이용하면 data 바로 불러올 수 있음
            */ 
            const {data} = await axios.get<MovieResponse>('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', 
                { // axios 요청에 대한 타입 정의 => <MovieResponse>이용
                headers : {
                    Authorization : `Bearer ${import.meta.env.VITE_TMDB_KEY}`, //api key는 .env를 사용해 환경 변수로 이용
                    // 'Content-Type' : 'application/json;charset=utf-8', application/json은 기본적으로 세팅 되어 있음
                },
                }
            );

            console.log(data)

            setMovies(data.results);
        }

        fecthMovies();
    }, []);

    return (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}
