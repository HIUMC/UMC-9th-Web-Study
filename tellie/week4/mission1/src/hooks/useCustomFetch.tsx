import { useState, useEffect } from "react";
import axios from "axios";

// useCustomFetch 훅이 데이터를 가져오기 위해 외부로부터 받아야 할 핵심 정보
interface FetchParams {
    url: string; // API 요청 URL
    deps: any[]; // useEffect의 의존성 배열
}

// useCustomFetch 정의하여 Custom Hook 만듬
export const useCustomFetch = <T,>({ url, deps }: FetchParams) => {
    const [data, setData] = useState<T | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);


    useEffect(() => {
        if (!url) return; // URL 유효하지 않다면 요청 보내지 X
        const fetchData = async () => {
            setData(null); // 이전 데이터 초기화
            setIsPending(true); // 로딩 시작
            setIsError(false); // 에러 상태 초기화
            
            try {
                const response = await axios.get<T>(url, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        accept: "application/json",
                    }
                });
                setData(response.data);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };
        fetchData();
    }, deps);

    // 정의한 3가지 상태 (데이터, 로딩 상태, 에러 상태) 를 외부에 반환
    return { data, isPending, isError };
};

export default useCustomFetch;