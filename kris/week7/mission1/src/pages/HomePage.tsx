
import { useEffect, useState } from "react"
import useGetLpList from "../hooks/queries/useGetLpList"
import { Sidebar } from "../components/Sidebar";
import { PAGINATION_ORDER } from "../enums/common";
import { Link } from "react-router-dom";
import { Loader2, LoaderCircle } from "lucide-react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LpCardSkeleton from "../components/LpCardSkeleton";
import LpCardSkeletonList from "../components/LpCardSkeletonList";
import LpCard from "../components/LpCard";

const Homepage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  // const {data, isPending, isError} = useGetLpList({search, order, limit: 50,})
  const [isLoading, setIsLoading] = useState(false);

  const {data: lps, isFetching, hasNextPage, isPending, fetchNextPage, isError} = useGetInfiniteLpList(10, search, order);

  const handleOrderChange = (newOrder: PAGINATION_ORDER) => {
    setOrder(newOrder)
  }

  // ref: 특정한 html 요소를 감시
  // inView: 그 요소가 화면에 보이면 true
  const {ref, inView} = useInView({
    threshold: 0,
    delay: 300
  })

  useEffect(() => {
    if(inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage])

  // [[1, 2], [3, 4]].flat() => [1, 2, 3, 4]

  return (
    <>
      {/* {isPending && (
        <div className="flex flex-row justify-center items-center bg-black text-white h-full">
          <Loader2 className="animate-spin h-20 w-20"/>
        </div>
      )} */}
      
      <div className="flex flex-row bg-black text-white h-full">
        <div className="h-full w-full mx-14 mt-4">
          <div className="flex flex-row justify-end p-4">
            <button className={`px-4 py-2 rounded-md border border-gray-200 ${order === PAGINATION_ORDER.desc ? "bg-white text-black" : "bg-black text-white"}`} onClick={() => handleOrderChange(PAGINATION_ORDER.desc)}>최신순</button>
            <button className={`px-4 py-2 rounded-md border border-gray-200 ${order === PAGINATION_ORDER.asc ? "bg-white text-black" : "bg-black text-white"}`} onClick={() => handleOrderChange(PAGINATION_ORDER.asc)}>오래된순</button>
          </div>
          <div className="flex flex-wrap">
            {isError && (
              <div className="flex flex-row justify-center items-center bg-black text-white h-full">
                <h1>데이터를 불러올 수 없습니다.</h1>
              </div>
            )}
            {lps?.pages?.map((page) => page.data.data)?.flat()?.map((lp) => (
              <LpCard key={lp.data?.id} lp={lp} />
            ))}
          </div>
          <div ref={ref}>
            {isFetching && (
              <LpCardSkeletonList count={10}/>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Homepage