import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/movie";
import axios from "axios";

const base_url = axios.create({})
const POPULAR_TOKEN = import.meta.env.VITE_API_TOKEN; // 토큰 .env

export const useLoadApi = (url: string, setMovies: React.SetStateAction<Movie[]>, page:number, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    const [isError, setIsError] = useState<Error | null>(null);
    useEffect(() => {
    const fetchMovies = async () => {
        setLoading(true);
        setIsError(null);
        try{
            const { data } = await axios.get<MovieResponse>(
                `https://api.themoviedb.org/3/movie/${url}?language=ko-KR&page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${POPULAR_TOKEN}`, // 본인 TMDB 토큰으로 교체
                    },
                }
            );
        setMovies(data.results);
        } catch(error){
            setIsError(error as Error);
            console.log("리스트 오류:",error);
        } finally{
            setLoading(false);
        }
    };

    fetchMovies();
  }, [url, setMovies, page]);
}