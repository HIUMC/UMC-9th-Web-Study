import { useQuery } from "@tanstack/react-query";

export const useCustomFetch = <T,>(url: string) => {
  return useQuery({
    queryKey: [url],
    queryFn: async ({ signal }: { signal: AbortSignal }): Promise<T> => {
      const response = await fetch(url, { signal });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json() as Promise<T>;
    },
    retry: 10,
    //지수 백오프 전략
    retryDelay: (attemptIndex) => {
      return Math.min(1000 * Math.pow(2, attemptIndex), 30_000);
    },
    staleTime: 1000 * 60 * 5, //5분
    // 쿼리가 사용되지 않은 채로 10분이 지나면 캐시에서 제거
    gcTime: 1000 * 60 * 10, //10분
  });
};
