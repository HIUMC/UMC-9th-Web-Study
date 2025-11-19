import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Heart } from "lucide-react";
import Navbar from "../components/Navbar";
import LpCardSkeleton from "../components/LpCardSkeleton";
import useGetLpList from "../hooks/queries/useGetLpList";
import useThrottle from "../hooks/useThrottle";
import type { Lp } from "../types/lp";
import { PAGINATION_ORDER } from "../enums/common";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.asc);
  const navigate = useNavigate();
  const { userId } = useAuth();
  
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
    limit: 20
  });

  // ref, inView
  // ref -> 특정한 HTML 요소를 감시할 수 있다.
  // inView -> 그 요소가 화면에 보이면 true
  const{ref, inView} = useInView({
    threshold: 0,
  });

  // inView 상태와 시간을 조합하여 3초마다 새로운 트리거를 생성
  const [fetchTrigger, setFetchTrigger] = useState(0);
  
  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      const timer = setTimeout(() => {
        setFetchTrigger(prev => prev + 1);
      }, 100); // 짧은 딜레이로 즉시 트리거
      
      return () => clearTimeout(timer);
    }
  }, [inView, isFetching, hasNextPage]);
  
  // fetchTrigger를 3초 간격으로 throttle 처리
  const throttledFetchTrigger = useThrottle(fetchTrigger, 3000);
  
  useEffect(() => {
    if (throttledFetchTrigger > 0) {
      fetchNextPage();
    }
  }, [throttledFetchTrigger, fetchNextPage]);

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
            오래된순
          </button>
          <button
            onClick={() => setOrder(PAGINATION_ORDER.desc)}
            className={`border border-white rounded-xl px-4 py-2 ${order === PAGINATION_ORDER.desc ? "bg-white text-black" : "bg-black text-white"}`}
          >
            최신순
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
                  <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                    <h3 className="text-lg">{lp.title}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <span>{new Date(lp.updatedAt).toLocaleDateString()}</span>
                      <div className="flex items-center gap-1">
                        <Heart
                          size={16}
                          fill={userId && lp.likes?.some(like => like.userId === userId) ? "currentColor" : "none"}
                          className="text-pink-500"
                        />
                        <span>{lp.likes?.length || 0}</span>
                      </div>
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