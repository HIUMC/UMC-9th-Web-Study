import axios from "axios";
import { useEffect, useState } from "react";

interface FetchState<T> {
  data: T | null;
  isPending: boolean;
  isError: boolean;
}

function useCustomFetch<T>(url: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if(!url) return;

    const fetchData = async () => {
      setIsPending(true);
      setIsError(false);
      try {
        const response = await axios.get<T>(url,  {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
          }
        });
        setData(response.data)
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    }
    fetchData()
  }, [url])

  return {data, isPending, isError}
}

export default useCustomFetch