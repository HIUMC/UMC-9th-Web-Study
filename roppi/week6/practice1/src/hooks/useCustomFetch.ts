import { useEffect, useMemo, useRef, useState } from 'react';

const STALE_TIME = 5 * 60 * 1_000;

const MAX_RETRIES = 3;
//1초마다 재시도하는 것
const INITIAL_RETRY_DELAY = 1_000;

interface CatchEntry<T>{
  data: T;
  lastFetched: number; // 마지막으로 데이터를 가져온 시점 타임스탬프
}

const useCustomFetch = <T>(url: string) => {
  // 서버에서 가져온 데이터를 저장하는 상태
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // GET
  // URL
  const storageKey = useMemo((): string => url, [url]);

  const abortControllerRef = useRef<AbortController | null>(null);

  const retryTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    abortControllerRef.current = new AbortController();
    setIsError(false);

    const fetchData = async (currentRetryCount : number = 0) : Promise<void> => {
    const currentTime = new Date().getTime();
    const cachedItem = localStorage.getItem(storageKey)

    // 캐시 데이터 확인, 신선도 검증
    if(cachedItem){
      try{
        const cachedData: CatchEntry<T> = JSON.parse(cachedItem);

        // 캐시가 신선한 경우 (STALE_TIME 이내)
        if(currentTime - cachedData.lastFetched < STALE_TIME) {
          setData(cachedData.data);
          setIsPending(false);
          console.log('캐시된 데이터 사용', url);
          return;
        }

        // 캐시가 만료된 경우
        setData(cachedData.data);
        console.log('만료된 캐시 데이터 사용', url)
      } catch{
        localStorage.removeItem(storageKey);
        console.error('캐시된 데이터 파싱 오류, 캐시 삭제함', url);
      }
    }
    setIsPending(true);

    try {
        // fetch API를 사용하여 서버에 데이터 요청
        const response = await fetch(url,{
          signal : abortControllerRef.current?.signal,
        }
        );

        if(!response.ok){
          throw new Error('Network response was not ok');
        }

        // 응답을 JSON 형태로 파싱
        const newData = await response.json() as T;
        // 파싱된 데이터를 상태에 저장
        setData(newData);

        const newCacheEntry : CatchEntry<T> = {
          data: newData,
          lastFetched: new Date().getTime(),
        };
        
        localStorage.setItem(storageKey, JSON.stringify(newCacheEntry))
      } catch (error) {

      if(error instanceof Error && error.name === 'AbortError'){
        console.log('요청 취소됨', url);
        return;
      }

      if(currentRetryCount < MAX_RETRIES ){
        const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, currentRetryCount);
        console.log(`재시도,${currentRetryCount + 1}/${MAX_RETRIES} Retrying ${retryDelay}ms later`)
      
        retryTimeoutRef.current = setTimeout(()=> {
          fetchData(currentRetryCount + 1)
        }, retryDelay)
      }else {
        setIsError(true);
        setIsPending(false);
        console.log('최대 재시도 횟수 초과', url)
        return;

      }

    } finally {
      setIsPending(false);
    }
    };

    fetchData();
    
    return () => {
      abortControllerRef.current?.abort(); // 리소스 낭비를 방지
    
    // 예약된 재시도 타이머 취소
    if(retryTimeoutRef.current !== null)
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
  }, [url, storageKey]); // url이 변경될 때마다 새로운 데이터 요청

  return { data, isPending, isError };
};

export default useCustomFetch