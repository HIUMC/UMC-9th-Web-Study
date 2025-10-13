import { useState, useEffect, useCallback } from "react";
import axios, { type AxiosRequestConfig } from "axios";

interface UseCustomFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface UseCustomFetchOptions {
  immediate?: boolean;
}

export function useCustomFetch<T>(
  url: string | null,
  config?: AxiosRequestConfig,
  options: UseCustomFetchOptions = { immediate: true }
): UseCustomFetchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!url) return;

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(url, {
        ...config,
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          ...config?.headers,
        },
      });

      setData(response.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "데이터를 불러오는 중 오류가 발생했습니다.";
      setError(errorMessage);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url, config]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (options.immediate && url) {
      fetchData();
    }
  }, [fetchData, options.immediate, url]);

  return { data, loading, error, refetch };
}
