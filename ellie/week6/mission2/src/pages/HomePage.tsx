import { useEffect, useState } from "react";
import LpCard from "../components/LpCard";
import useGetInfiniteLpList from "../hooks/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import type { Lp } from "../types/lp";
import LpcardSkeletonList from "../components/LpcardSkeletonList";

function HomePage() {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

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
  } = useGetInfiniteLpList(30, search, order as PAGINATION_ORDER);

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

  return (
    <>
      <div className="mt-10 p-4">
        <div className="flex justify-end mb-4">
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
    </>
  );
}

export default HomePage;
