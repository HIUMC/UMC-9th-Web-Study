import { useQuery } from '@tanstack/react-query'

export const useCustomFetch = <T>(url: string) => {
  return useQuery({
    queryKey: [url],
    queryFn: async ({ signal }): Promise<T> => {
      const response = await fetch(url, { signal })

      if(!response.ok) {
        throw new Error('failed to fetch data')
      }
      
      return response.json() as Promise<T>
    },
    retry: 3, // 지수 백오프 전략: 1 -> 2 -> 4 -> 8 -> 16 ->...
    retryDelay: (attemptIndex) => {
      return Math.min(1000 * Math.pow(2, attemptIndex), 30_000)
    },
    staleTime: 5 * 60 * 1_000,
    gcTime: 10 * 60 * 1_000, // 쿼리 사용되지 않은 채로 10분 지나면 제거됨
  })
}