import React, { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import SortButton from "../components/common/SortButton";
import { useOutletContext } from "react-router-dom";
import SearchComponent from "../components/basicLayout/SearchComponent";
import useDebounce from "../hooks/useDebounce";
import useThrottle from "../hooks/useThrottle";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">(
    (localStorage.getItem("order") as "asc" | "desc") || "asc"
  );

  // function useOutletContext<Context = unknown>(): Context;
  // 기본 제네릭이 unknown이므로 타입을 우리가 지정해주어야 함.
  const isSearch = useOutletContext<boolean>();
  // const { data, isPending, isError } = useGetLpList({ search, limit: 50 });
  // console.log(data?.data.data?.map((lp) => lp.id));
  const debouncedSearch = useDebounce(search, 500);

  const {
    data: lps,
    isPending,
    isError,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteLpList(12, debouncedSearch, order as PAGINATION_ORDER);

  // const lastFetchTime = useRef(0);
  // const COOLDOWN = 2000; // 2초

  console.log("isPending : ", isPending);
  console.log("isFetching : ", isFetching);
  console.log("hasNextPage : ", hasNextPage);

  // ref, inView
  // ref -> 특정한 html 요소 감시
  // inView -> ref가 보이면 true
  const { ref, inView } = useInView({ threshold: 0 });

  // const throttledFetchNextPage = useThrottleFn(fetchNextPage, 2000);

  // useEffect(() => {
  //   if (inView && !isFetching && hasNextPage) {
  //     throttledFetchNextPage();
  //   }
  // }, [inView, isFetching, hasNextPage, throttledFetchNextPage]);

  const throttledFetchNextPage = useThrottle(inView, 2000);

  useEffect(() => {
    if (throttledFetchNextPage) {
      if (!isFetching && hasNextPage) {
        fetchNextPage();
      }
    }
  }, [throttledFetchNextPage, isFetching, hasNextPage, fetchNextPage]);

  // useEffect(() => {
  //   if (!inView || isFetching || !hasNextPage) return;

  //   const now = Date.now();
  //   if (now - lastFetchTime.current < COOLDOWN) return;

  //   lastFetchTime.current = now;
  //   fetchNextPage();
  // }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const handleSortChange = (newOrder: "asc" | "desc") => {
    setOrder(newOrder);
    localStorage.setItem("order", newOrder);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  if (isPending) {
    return <div className="mt-20">Loading...</div>;
  }

  if (isError) {
    return <div className="mt-20">Error...</div>;
  }

  // console.log(lps?.pages.map((page) => console.log(page)));
  // [[1,2], [3,4]].flat = [1,2,3,4]

  return (
    <div className="container mx-auto px-4 py-4 flex flex-col">
      <div className="flex items-center justify-center flex-col gap-2">
        <SearchComponent
          isSearch={isSearch}
          search={search}
          handleSearch={handleSearch}
        />
      </div>

      {/* 정렬 버튼 */}
      <SortButton order={order} onSortChange={handleSortChange} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {lps?.pages
          ?.map((page) => page.data.data) // 각 페이지의 LP 배열 꺼냄
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} /> // ✅ key는 항상 고유 ID
          ))}
        {isFetching && !isPending && <LpCardSkeletonList count={20} />}
        <div ref={ref} className="h-2"></div>
      </div>
    </div>
  );
};

export default HomePage;
