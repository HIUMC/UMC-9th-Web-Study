import axios from "axios";
import { useEffect, useState } from "react";

interface FetchProps {
  type: "detail" | "category" | "credits"; // 요청 종류
  movieId?: number;       // detail, credits에 필요
  category?: string;      // category 요청에 필요
  page?: number;          // category 요청에 필요
  language?: string;      // 기본값: 'ko-KR'
}

export const useCustomFetch = <T,>({type, movieId, category, page = 1, language = "ko-KR"}: FetchProps) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false); 

  useEffect(()=> {
    let url = `https://api.themoviedb.org/3/movie/`;
    if (type === 'detail' && movieId) {
      url += `${movieId}?language=${language}`;
    } else if (type === 'category'&& category && page){
      url += `${category}?language=${language}&page=${page}`;
    } else if (type === "credits" && movieId) {
      url += `${movieId}/credits?language=${language}`;
    } else {
      console.log("error")
      setIsError(true);
    }

    const fetchData = async () : Promise<void> => {
      setIsLoading(true)
      
      try {
        const { data } = await axios.get<T>(
          url,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`, 
            },
          }
        );
        setData(data);
      }
      catch {
        console.log("error");
        setIsError(true);
      } finally{
        setIsLoading(false);
      }
    };
          fetchData();
  }, [type, movieId, category, page, language])
  return { data, isLoading, isError}
}
