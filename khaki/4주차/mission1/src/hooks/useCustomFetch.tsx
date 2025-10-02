import axios from "axios";
import { useEffect, useState } from "react";

function useCustomFetch<T>(path : string | null, pageParams? : Record<string,any>)
// Record<K, T> : 키가 K타입이고, 값이 T타입인 객체
// params? : 이 인자는 필수인자는 아님
{

  const[apiData, setApiData] = useState<T|null>(null);  // api에서 불러온 데이터
  const [isPending, setIsPending] = useState(false);  // 로딩 상태
  const [isError, setIsError] = useState(false);  // 에러 상태
  
  /* 
  1. 리액트 훅 내부의 상태값은 결국 훅을 쓰는 컴포넌트의 state트리에 붙어있음 따라서 컴포넌트는 isPending, isError,apiData를 자기 상태처럼 계속 구독하게 됨
  2. 훅 안에서 setIsPending(true) 호출 → 리액트는 해당 훅을 쓰는 컴포넌트를 리렌더.
  3. 리렌더될 때 다시 const { apiData, isPending, isError } = useCustomFetch(...)가 실행되고 최신 값이 들어감.
  */



  useEffect(():void => {
    // path 없으면 호출 안 함
    if (!path) return;

    // api에서 각 페이지별 필요한 정보 가져오기
    const fetchData = async () => {
        try{
          setIsError(false);
          setIsPending(true);
          // 이렇게 사이사이 상태변경이 있어도 이 함수가 다 끝나야 적용되는 것이 아니라 컴포넌트에서 상태를 보고 변경이 되면 즉시 리렌더가 일어남

          const {data} = await axios.get<T>(`https://api.themoviedb.org/3${path}`, 
          {   
            params: {
              language:'ko-KR',
              ...pageParams,
            },
            headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            }
          })
          console.log('detail:', data);
          setApiData(data);
        }
        catch{
          setIsError(true);
        }
        finally{
          setIsPending(false);
        }
        
        
      }
    fetchData();
    
    
  },[path, JSON.stringify(pageParams)]) 
  // JSON.stringify(pageParams)로 직렬화하면 실제 내용이 바뀌었을 때만 effect 재실행.
  
  // 커스텀 훅은 컴포넌트가 사용해야 할 값이나 함수들을 묶어서 반환한다. 
  // 즉, state + setter + 로직 함수 + 상태값 등을 한 객체나 배열 형태로 내보냅니다.
  return {
    apiData, isPending, isError // 이것도 apiData: apiData의 축약표기
  }
}

export default useCustomFetch;