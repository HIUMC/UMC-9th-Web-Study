// 직접 재현
// import { useEffect, useMemo, useRef, useState } from "react";

// // stale time : 데이터를 유지할 시간 설정
// const STALE_TIME = 5 * 60 * 1000; // 5 minutes


// // 11번 유저 -> 실패 ( 데이터 x )
// // ~0.1초 지남
// // 11번 유저 가입 (재요청)
// // 11번 유저 -> 성공 ( 데이터 o )
// // -> retry 제공

// const MAX_RETRIES = 3;
// // 1초마다 재시도
// const INITIAL_RETRY_DELAY = 1000;

// // 로컬 스토리지에 저장할 데이터의 구조
// interface CacheEntry<T>{
//     data: T;
//     lastFetched: number; // 마지막으로 데이터를 가져온 시점 ( 타임스탬프 )
// }

// export const useCustomFetch = <T>(url : string) => {
//     const [data,setData] = useState<T | null>(null);

//     const [isPending,setIsPending] = useState(false);

//     const [isError,setIsError] = useState(false);


//     const storageKey = useMemo(() => url, [url]) // url 달라질 때 마다 실행

//     const abortControllerRef = useRef<AbortController | null>(null); // 마지막 요청만 보기 ref : 데이터 보존 위함

//     const retryTimeoutRef = useRef<number | null>(null);

//     useEffect(() => {

//         abortControllerRef.current = new AbortController();

//         setIsError(false);

//         const fetchData = async(currentRetry = 0) => {

//             const currentTime = new Date().getTime();
//             const cachedItem = localStorage.getItem(storageKey);

//             // 캐시 데이터 확인, 신선도 검증
//             if(cachedItem) {
//                 try{
//                     const cachedData: CacheEntry<T> = JSON.parse(cachedItem);

//                     // 캐시가 신선한 경우 (STALE_TIME 이내)
//                     if(currentTime - cachedData.lastFetched < STALE_TIME) {
//                         setData(cachedData.data);
//                         setIsPending(false);
//                         console.log("캐시된 데이터 사용", url);
//                         return;
//                     }

//                     // 캐시가 신선하지 않은 경우 ( 만료된 경우 )
//                     setData(cachedData.data);
//                     console.log("만료된 캐시 데이터 사용", url);
//                 }catch{
//                     localStorage.removeItem(storageKey);
//                     console.warn(`캐시 에러 : 캐시 삭제함`, url);
//                 }
//             }



//             setIsPending(true);
//             try{
//                 const response = await fetch(url, {
//                     signal: abortControllerRef.current?.signal,
//                 });
//                 // 400번대 : 클라이언트 오류 500번대 : 서버의 오류 잡기 위함
//                 if (!response.ok) { // fetch라서 필요. axios는 필요 x
//                     throw new Error("Failed to fetch data");
//                 }
//                 const newData = await response.json();
//                 setData(data);

//                 // 캐싱 작업
//                 const newCacheEntry: CacheEntry<T> ={
//                     data : newData,
//                     lastFetched: new Date().getTime(), // 현재 시간을 타임스탬프로 저장
//                 }

//                 localStorage.setItem(storageKey, JSON.stringify(newCacheEntry));
//             } catch(error){
//                 if(error instanceof Error && error.name === 'AbortErorr'){
//                     console.log("요청 취소됨",url);
//                     return;
//                 }

//                 if(currentRetry < MAX_RETRIES) {
//                     // 1 -> 2 -> 4 -> 8
//                     const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, currentRetry); // pow : n승으로 계산
//                     console.log(`재시도, ${currentRetry + 1}/${MAX_RETRIES} Retrying ${retryDelay}ms later`);

//                     retryTimeoutRef.current = setTimeout(() => {
//                         fetchData(currentRetry + 1);
//                     }, retryDelay);
//                 } else {
//                     // 최대 재시도 횟수 초과
//                     setIsError(true);
//                     setIsPending(false);
//                     console.log("최대 재시도 횟수 초과",url);
//                     return;
//                 }

//                 setIsError(true);
//                 console.log(error);
//             } finally {
//                 setIsPending(false);
//             }
//         }
//         fetchData();

//         return () => {
//             abortControllerRef.current?.abort(); // 경쟁 상태 방지, 리소스 낭비 방지

//             // 예약된 재시도 타이머 취소
//             if(retryTimeoutRef.current !== null) {
//                 clearTimeout(retryTimeoutRef.current);
//                 retryTimeoutRef.current = null;
//             }
//         };
//     }, [url, storageKey])
//     return {data, isPending, isError};
// }



// React - Query 사용

import { useQuery } from "@tanstack/react-query";

export const useCustomFetch = <T>(url : string) => {
    return useQuery({
        queryKey:[url],

        queryFn: async({signal}) => {
            const response = await fetch(url,{signal});

            if (!response.ok){
                throw new Error("Failed to fetch data");
            }
            
            return response.json() as Promise<T>;
        },

        retry :3,

        // 지수 백오프 전략 문제점 
        // retry : 10 이면 1 -> 2 -> 4 -> 8 -> ... -> 1024 너무 시간이 늘어난다!!

        retryDelay : (attempIndex) => {
            return Math.min(1000 * Math.pow(2,attempIndex), 30);
        },

        staleTime : 5 * 60 * 1000,
        

        // 쿼리가 사용되지 않은 채로 10분 지나면 캐시에서 제거됨.
        gcTime : 10 * 60 * 1000, // garbage collection time
    })
}