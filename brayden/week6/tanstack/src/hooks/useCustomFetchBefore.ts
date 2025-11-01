import { useEffect, useMemo, useRef, useState } from "react";

const STALE_TIME = 0.5 * 60 * 1_000; // 5분

const MAX_RETRIES = 3;
// 1초마다 재시도
const INITIAL_RETRY_DELAY = 1_000;

// 로컬 스토리지에 저장할 데이터의 구조
interface CacheEntry<T> {
  data: T;
  lastFetched: number; // 마지막에 fetch한 데이터의 인덱스 = 마지막으로 데이터를 가져온 시점 타임스탬프
}

// useCustomFetch = useQuery
export const useCustomFetchBefore = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // url이 바뀔 때마다 값 저장된 걸 실행시켜 -> useMemo
  // url 기반 저장이므로 storageKey = url
  const storageKey = useMemo((): string => url, [url]);

  const abortControllerRef = useRef<AbortController | null>(null);

  const retryTimeoutRef = useRef<number | null>(null);

  useEffect((): void => {
    abortControllerRef.current = new AbortController();
    setIsError(false);
    // fetchData를 try..catch 문으로 감싸면 안됨.
    const fetchData = async (currentRetry = 0): Promise<void> => {
      const currentTime = new Date().getTime();
      // localStorage에는 "직렬화"되어서 저장됨
      // stringify해서 저장되어있으므로 파싱해야함.
      const cachedItem = localStorage.getItem(storageKey);

      // 캐시 데이터 확인, 신선도 검증
      if (cachedItem) {
        try {
          const cachedData: CacheEntry<T> = JSON.parse(cachedItem);

          // 캐시가 신선한 경우 (StaleTime 이내)
          if (currentTime - cachedData.lastFetched < STALE_TIME) {
            setData(cachedData.data);
            setIsPending(false);
            console.log("캐시된 데이터 사용", url);
            return;
          }

          // 캐시가 만료된 경우
          setData(cachedData.data);
          console.log("만료된 캐시 데이터 사용", url);
        } catch {
          localStorage.removeItem(storageKey);
          console.warn("캐시 에러 : 캐시 삭제함", url);
        }
      }

      setIsPending(true);
      try {
        const response = await fetch(url, {
          signal: abortControllerRef.current?.signal,
        });
        // 400, 500 못잡으니까 !response.ok 문 작성
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const newData = (await response.json()) as T;
        setData(data);

        const newCacheEntry: CacheEntry<T> = {
          data: newData,
          lastFetched: new Date().getTime(),
        };

        localStorage.setItem(storageKey, JSON.stringify(newCacheEntry));
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("요청 취소됨", url);
          return;
        }

        if (currentRetry < MAX_RETRIES) {
          // 1 -> 2 -> 4 -> 8
          const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, currentRetry);
          console.log(
            `재시도, ${
              currentRetry + 1
            }/${MAX_RETRIES} Retrying ${retryDelay}ms later`
          );

          retryTimeoutRef.current = setTimeout(() => {
            fetchData(currentRetry + 1);
          }, retryDelay);
        } else {
          // 최대 재시도 횟수 초과
          setIsError(true);
          setIsPending(false);
          console.log("최대 재시도 횟수 초과", url);
          return;
        }

        setIsError(true);
        console.log(error);
        setIsPending(false);
      } finally {
        setIsPending(false);
      }
    };
    fetchData();
    return () => {
      abortControllerRef.current?.abort();

      // 예약된 재시도 타이머취소
      if (retryTimeoutRef.current !== null) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, [url, storageKey]); // storageKey가 바뀔때마다 바꾸어줘야함.

  return { data, isPending, isError };
};
