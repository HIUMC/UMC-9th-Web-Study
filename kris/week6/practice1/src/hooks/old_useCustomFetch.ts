import { useEffect, useMemo, useRef, useState } from "react";

const STALE_TIME = 0.5 * 60 * 1_000 // 5분

const MAX_RETRIES = 3; // 최대 재시도 횟수

const INITIAL_RETRY_DELAY = 1_000; // 1초마다 재시도

// localStorage에 저장할 데이터 구조
interface CacheEntry<T> {
  data: T,
  lastFetched: number, // 마지막으로 데이터 가져온 시점 타임스탬프 (Data 객체 참고)
}

export const useCustomFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  const storageKey = useMemo(() => url, [url]); // url이 바뀔 때마다 실행

  const abortControllerRef = useRef<AbortController | null>(null);

  const retryTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    abortControllerRef.current = new AbortController();
    setIsError(false)

    const fetchData = async (currentRetry = 0) => {
      // 캐시되면 캐싱된 것 부르기 (네트워크 요청 X)
      const currentTime = new Date().getTime();
      const cachedItem = localStorage.getItem(storageKey) // url...

      // 캐시 데이터 확인 + 신선도 검증
      if(cachedItem) {
        try {
          const cachedData: CacheEntry<T> = JSON.parse(cachedItem); // 파싱

          if(currentTime - cachedData.lastFetched < STALE_TIME) { // 신선한 경우
            setData(cachedData.data);
            setIsPending(false);
            console.log("캐시된 데이터 사용", url);
            return;
          }

          // 캐시가 만료된 경우
          setData(cachedData.data); // 일단 캐싱된 데이터 보여주기
          console.log("만료된 캐시 데이터 사용", url);
        } catch {
          localStorage.removeItem(storageKey)
          console.warn("캐시 에러: 캐시 삭제함", url)
        }
      }

      setIsPending(true)

      try { // 실제 요청 불러오는 부분만 try로 -> isPending
        const response = await fetch(url, {
          signal: abortControllerRef.current?.signal,
        }) // 응답 데이터 불러오기

        if(!response.ok) { // fetch에서 4xx, 5xx 잡을 수 없으므로
          throw new Error('Failed to fetch data')
        }

        const newData = await response.json() as T; // json으로 풀어주기
        setData(newData); 

        const newCacheEntry: CacheEntry<T> = {
          data: newData,
          lastFetched: new Date().getTime() // 현재 시간 타임스탬프로 저장
        }

        localStorage.setItem(storageKey, JSON.stringify(newCacheEntry))
      } catch (err) { // 네트워크 오류
        if(err instanceof Error && err.name === 'AbortError') {
          console.log("요청 취소됨", url)

          return;
        }

        if(currentRetry < MAX_RETRIES) {
          // 지수 백오프 (1->2->4->...)
          const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, currentRetry);
          console.log(`재시도, ${currentRetry + 1} / ${MAX_RETRIES} Retrying ${retryDelay}ms later`)

          retryTimeoutRef.current = setTimeout(() => {
            fetchData(currentRetry + 1);
          }, retryDelay);
        } else {
          // 최대 재시도 횟수 초과
          setIsError(true)
          setIsPending(false)
          console.log('최대 재시도 횟수 초과', url)
          return;
        }
        console.log(err)
        setIsError(true)
      } finally {
        setIsPending(false)
      }
    }
    fetchData()

    return () => { // cleanup
      abortControllerRef.current?.abort();

      // 예약된 재시도 타이머 취소
      if(retryTimeoutRef.current !== null) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null
      }
    }
  }, [url, storageKey])
  return {data, isPending, isError}
}