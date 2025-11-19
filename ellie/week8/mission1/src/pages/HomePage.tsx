import { useEffect, useState } from "react";
import LpCard from "../components/LpCard";
import useGetInfiniteLpList from "../hooks/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import type { Lp } from "../types/lp";
import LpcardSkeletonList from "../components/LpcardSkeletonList";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

function HomePage() {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();
  const debouncedValue = useDebounce(search, 500);

  // const { data, isPending, isError } = useGetLpList({
  //   search,
  //   order,
  //   sort: "createdAt",
  // });
  const {
    data: lps,
    isFetching,
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteLpList(30, debouncedValue, order as PAGINATION_ORDER);

  // ref, inView
  // ref : 특정한 HTML 요소를 감시할 수 있음
  // inView : 그 요소가 화면에 보이면 true
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, fetchNextPage, hasNextPage]);

  if (isPending) {
    return <div className="mt-20 text-2xl">Loading...</div>;
  }

  if (isError) {
    return <div className="mt-20 text-2xl">Error.</div>;
  }

  {
    isPending && <LpcardSkeletonList count={12} />;
  }
  console.log(lps);
  return (
    <>
      <div className="mt-10 p-4">
        <div className="flex justify-between mb-4">
          <input
            className={"border p-4 rounded-sm"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="검색어를 입력하세요"
          />
          <div className="justify-end">
            <button
              className={`w-20 h-8 border border-white rounded-sm ${
                order === "asc" ? "bg-white text-black" : "bg-black text-white"
              }`}
              onClick={() => setOrder("asc")}
            >
              오래된순
            </button>
            <button
              className={`w-20 h-8 border border-white rounded-sm ${
                order === "desc" ? "bg-white text-black" : "bg-black text-white"
              }`}
              onClick={() => setOrder("desc")}
            >
              최신순
            </button>
          </div>
        </div>
        {/* <input value={search} onChange={(e) => setSearch(e.target.value)} /> */}
        <div className="mt-10 p-4">
          <div className="grid grid-cols-8 gap-4 justify-items-center">
            {lps?.pages
              ?.flatMap((page) => page.data.data as unknown as Lp[])
              ?.map((lp: Lp) => (
                <div key={lp.id}>
                  <LpCard lp={lp} />
                </div>
              ))}
            {isFetching && <LpcardSkeletonList count={10} />}
          </div>
        </div>
        <div ref={ref} className="h-6" />
      </div>
      <button
        onClick={() => navigate("/my/postLps")}
        className="text-2xl flex justify-center items-center cursor-pointer fixed bottom-6 right-6 bg-blue-600 text-white size-14 rounded-full"
      >
        <span className="mb-1">+</span>
      </button>
    </>
  );
}

export default HomePage;
