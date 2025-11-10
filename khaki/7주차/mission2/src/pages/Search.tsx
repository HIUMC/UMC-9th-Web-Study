import { useCallback, useEffect, useState } from "react";
import { Error } from "../components/Error";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import { LpCard } from "../components/LpCard/LpCard";
import { LpCardSkeletonList } from "../components/LpCard/LpCardSkeletonList";

export const Search = () => {
  //
  const [search, setSearch] = useState("");

  const {
    data: lps,
    isFetching, //
    hasNextPage,
    isPending, // 첫번째 데이터를 기다리는중, 캐시된 데이터가 없을 때 true, isLoading와 동일한 의미
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(10, search, "desc");

  // ref: 감지할 요소에 붙일 참조
  // inView: 해당 요소가 화면에 보이면 true, 안 보이면 false
  const { ref, inView } = useInView({
    threshold: 0,
    // threshold:
    // 0%: 요소가 1픽셀이라도 화면에 들어오면 감지
    // 0.5: 요소의 50%가 보여야 감지
    // 1: 요소의 100%가 모두 보여야 감지
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      // inView: "감지 영역이 화면에 보임"
      // hasNextPage: "가져올 다음 페이지가 있음"
      // !isFetching: "현재 로딩 중이 아님" ← "이미 데이터를 가져오는 중이면 추가 요청하지 마!"
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  // useCallback(): 즉, 함수를 기억해뒀다가 재사용하는 기능.
  // before: 타이핑 → 리렌더링 → 새 함수 생성 → input 재렌더링 → 커서 위치 초기화
  // after: 타이핑 → 리렌더링 → 같은 함수 재사용 → input 안정적 → 커서 위치 유지
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []); // 빈 배열 = 한 번만 생성

  if (isError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Error message="검색 결과를 불러올 수 없습니다." />
      </div>
    );
  }
  console.log(lps);

  return (
    <div className="text-white">
      <div className="flex justify-center mt-4">
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="LP를 검색해보세요..."
          className="w-full max-w-md px-4 py-3 bg-neutral-800 text-white rounded-lg border border-neutral-600 focus:outline-none placeholder-gray-400"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {/* 첫 번째 로딩 시 스켈레톤 */}
        {isPending && <LpCardSkeletonList count={12} />}

        {lps?.pages // 여기까지가 각 page가 담긴 배열
          .map((page) => page.data.data)
          // 그 배열을 돌며 각 page의 data.data를 뽑아냄
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
