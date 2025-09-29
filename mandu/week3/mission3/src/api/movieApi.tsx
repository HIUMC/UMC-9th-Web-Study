import { useEffect, useState } from "react";
import type { Cast, CastResponse, Details, Movie, MovieResponse } from "../types/movie";
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



export const useLoadDetail = (movieId:string|undefined, setDetails:React.SetStateAction<Details>, setCasts: React.SetStateAction<Cast[]>, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    const [isError,setIsError] = useState<Error | null>(null);

    useEffect(() => {
    const options = {
      headers: {
        Authorization: `Bearer ${POPULAR_TOKEN}`,
        accept: 'application/json',
      },
    };

    const getDetails = () => {
      return axios.get<Details>(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, options);
    };

    const getCredits = () => {
      return axios.get<CastResponse>(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`, options);
    };

    const fetchDetail = async () => {
      // movieId가 없으면 요청을 보내지 않습니다.
      if (!movieId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setIsError(null);

      try {
        // 3. axios.all은 여러 요청(Promise)을 배열로 받습니다.
        const [detailsResponse, creditsResponse] = await axios.all([getDetails(), getCredits()]);

        setDetails(detailsResponse.data);
        setCasts(creditsResponse.data.cast);
      } catch (err) {
        setIsError(err as Error);
        console.error("영화 상세 정보 로딩 오류:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [movieId]);
}