/**
 * ========================================
 * 홈페이지 (HomePage)
 * ========================================
 *
 * LP(Landing Page) 목록을 표시하는 메인 페이지입니다.
 * 무한 스크롤, 검색, 정렬 기능을 제공합니다.
 *
 * 주요 기능:
 * 1. LP 목록 조회 (React Query의 useInfiniteQuery 사용)
 * 2. 무한 스크롤 (Intersection Observer API 사용)
 * 3. 실시간 검색 (debounce 없이 즉시 적용)
 * 4. 정렬 (오래된순/최신순)
 * 5. 스켈레톤 로딩 (초기 로딩 및 다음 페이지 로딩)
 * 6. LP 카드 클릭 시 상세 페이지로 이동
 *
 * 무한 스크롤 동작:
 * 1. 페이지 하단의 observerTarget이 화면에 보이면
 * 2. fetchNextPage() 호출하여 다음 페이지 데이터 요청
 * 3. 새 데이터가 기존 데이터 배열에 추가됨
 * 4. hasNextPage가 false가 될 때까지 반복
 */

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useGetLpList from "../hooks/queries/useGetLpList";
import { PAGINATION_ORDER } from "../enums/common";
import LpCardSkeleton from "../components/LpCardSkeleton";

/**
 * 홈페이지 컴포넌트
 * LP 목록을 무한 스크롤로 표시
 */
export default function HomePage() {
  // 라우터 네비게이션 함수
  const navigate = useNavigate();

  // 검색 키워드 상태
  const [search, setSearch] = useState("");

  // 정렬 순서 상태 (기본값: 오래된순)
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.asc);

  // 무한 스크롤 트리거용 DOM 참조
  const observerTarget = useRef<HTMLDivElement>(null);

  // LP 목록 조회 (무한 스크롤)
  const {
    data, // 페이지별 LP 데이터
    isLoading, // 초기 로딩 상태
    error, // 에러 객체
    fetchNextPage, // 다음 페이지 가져오는 함수
    hasNextPage, // 다음 페이지 존재 여부
    isFetchingNextPage, // 다음 페이지 로딩 중 여부
  } = useGetLpList({
    search,
    order,
  });

  /**
   * 무한 스크롤 트리거 Effect
   * Intersection Observer를 사용하여 observerTarget이 화면에 보이면
   * 다음 페이지 데이터를 자동으로 가져옴
   */
  useEffect(() => {
    // Intersection Observer 생성
    const observer = new IntersectionObserver(
      (entries) => {
        // observerTarget이 화면에 보이고, 다음 페이지가 있고, 로딩 중이 아니면
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage(); // 다음 페이지 가져오기
        }
      },
      { threshold: 0.1 } // 10% 이상 보이면 트리거
    );

    // observerTarget에 옵저버 연결
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    // 컴포넌트 언마운트 시 옵저버 정리
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  /**
   * LP 카드 클릭 핸들러
   * 클릭한 LP의 상세 페이지로 이동
   *
   * @param lpId - 클릭한 LP의 ID
   */
  const handleCardClick = (lpId: number) => {
    navigate(`/lp/${lpId}`);
  };

  /**
   * 날짜 포맷팅 함수
   * Date 문자열을 한국어 날짜 형식으로 변환
   *
   * @param dateString - ISO 형식의 날짜 문자열
   * @returns 포맷된 날짜 (예: 2025.01.01)
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // 모든 페이지의 LP 데이터를 하나의 배열로 합치기
  // useInfiniteQuery는 페이지별로 데이터를 저장하므로 flatMap으로 평탄화
  const allLps = data?.pages.flatMap((page) => page.data.data) ?? [];

  // JSX 렌더링
  return (
    <div className="p-6">
      {/* ==================== 검색 및 정렬 바 ==================== */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* 검색 입력 필드 */}
        <div className="flex-1 w-full sm:max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="LP 검색..."
            className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
          />
        </div>

        {/* 정렬 버튼들 */}
        <div className="flex gap-2">
          {/* 오래된순 정렬 버튼 */}
          <button
            onClick={() => setOrder(PAGINATION_ORDER.asc)}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              order === PAGINATION_ORDER.asc
                ? "bg-pink-500 text-white" // 활성 상태
                : "bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 hover:text-white hover:border-pink-500" // 비활성 상태
            }`}
          >
            오래된순
          </button>

          {/* 최신순 정렬 버튼 */}
          <button
            onClick={() => setOrder(PAGINATION_ORDER.desc)}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              order === PAGINATION_ORDER.desc
                ? "bg-pink-500 text-white" // 활성 상태
                : "bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 hover:text-white hover:border-pink-500" // 비활성 상태
            }`}
          >
            최신순
          </button>
        </div>
      </div>

      {/* ==================== 에러 상태 ==================== */}
      {error && (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="text-red-400 text-center">
            <p className="text-lg font-medium mb-2">에러가 발생했습니다</p>
            <p className="text-sm text-gray-400">{String(error)}</p>
          </div>
        </div>
      )}

      {/* ==================== LP 그리드 ==================== */}
      {!error && (
        <>
          {/* 초기 로딩 스켈레톤: 첫 로딩 시 20개의 스켈레톤 카드 표시 */}
          {isLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[...Array(20)].map((_, i) => (
                <LpCardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* LP 카드 그리드: 실제 LP 데이터 표시 */}
          {!isLoading && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {/* LP 카드 순회 렌더링 */}
                {allLps.map((lp) => (
                  <div
                    key={lp.id}
                    onClick={() => handleCardClick(lp.id)}
                    className="group cursor-pointer"
                  >
                    {/* LP 썸네일 카드 */}
                    <div className="w-full aspect-square bg-[#1a1a1a] rounded-lg overflow-hidden mb-2 relative">
                      {/* 썸네일 이미지 (호버 시 확대 효과) */}
                      <img
                        src={lp.thumbnail}
                        alt={lp.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          // 이미지 로드 실패 시 플레이스홀더 표시
                          e.currentTarget.src =
                            "https://via.placeholder.com/400x400/1a1a1a/ffffff?text=No+Image";
                        }}
                      />

                      {/* 호버 시 보이는 오버레이 및 메타 정보 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                        {/* LP 제목 (최대 2줄) */}
                        <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2">
                          {lp.title}
                        </h3>

                        {/* 메타 정보: 날짜 및 좋아요 수 */}
                        <div className="flex items-center justify-between text-xs text-gray-300">
                          <span>{formatDate(lp.createdAt.toString())}</span>
                          <div className="flex items-center gap-1">
                            <span>❤️</span>
                            <span>{lp.likes?.length || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* LP 제목 (카드 하단, 1줄 생략) */}
                    <h3 className="text-sm font-medium text-white truncate">
                      {lp.title}
                    </h3>

                    {/* LP 내용 미리보기 (카드 하단, 1줄 생략) */}
                    <p className="text-xs text-gray-400 truncate">
                      {lp.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* 다음 페이지 로딩 스켈레톤: 스크롤 시 추가 데이터 로딩 표시 */}
              {isFetchingNextPage && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                  {[...Array(20)].map((_, i) => (
                    <LpCardSkeleton key={`next-${i}`} />
                  ))}
                </div>
              )}

              {/* 무한 스크롤 트리거: 이 요소가 화면에 보이면 다음 페이지 로딩 */}
              <div ref={observerTarget} className="h-4" />

              {/* 데이터가 없을 때: 빈 상태 메시지 */}
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
