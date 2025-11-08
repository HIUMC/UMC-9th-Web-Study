import useGetLpList from "../hooks/queries/useGetLpList";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { PAGINATION_ORDER } from "../enums/common";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import type { Lp } from "../types/lp";
import LpCardSkeleton from "../components/LpCardSkeleton";

const HomePage = () => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.asc);
  const navigate = useNavigate();
  
  const { 
    data, 
    isFetching, 
    hasNextPage, 
    isLoading: isPending, 
    fetchNextPage, 
    isError 
  } = useGetLpList({
    search: "",
    order,
    limit: 50
  });

  // ref, inView
  // ref -> 특정한 HTML 요소를 감시할 수 있다.
  // inView -> 그 요소가 화면에 보이면 true
  const{ref, inView} = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if(isPending) {
    // Skeleton UI 로딩
    return (
      <div className='flex flex-col items-center min-h-screen bg-black text-white'>
        <Navbar />
        <div className="mt-10 p-10 w-full max-w-7xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array(12).fill(0).map((_, i) => (
              <LpCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if(isError) {
    // 에러
    return (
      <div className='flex flex-col items-center min-h-screen bg-black text-white'>
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="text-red-500">Error...</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black text-white'>
      <Navbar />
      <div className="mt-10 p-10 w-full max-w-7xl">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setOrder(PAGINATION_ORDER.asc)}  
            className={`border border-white rounded-xl px-4 py-2 ${order === PAGINATION_ORDER.asc ? "bg-white text-black" : "bg-black text-white"}`}
          >
            오래된 순
          </button>
          <button
            onClick={() => setOrder(PAGINATION_ORDER.desc)}
            className={`border border-white rounded-xl px-4 py-2 ${order === PAGINATION_ORDER.desc ? "bg-white text-black" : "bg-black text-white"}`}
          >
            최신 순
          </button>
        </div>
        
        {/* LP 그리드 표시 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {data?.pages?.flatMap((page) =>
            page.data.data.map((lp: Lp) => (
              <div 
                key={lp.id} 
                className="aspect-square relative group cursor-pointer overflow-hidden transform transition-transform duration-200 hover:scale-105"
                onClick={() => navigate(`/lp/${lp.id}`)}
              >
                {/* 썸네일 이미지 */}
                <img 
                  src={lp.thumbnail}
                  alt={lp.title}
                  className="w-full h-full object-cover"
                />
                {/* Hover 오버레이 */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-all">
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-lg">{lp.title}</h3>
                    <div className="flex justify-between mt-1">
                      <span>{new Date(lp.updatedAt).toLocaleDateString()}</span>
                      <span className="ml-2">♡ {lp.likes?.length || 0}</span>
                    </div>
                  </div>
                </div>
              </div> 
            ))
          ) || []}
        </div>
        <div ref={ref} className="mt-4" />
        {isFetching && hasNextPage && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array(6).fill(0).map((_, i) => (
              <LpCardSkeleton key={`skeleton-${i}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

}

export default HomePage;