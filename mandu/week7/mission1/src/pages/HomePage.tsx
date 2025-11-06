import { useEffect, useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

const HomePage = () => {
  const [search, setSearch] = useState("");

  const [asc, setAsc] = useState(true);
  const currentOrder = asc ? PAGINATION_ORDER.asc : PAGINATION_ORDER.desc;

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(10, search, currentOrder);

  // re,inView
  //ref ->특정한 HTML 요소를 감시 가능
  // inView -> 그 요소가 화면에 보이면 true
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending)
    return (
      <div className="flex justify-center items-center h-full text-4xl">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-full text-4xl">
        Error
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-6">
      {/* <input value={search} onChange={(e) => setSearch(e.target.value)} /> */}
      <div className="flex justify-end items-center mb-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`
              px-4 py-2 text-sm font-medium rounded-l-lg transition-colors duration-200 border-white-600
              ${
                !asc
                  ? "bg-white text-black"
                  : "bg-black text-white border  hover:bg-gray-600"
              }
            `}
            onClick={() => setAsc(false)}
          >
            오래된 순
          </button>
          <button
            type="button"
            className={`
              px-4 py-2 text-sm font-medium rounded-r-lg transition-colors duration-200 border-white-600
              ${
                asc
                  ? "bg-white text-black"
                  : "bg-black text-white border  hover:bg-gray-600"
              }
            `}
            onClick={() => setAsc(true)}
          >
            최신 순
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>
      <div ref={ref} className="h-2"></div>
    </div>
  );
};

export default HomePage;
