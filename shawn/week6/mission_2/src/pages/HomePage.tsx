import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useGetLpList from "../hooks/queries/useGetLpList";
import { PAGINATION_ORDER } from "../enums/common";
import LpCardSkeleton from "../components/LpCardSkeleton";

export default function HomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.asc); // 기본값을 오래된순으로 변경
  const observerTarget = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetLpList({
    search,
    order,
  });

  // 무한 스크롤 트리거
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleCardClick = (lpId: number) => {
    navigate(`/lp/${lpId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // 모든 페이지의 LP 데이터를 하나의 배열로 합치기
  const allLps = data?.pages.flatMap((page) => page.data.data) ?? [];

  return (
    <div className="p-6">
      {/* 검색바 */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 w-full sm:max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="LP 검색..."
            className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setOrder(PAGINATION_ORDER.asc)}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              order === PAGINATION_ORDER.asc
                ? "bg-pink-500 text-white"
                : "bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 hover:text-white hover:border-pink-500"
            }`}
          >
            오래된순
          </button>
          <button
            onClick={() => setOrder(PAGINATION_ORDER.desc)}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              order === PAGINATION_ORDER.desc
                ? "bg-pink-500 text-white"
                : "bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 hover:text-white hover:border-pink-500"
            }`}
          >
            최신순
          </button>
        </div>
      </div>

      {/* 에러 상태 */}
      {error && (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="text-red-400 text-center">
            <p className="text-lg font-medium mb-2">에러가 발생했습니다</p>
            <p className="text-sm text-gray-400">{String(error)}</p>
          </div>
        </div>
      )}

      {/* LP 그리드 */}
      {!error && (
        <>
          {/* 초기 로딩 스켈레톤 */}
          {isLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[...Array(20)].map((_, i) => (
                <LpCardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* LP 카드 그리드 */}
          {!isLoading && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {allLps.map((lp) => (
                  <div
                    key={lp.id}
                    onClick={() => handleCardClick(lp.id)}
                    className="group cursor-pointer"
                  >
                    <div className="w-full aspect-square bg-[#1a1a1a] rounded-lg overflow-hidden mb-2 relative">
                      <img
                        src={lp.thumbnail}
                        alt={lp.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/400x400/1a1a1a/ffffff?text=No+Image";
                        }}
                      />
                      {/* 오버레이 및 메타 정보 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                        <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2">
                          {lp.title}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-gray-300">
                          <span>{formatDate(lp.createdAt.toString())}</span>
                          <div className="flex items-center gap-1">
                            <span>❤️</span>
                            <span>{lp.likes?.length || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-white truncate">
                      {lp.title}
                    </h3>
                    <p className="text-xs text-gray-400 truncate">
                      {lp.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* 다음 페이지 로딩 스켈레톤 */}
              {isFetchingNextPage && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                  {[...Array(20)].map((_, i) => (
                    <LpCardSkeleton key={`next-${i}`} />
                  ))}
                </div>
              )}

              {/* 무한 스크롤 트리거 */}
              <div ref={observerTarget} className="h-4" />

              {/* 데이터가 없을 때 */}
              {allLps.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <p className="text-lg mb-2">LP가 없습니다</p>
                  <p className="text-sm">새로운 LP를 등록해보세요!</p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
