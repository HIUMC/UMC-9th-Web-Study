import { useQuery } from "@tanstack/react-query";

export const useCustomFetchTwo = <T>(url: string) => {
  return useQuery({
    queryKey: [url],

    queryFn: async ({signal}) => {
      const response = await fetch(url, {signal});

      if(!response.ok){
        throw new Error('Network error')
      }
      
      return response.json() as Promise<T>
    },
    retry: 3,

    retryDelay: (attemptIndex): number => {
     return Math.min(1000 * Math.pow(2, attemptIndex),30_000);
    },

    staleTime : 5 * 60 * 1_000,

    // 쿼리가 사용되지 않은 채로 10분이 지나면 캐시가 제거된다.
    gcTime : 10 * 60 * 1_000,

  })
}