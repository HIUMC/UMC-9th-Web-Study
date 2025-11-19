import { useEffect, useRef, useState } from "react";
import { PAGINATION_ORDER } from "../enums/common";
import { X } from "lucide-react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LpCardSkeletonList from "../components/LpCardSkeletonList";
import LpCard from "../components/LpCard";
import useDebounce from "../hooks/useDebounce";
import useThrottle from "../hooks/useThrottle";

const Homepage = () => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  // const {data, isPending, isError} = useGetLpList({search, order, limit: 50,})
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const debouncedSearchInput = useDebounce(searchInput, 500).trim();

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(20, debouncedSearchInput, order);

  const handleOrderChange = (newOrder: PAGINATION_ORDER) => {
    setOrder(newOrder);
  };

  // ref: 특정한 html 요소를 감시
  // inView: 그 요소가 화면에 보이면 true
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const throttledInView = useThrottle(inView, 100);
  const prevThrottledInView = useRef(false);

  useEffect(() => {
    if (
      throttledInView &&
      !prevThrottledInView.current &&
      !isFetching &&
      hasNextPage
    ) {
      fetchNextPage();
    }
    prevThrottledInView.current = throttledInView;
  }, [throttledInView, isFetching, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (!debouncedSearchInput) return;
    if (!recentSearches.includes(debouncedSearchInput)) {
      setRecentSearches((prevSearches) => [
        debouncedSearchInput,
        ...prevSearches.slice(0, 4),
      ]);
    }
  }, [debouncedSearchInput]);

  const handleRecentSearchClick = (search: string) => {
    setSearchInput(search);
    setIsSearchOpen(false);
  };

  // [[1, 2], [3, 4]].flat() => [1, 2, 3, 4]

  return (
    <>
      <div className="flex flex-col bg-black text-white h-full">
        {/* 검색창 */}
        <div
          className="flex flex-col relative my-6 mx-24 items-center"
          onBlur={() => {
            setIsSearchOpen(false);
          }}
        >
          <input
            type="text"
            value={searchInput}
            className="h-[40px] w-full rounded-md bg-[#4f4f4f] px-3 text-white"
            placeholder="LP 검색"
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
            onClick={() => setIsSearchOpen(true)}
          />
          {!!searchInput && (
            <X
              className="absolute right-3 top-2 scale-90 cursor-pointer"
              color="white"
              onClick={() => setSearchInput("")}
            />
          )}
          <div
            className={`w-full overflow-hidden transform transition-all duration-200 ease-out ${
              isSearchOpen ? `opacity-100 max-h-96` : `opacity-0 max-h-0`
            }`}
            onMouseDown={(e) => e.preventDefault()}
          >
            <div className="bg-black shadow-lg z-10 w-full rounded-b-md mt-2">
              <div className="bg-[#1d1d1d] text-white p-4 shadow-lg z-10 flex flex-col">
                <div className="flex flex-row space-x-4 items-center mb-2">
                  <p>최근 검색어</p>
                  <p
                    className="text-gray-400 text-sm cursor-pointer"
                    onClick={() => {
                      setRecentSearches([]);
                    }}
                  >
                    모두 지우기
                  </p>
                </div>

                {recentSearches.length === 0 ? (
                  <div className="my-2 flex flex-col items-center">
                    <p className="my-4 text-sm text-gray-400">
                      최근 검색한 내용이 없습니다.
                    </p>
                  </div>
                ) : (
                  <div className="">
                    {recentSearches.map((search, index) => (
                      <div
                        className="flex flex-row items-center mt-2"
                        key={index}
                      >
                        <X
                          className="scale-70 cursor-pointer mr-2"
                          color="gray"
                          onClick={() => {
                            setRecentSearches(
                              recentSearches.filter((_, i) => i !== index)
                            );
                          }}
                        />
                        <p
                          key={index}
                          className="my-2 text-sm cursor-pointer"
                          onClick={() => {
                            handleRecentSearchClick(search);
                          }}
                        >
                          {search}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="cursor-pointer text-sm"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* LP 조회 */}
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
        <div className="flex flex-row justify-center w-full px-16">
          <div className="flex flex-wrap gap-4 mx-16 w-full">
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
        </div>
        <div ref={ref} className="w-full gap-4 justify-center mx-16">
          {isFetching && <LpCardSkeletonList count={20} />}
        </div>
      </div>
    </>
  );
};

export default Homepage;
