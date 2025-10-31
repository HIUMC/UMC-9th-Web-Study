import { useQuery } from "@tanstack/react-query";

export const useQueryFetch = <T,>(url: string) => {
  return useQuery({
    queryKey: [url],

    queryFn: async (signal) => {
      const response = await fetch(url, signal);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json() as Promise<T>;
    },

    // 최대 재시도 횟수
    retry: 10,

    //지수 백오프 전략
    retryDelay: (attemptIndex) => {
      return Math.min(1000 * Math.pow(2, attemptIndex), 30_000);
    },

    // 5분 동안 신선한 데이터로 간주
    staleTime: 5 * 60 * 1000,

    // 쿼리가 사용되지 않은 채로 10분이 지나면 캐시에서 제거
    gcTime: 10 * 60 * 1000,
  });
};
