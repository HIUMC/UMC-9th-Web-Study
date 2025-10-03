import axios from "axios";
import { useEffect, useState } from "react";

export default function useCustomFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!url.includes("undefined")) {
      const controller = new AbortController();

      const fetchData = async () => {
        setIsPending(true);
        setIsError(false);
        try {
          const response = await axios.get<T>(url, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              Accept: "application/json",
            },
            signal: controller.signal,
          });
          setData(response.data);
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log("Request cancled:", error.message);
            return;
          }
          console.error("Fetch error:", error);
          setIsError(true);
        } finally {
          setIsPending(false);
        }
      };
      fetchData();

      return () => {
        controller.abort();
      };
    }
  }, [url]);

  return { data, isPending, isError };
}
