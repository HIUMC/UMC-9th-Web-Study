/**
 * ========================================
 * LP 목록 조회 React Query 훅
 * ========================================
 *
 * LP(Landing Page) 게시글 목록을 무한 스크롤 방식으로 조회하는 훅입니다.
 * React Query의 useInfiniteQuery를 사용하여 커서 기반 페이지네이션을 구현합니다.
 *
 * 주요 기능:
 * 1. 무한 스크롤 지원 (자동으로 다음 페이지 로딩)
 * 2. 검색 및 정렬 기능
 * 3. 자동 캐싱 및 재사용
 * 4. 정렬/검색 변경 시 즉시 새 데이터 로딩
 */

import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PAGINATION_ORDER } from "../../enums/common";

/**
 * useGetLpList 훅의 매개변수 타입
 */
type UseGetLpListParams = {
  search?: string; // 검색 키워드 (옵션)
  order?: PAGINATION_ORDER; // 정렬 순서 (오름차순/내림차순)
  limit?: number; // 한 번에 가져올 LP 개수
};

/**
 * LP 목록을 무한 스크롤로 조회하는 훅
 *
 * @param search - 검색 키워드 (옵션)
 * @param order - 정렬 순서 (옵션)
 * @param limit - 한 페이지당 가져올 개수 (기본값: 20)
 * @returns React Query의 useInfiniteQuery 결과 객체
 *
 * 반환 객체의 주요 속성:
 * - data: 페이지별 LP 데이터 배열
 * - fetchNextPage: 다음 페이지를 가져오는 함수
 * - hasNextPage: 다음 페이지가 있는지 여부
 * - isFetching: 데이터를 가져오는 중인지 여부
 * - isLoading: 초기 로딩 중인지 여부
 *
 * 사용 예시:
 * ```tsx
 * const { data, fetchNextPage, hasNextPage, isFetching } = useGetLpList({
 *   search: '검색어',
 *   order: PAGINATION_ORDER.desc,
 *   limit: 20
 * });
 *
 * // 스크롤 하단 도달 시
 * if (hasNextPage && !isFetching) {
 *   fetchNextPage();
 * }
 * ```
 */
function useGetLpList({ search, order, limit = 20 }: UseGetLpListParams) {
  return useInfiniteQuery({
    // queryKey: 검색/정렬 조건이 바뀌면 새로운 쿼리로 간주됨
    queryKey: ["lps", order, search],

    // queryFn: 실제 데이터를 가져오는 함수
    queryFn: async ({ pageParam }: { pageParam: number | undefined }) => {
      // API 요청 파라미터 구성
      // 첫 페이지(pageParam이 undefined)일 때는 cursor를 전달하지 않음
      const params: {
        cursor?: number;
        search?: string;
        order?: typeof order;
        limit: number;
      } = {
        limit,
        ...(search && { search }), // search가 있을 때만 추가
        ...(order && { order }), // order가 있을 때만 추가
        ...(pageParam && { cursor: pageParam }), // 다음 페이지 요청 시만 cursor 추가
      };
      const response = await getLpList(params);
      return response;
    },

    // staleTime: 데이터가 신선하다고 간주하는 시간 (0 = 항상 stale 상태)
    // 정렬/검색 변경 시 즉시 새 데이터를 가져오도록 0으로 설정
    staleTime: 0,

    // gcTime (Garbage Collection Time): 사용되지 않는 캐시 데이터가 메모리에 남아있는 시간
    // 10분 동안 캐시된 데이터를 유지
    // 10분 동안 사용하지 않으면 캐시 데이터가 자동 삭제됨
    gcTime: 1000 * 60 * 10,

    // getNextPageParam: 다음 페이지를 가져올 때 사용할 pageParam 값을 결정
    // 서버 응답의 hasNext가 true이면 nextCursor를 반환, 아니면 undefined 반환
    // undefined를 반환하면 더 이상 다음 페이지가 없다는 의미
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },

    // initialPageParam: 첫 페이지 요청 시 사용할 pageParam 초기값
    // undefined로 설정하여 첫 페이지는 cursor 없이 요청
    initialPageParam: undefined as number | undefined,
  });
}

export default useGetLpList;
