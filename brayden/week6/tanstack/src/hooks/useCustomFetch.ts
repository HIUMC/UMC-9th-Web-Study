import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export const useCustomFetch = <T>(url: string): UseQueryResult<void, Error> => {
  return useQuery({
    queryKey: [url],

    queryFn: async ({ signal }) => {
      const response = await fetch(url, { signal });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json() as Promise<T>;
    },
    retry: 10,

    // 지수 백오프 전략
    // 1 -> 2 -> 4 -> 8 -> 16 -> 32 -> 64 -> 128 -> 256 -> 512 -> 1024
    retryDelay: (attemptIndex) => {
      Math.min(1000 * Math.pow(2, attemptIndex), 30_000);
    },

    staleTime: 5 * 60 * 1_000,
    // 쿼리가 사용되지 않은 채로 10분이 지나면 캐시에서 제거된다.
    gcTime: 10 * 60 * 1_000,
  });
};
