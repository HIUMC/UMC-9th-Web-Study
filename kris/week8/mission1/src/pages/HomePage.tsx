import { useEffect, useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import { Sidebar } from "../components/Sidebar";
import { PAGINATION_ORDER } from "../enums/common";
import { Link } from "react-router-dom";
import { Loader2, LoaderCircle, X } from "lucide-react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LpCardSkeleton from "../components/LpCardSkeleton";
import LpCardSkeletonList from "../components/LpCardSkeletonList";
import LpCard from "../components/LpCard";
import useDebounce from "../hooks/useDebounce";
import { SearchDropdown } from "../components/SearchDropdown";

const Homepage = () => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  // const {data, isPending, isError} = useGetLpList({search, order, limit: 50,})
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const debouncedSearchInput = useDebounce(searchInput, 300).trim();

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(10, debouncedSearchInput, order);

  const handleOrderChange = (newOrder: PAGINATION_ORDER) => {
    setOrder(newOrder);
  };

  // ref: 특정한 html 요소를 감시
  // inView: 그 요소가 화면에 보이면 true
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 300,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  // [[1, 2], [3, 4]].flat() => [1, 2, 3, 4]

  return (
    <>
      {/* {isPending && (
        <div className="flex flex-row justify-center items-center bg-black text-white h-full">
          <Loader2 className="animate-spin h-20 w-20"/>
        </div>
      )} */}

      <div className="flex flex-col bg-black text-white h-full">
        <div className="flex flex-col relative my-6 mx-20">
          <input
            type="text"
            className="h-[40px] w-full rounded-md bg-[#4f4f4f] px-3 text-white"
            placeholder="LP 검색"
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
          />
          {!!searchInput && (
            <X
              className="absolute top-3 right-3 scale-90 cursor-pointer"
              color="white"
              onClick={() => setSearchInput("")}
            />
          )}
          {isSearchOpen && (
            <div className="bg-black shadow-lg z-10 w-full absolute top-[45px] rounded-b-md">
              <SearchDropdown onClose={() => setIsSearchOpen(false)} />
            </div>
          )}
        </div>
        <div className="flex flex-row justify-end mr-20 p-4">
          <button
            className={`px-4 py-2 rounded-md border border-gray-200 ${
              order === PAGINATION_ORDER.desc
                ? "bg-white text-black"
                : "bg-black text-white"
            }`}
            onClick={() => handleOrderChange(PAGINATION_ORDER.desc)}
          >
            최신순
          </button>
          <button
            className={`px-4 py-2 rounded-md border border-gray-200 ${
              order === PAGINATION_ORDER.asc
                ? "bg-white text-black"
                : "bg-black text-white"
            }`}
            onClick={() => handleOrderChange(PAGINATION_ORDER.asc)}
          >
            오래된순
          </button>
        </div>
        <div className="flex flex-wrap">
          {isError && (
            <div className="flex flex-row justify-center items-center bg-black text-white h-full">
              <h1>데이터를 불러올 수 없습니다.</h1>
            </div>
          )}
          {lps?.pages
            ?.map((page) => page.data.data)
            ?.flat()
            ?.map((lp) => (
              <LpCard key={lp.data?.id} lp={lp} />
            ))}
        </div>
        <div ref={ref}>{isFetching && <LpCardSkeletonList count={20} />}</div>
      </div>
    </>
  );
};

export default Homepage;
