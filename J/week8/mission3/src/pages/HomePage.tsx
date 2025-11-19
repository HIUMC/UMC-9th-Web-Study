import { useEffect, useRef, useState } from "react";
import { PAGINATION_ORDER } from "../enums/common";
import { Link } from "react-router-dom";
import { getTimeAgo } from "../utils/time";
import { useGetInfiniteLpList } from "../hooks/queries/useGetInfiniteLpList";
import { LpSkeleton } from "../components/LpSkeleton";
import useDebounce from "../hooks/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay";

export const HomePage = () => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.newest);
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY);
  const { data, isFetching, isFetchingNextPage, hasNextPage, isPending, fetchNextPage, isError, refetch } = useGetInfiniteLpList(10, order, debouncedValue);
  const lpList = data?.pages.flatMap(page => page.data.data) ?? [];

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    alert("Error")
    return (
      <div
        className="flex flex-col justify-center items-center h-[60vh] space-y-4">
        <button
          onClick={() => refetch()}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors"
        >
          재시도
        </button>
      </div>
    );
  }
  
  return (
    <div className="mt-20 p-4">
      <div className="flex justify-center items-center mx-auto px-4 py-6">
      <input
        className={"border p-4 rounded-sm "}
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      </div>
        <div className="flex justify-end mb-4">
            <div className="inline-flex rounded-lg overflow-hidden border border-neutral-700">
                <button
                    onClick={() => setOrder(PAGINATION_ORDER.oldest)}
                    className={`px-4 py-2 transition-colors ${
                    order === PAGINATION_ORDER.oldest
                        ? "bg-white text-black"
                        : "bg-neutral-800 hover:bg-neutral-700"
                    }`}
                >
                    오래된순
                        </button>
                <button
                    onClick={() => setOrder(PAGINATION_ORDER.newest)}
                    className={`px-4 py-2 transition-colors ${
                    order === PAGINATION_ORDER.newest
                        ? "bg-white text-black"
                        : "bg-neutral-800 hover:bg-neutral-700"
                    }`}
                >
                    최신순
                </button>
            </div>
        </div>
      <div className="py-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {isPending && Array.from({ length: 12 }).map((_, i) => (
            <LpSkeleton key={i} />
            ))}
        {lpList.map((lp)=> (
            <Link to={`/lp/${lp.id}`} key={lp.id} className="relative overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform cursor-pointer">
                <img className="w-full h-[200px]"
                  src={lp.thumbnail ? lp.thumbnail :`https://picsum.photos/400/300?random=${lp.id}`}
                    alt={lp.title} />
                    <div className="absolute inset-0 flex flex-col justify-end bg-black/30 p-3 opacity-0 hover:opacity-100 transition-opacity">
                        <p className="text-white font-bold text-sm truncate">{lp.title}</p>
                        <p className="text-gray-200 text-xs line-clamp-2">{lp.content}</p>
                        <p className="text-gray-400 text-xs mt-1">
                            {getTimeAgo(lp.createdAt)}
                        </p>
                    </div>
            </Link>
        ))}
        {isFetchingNextPage && Array.from({ length: 6 }).map((_, i) => <LpSkeleton key={i} />)}
      </div>
      <div ref={observerRef}/>
    </div>
  );
};
