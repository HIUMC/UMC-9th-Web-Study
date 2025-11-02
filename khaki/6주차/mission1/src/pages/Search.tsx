import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Error } from "../components/Error";

export const Search = () => {
  const [search, setSearch] = useState("LP1");
  const { data, isPending, isError } = useGetLpList({ search });

  if (isPending) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Error message="검색 결과를 불러올 수 없습니다." />
      </div>
    );
  }

  return (
    <div className="text-white">
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      {data?.data.data.map((lp) => (
        <h1 key={lp.id}>{lp.title}</h1>
      ))}
    </div>
  );
};

/*
리렌더링 흐름:
  1. 사용자가 input에 타이핑 → onChange 이벤트 발생
  2. setSearch(e.target.value) 호출 → search state 변경
  3. 컴포넌트 리렌더링 → Search 함수 컴포넌트 전체가 다시 실행
  4. useGetLpList({ search }) 재호출 → 새로운 search 값으로 쿼리 실행
  5. 새로운 데이터 반환 → 컴포넌트 다시 리렌더링

React Query의 장점:
다행히 useGetLpList에서 React Query를 사용하고 있어서:

  - 중복 요청 방지: 같은 search 값이면 캐시된 데이터 사용
  - 자동 로딩 상태 관리: isPending, isError 제공
  - 백그라운드 업데이트: 데이터가 stale되면 자동으로 refetch
*/
