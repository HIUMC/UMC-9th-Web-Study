
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
  const [search, setSearch] = useState("co");
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  // const {data, isPending, isError} = useGetLpList({search, order, limit: 50,})
  const [isLoading, setIsLoading] = useState(false);

  const {data: lps, isFetching, hasNextPage, isPending, fetchNextPage, isError} = useGetInfiniteLpList(10, search, order);

  const handleOrderChange = (newOrder: PAGINATION_ORDER) => {
    setOrder(newOrder)
  }

  const getTimesAgo = (date: Date | string) => {
    const now = new Date();
    const past = new Date(date);
    const diff = now.getTime() - past.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} years ago`;
    if (months > 0) return `${months} months ago`;
    if (weeks > 0) return `${weeks} weeks ago`;
    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hours ago`;
    if (minutes > 0) return `${minutes} minutes ago`;
    return `${seconds} seconds ago`;
  }

  // ref: 특정한 html 요소를 감시
  // inView: 그 요소가 화면에 보이면 true
  const {ref, inView} = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if(inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage])

  // [[1, 2], [3, 4]].flat() => [1, 2, 3, 4]

  return (
    <>
      {isPending && (
        <div className="flex flex-row justify-center items-center bg-black text-white h-full">
          <Loader2 className="animate-spin h-20 w-20"/>
        </div>
      )}
      {isError && (
        <div className="flex flex-row justify-center items-center bg-black text-white h-full">
          <h1>데이터를 불러올 수 없습니다.</h1>
        </div>
      )}
      <div className="flex flex-row bg-black text-white h-full">
        <div className="h-full w-full mx-14 mt-4">
          <div className="flex flex-row justify-end p-4">
            <button className={`px-4 py-2 rounded-md border border-gray-200 ${order === PAGINATION_ORDER.desc ? "bg-white text-black" : "bg-black text-white"}`} onClick={() => handleOrderChange(PAGINATION_ORDER.desc)}>최신순</button>
            <button className={`px-4 py-2 rounded-md border border-gray-200 ${order === PAGINATION_ORDER.asc ? "bg-white text-black" : "bg-black text-white"}`} onClick={() => handleOrderChange(PAGINATION_ORDER.asc)}>오래된순</button>
          </div>
          <div className="flex flex-wrap">
            {lps?.pages?.map((page) => page.data.data)?.flat()?.map((lp) => (
              <LpCard key={lp.id} lp={lp} />
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