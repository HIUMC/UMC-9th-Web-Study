import { useEffect, useState } from "react";
import { Error } from "../components/Error";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import { LpCard } from "../components/LpCard/LpCard";
import { LpCardSkeletonList } from "../components/LpCard/LpCardSkeletonList";

export const Search = () => {
  //
  const [search, setSearch] = useState("");
  //
  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(10, search, "desc");

  const { ref, inView } = useInView({
    threshold: 0,
  });

  // inView가 변경될 때마다 실행되는 효과
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  if (isError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Error message="검색 결과를 불러올 수 없습니다." />
      </div>
    );
  }

  console.log("data:", lps);

  return (
    <div className="text-white">
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {/* 첫 번째 로딩 시 스켈레톤 */}
        {isPending && <LpCardSkeletonList count={12} />}

        {lps?.pages
          .map((page) => page.data.data)
          .flat()
          // flat: 중첩된 배열을 하나의 배열에 펼침
          .map((lp) => (
            <LpCard {...lp} key={lp.id} />
          ))}

        {/* 다음 페이지 로딩 중일 때 스켈레톤 표시 */}
        {isFetching && <LpCardSkeletonList count={10} />}
      </div>
      <div ref={ref} className="h-4"></div>
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
*/
