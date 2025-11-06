// import { useEffect, useMemo, useRef, useState } from "react";

// const STALE_TIME = 1000 * 60 * 0.5; // 5 minutes

// // 최대 재시도 횟수
// const MAX_RETRIES = 3;

// // 1초마다 재시도
// const INITIAL_RETRY_DELAY = 1000; // 1 second

// // 로컬 스토리지에 저장할 데이터의 구조
// interface CacheEntry<T> {
//   data: T;
//   lastFetched: number;
//   // 마지막으로 데이터를 api에서 받아온 시간 (타임스탬프)
//   // 즉 "이 데이터가 언제 최신으로 갱신되었는가"를 기록
// }

// export const useCustomFetch = <T,>(url: string) => {
//   const [data, setData] = useState<T | null>(null);
//   const [isPending, setIsPending] = useState<boolean>(false);
//   const [isError, setIsError] = useState<boolean>(false);

//   // useMemo는 값을 기억해두고, 의존성 배열(deps)**이 바뀔 때만 다시 계산하게 해주는 훅
//   const storageKey = useMemo((): string => url, [url]);

//   // useRef는 “값을 기억하는 상자(객체)” 값이 바뀌어도 리렌더를 일으키지 않는다.(렌더링과 무관한 내부 로직용 값일때 사용)
//   const abortControllerRef = useRef<AbortController | null>(null);
//   const retryTimeoutRef = useRef<number | null>(null);

//   useEffect(() => {
//     abortControllerRef.current = new AbortController();
//     setIsError(false);

//     const fetchData = async (currentRetry = 0) => {
//       const currentTime = new Date().getTime();
//       const cachedItem = localStorage.getItem(storageKey);

//       // 캐시 데이터가 있는 경우
//       if (cachedItem) {
//         try {
//           const cachedData: CacheEntry<T> = JSON.parse(cachedItem);

//           // 캐시 데이터가 신선한 경우(Stale Time 이내)
//           if (currentTime - cachedData.lastFetched < STALE_TIME) {
//             setData(cachedData.data);
//             setIsPending(false);
//             console.log("캐시된 데이터 사용", storageKey);
//             return; // 캐시된 데이터를 사용하므로 fetch를 하지 않고 종료
//           }

//           // 캐시 데이터가 오래된 경우
//           setData(cachedData.data); // 일단 캐시된 데이터 보여주기
//           console.log("만료된 캐시 데이터 사용", storageKey);
//         } catch (error) {
//           localStorage.removeItem(storageKey); // 파싱 오류 시 캐시 삭제
//           console.warn("캐시 데이터 파싱 오류, 캐시 삭제:", error);
//         }
//       }

//       setIsPending(true);

//       // 캐시 데이터가 없거나 오래된 경우 새로운 데이터 fetch
//       try {
//         const response = await fetch(url, { signal: abortControllerRef.current?.signal });

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const newData = (await response.json()) as T;
//         setData(newData);

//         const newCacheEntry: CacheEntry<T> = {
//           data: newData,
//           lastFetched: new Date().getTime(),
//         };

//         localStorage.setItem(storageKey, JSON.stringify(newCacheEntry));
//         console.log("새 데이터 fetch 및 캐시 저장", storageKey);
//       } catch (error) {
//         if (error instanceof Error && error.name === "AbortError") {
//           console.log("요청 취소됨", storageKey);
//           return;
//         }

//         // 재시도 로직
//         if (currentRetry < MAX_RETRIES) {
//           const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, currentRetry);
//           console.log("재시도 중... 시도 횟수:", currentRetry + 1, "지연 시간(ms):", retryDelay);

//           retryTimeoutRef.current = setTimeout(() => {
//             fetchData(currentRetry + 1);
//           }, retryDelay);
//         } else {
//           setIsError(true);
//           setIsPending(false);
//           console.log("최대 재시도 횟수 도달, 에러 처리", storageKey);
//           return;
//         }

//         console.error("Fetch error: ", error);
//         setIsError(true);
//       } finally {
//         setIsPending(false);
//       }
//     };

//     fetchData();

//     return () => {
//       abortControllerRef.current?.abort();

//       if (retryTimeoutRef.current != null) {
//         clearTimeout(retryTimeoutRef.current);
//         retryTimeoutRef.current = null;
//       }
//     };
//   }, [url, storageKey]);

//   return { data, isPending, isError };
// };
