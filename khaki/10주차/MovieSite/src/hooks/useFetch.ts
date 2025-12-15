import type { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { axiosClient } from "../apis/axiosClient";

// url과 options를 인자로 받아 데이터를 fetch하는 커스텀 훅
const useFetch = <T>(
  url: string,
  options: AxiosRequestConfig
): { data: T | null; error: string | null; isLoading: boolean } => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // fetchData: 데이터를 가져오는 비동기 함수
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // axiosClient를 사용해 GET 요청을 보내고 응답 데이터를 data에 저장
        const { data } = await axiosClient.get(url, { ...options });
        setData(data);
      } catch {
        setError("데이터를 가져오는데 에러가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    // 실제로 fetchData 함수 호출
    fetchData();
  }, [url, options]);

  return { data, error, isLoading };
};

export default useFetch;
