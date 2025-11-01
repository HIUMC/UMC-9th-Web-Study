import { useEffect, useMemo, useRef, useState } from "react";

const STALE_TIME = 5 * 60 * 1_000; // 5min

const MAX_RETRIES = 3;
// 1c초마다 재시도
const INITIAL_RETRY_DELAY = 1_000;

// 로컬스토리지에 저장할 데이터의 구조
interface CacheEntry<T> {
  data: T;
  lastFetched: number;
}

export const useCustomFetch = <T>(
  url: string
): { data: T | null; isPending: boolean; isError: boolean } => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIspending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const storageKey = useMemo((): string => url, [url]);

  const abortControllerRef = useRef<AbortController | null>(null);

  const retryTimeoutRef = useRef<number | null>(null);

  useEffect((): void => {
    abortControllerRef.current = new AbortController();
    setIsError(false);

    const fetchData = async (currentRetry = 0): Promise<void> => {
      const currentTime = new Date().getTime();
      const cachedItem = localStorage.getItem(storageKey);

      // 캐시 데이터 확인, 신선도 검증
      if (cachedItem) {
        try {
          const cachedData: CacheEntry<T> = JSON.parse(cachedItem);

          // 캐시가 신선한 경우 (STALE_TIME 이내)
          if (currentTime - cachedData.lastFetched < STALE_TIME) {
            setData(cachedData.data);
            setIspending(false);
            console.log("캐시된 데이터 사용", url);
            return;
          }
          //캐시가 만료된 경우
          setData(cachedData.data);
          console.log("만료된 데이터 사용", url);
        } catch {
          localStorage.removeItem(storageKey);
          console.warn("캐시 에러: 캐시 삭제함", url);
        }
      }

      setIspending(true);
      try {
        const response = await fetch(url, {
          signal: abortControllerRef.current?.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const newData = (await response.json()) as T;
        setData(data);

        const newCacheEntry: CacheEntry<T> = {
          data: newData,
          lastFetched: new Date().getTime(), //현재 시간을 타임스탬프로 저장
        };

        localStorage.setItem(storageKey, JSON.stringify(newCacheEntry));
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("요청 취소됨", url);

          return;
        }

        if (currentRetry < MAX_RETRIES) {
          const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, currentRetry);
          console.log(`재시도, ${MAX_RETRIES} Retrying ${retryDelay}ms later`);

          retryTimeoutRef.current = setTimeout(() => {
            fetchData(currentRetry + 1);
          }, retryDelay);
        } else {
          // 최대 재시도 횟수 초과
          setIsError(true);
          setIspending(false);
          console.log("최대 재시도 횟수 초과", url);
          return;
        }

        console.log(error);
        setIsError(true);
      } finally {
        setIspending(false);
      }
    };

    fetchData();

    return () => {
      abortControllerRef.current?.abort();

      // 예약된 재시도 타이머 취소
      if (retryTimeoutRef.current !== null) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, [url, storageKey]);

  return { data, isPending, isError };
};
