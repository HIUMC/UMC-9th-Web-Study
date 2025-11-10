/**
 * ========================================
 * LP 댓글 목록 조회 React Query 훅
 * ========================================
 *
 * 특정 LP에 달린 댓글 목록을 무한 스크롤 방식으로 조회하는 훅입니다.
 * React Query의 useInfiniteQuery를 사용하여 커서 기반 페이지네이션을 구현합니다.
 *
 * 주요 기능:
 * 1. 무한 스크롤로 댓글 로딩
 * 2. 댓글 정렬 기능
 * 3. 캐시를 사용하지 않아 항상 최신 댓글 표시
 * 4. 조건부 쿼리 실행 (enabled 옵션)
 */

import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpComments } from "../../apis/lp";
import type { PAGINATION_ORDER } from "../../enums/common";

/**
 * useGetLpComments 훅의 매개변수 타입
 */
type UseGetLpCommentsParams = {
  lpId: string; // LP 고유 ID (필수)
  order?: PAGINATION_ORDER; // 정렬 순서 (옵션)
  limit?: number; // 한 번에 가져올 댓글 개수 (옵션)
  enabled?: boolean; // 쿼리 실행 여부 (옵션)
};

/**
 * LP 댓글 목록을 무한 스크롤로 조회하는 훅
 *
 * @param lpId - LP의 고유 ID
 * @param order - 정렬 순서 (오름차순/내림차순)
 * @param limit - 한 페이지당 가져올 댓글 개수 (기본값: 10)
 * @param enabled - 쿼리 실행 여부 (기본값: true)
 * @returns React Query의 useInfiniteQuery 결과 객체
 *
 * 반환 객체의 주요 속성:
 * - data: 페이지별 댓글 데이터 배열
 * - fetchNextPage: 다음 페이지를 가져오는 함수
 * - hasNextPage: 다음 페이지가 있는지 여부
 * - isFetching: 데이터를 가져오는 중인지 여부
 *
 * 사용 예시:
 * ```tsx
 * const { data, fetchNextPage, hasNextPage } = useGetLpComments({
 *   lpId: '123',
 *   order: PAGINATION_ORDER.desc,
 *   limit: 10
 * });
 * ```
 *
 * 주의사항:
 * - staleTime과 gcTime이 0으로 설정되어 있어 캐시를 사용하지 않습니다.
 * - 항상 최신 댓글 데이터를 서버에서 가져옵니다.
 */
function useGetLpComments({
  lpId,
  order,
  limit = 10,
  enabled = true,
}: UseGetLpCommentsParams) {
  return useInfiniteQuery({
    // queryKey: LP ID와 정렬 순서별로 별도의 쿼리로 관리
    queryKey: ["lpComments", lpId, order],

    // queryFn: 실제 댓글 데이터를 가져오는 함수
    queryFn: async ({ pageParam }: { pageParam: number | undefined }) => {
      // API 요청 파라미터 구성
      const params: {
        cursor?: number;
        order?: typeof order;
        limit: number;
      } = {
        limit,
        ...(order && { order }), // order가 있을 때만 추가
        ...(pageParam && { cursor: pageParam }), // 다음 페이지 요청 시만 cursor 추가
      };
      const response = await getLpComments(lpId, params);
      return response;
    },

    // staleTime: 0 = 항상 stale 상태로 간주
    // 댓글은 실시간으로 추가/삭제될 수 있으므로 항상 최신 데이터를 가져옴
    staleTime: 0,

    // gcTime: 0 = 캐시를 즉시 삭제
    // 댓글 데이터는 캐싱하지 않고 항상 서버에서 새로 가져옴
    gcTime: 0,

    // getNextPageParam: 다음 페이지를 가져올 때 사용할 pageParam 결정
    // hasNext가 true면 nextCursor를 반환, 아니면 undefined (더 이상 페이지 없음)
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },

    // initialPageParam: 첫 페이지 요청 시 사용할 초기값
    initialPageParam: undefined as number | undefined,

    // enabled: 쿼리 실행 조건
    // lpId가 존재하고 enabled가 true일 때만 쿼리 실행
    enabled: !!lpId && enabled,
  });
}

export default useGetLpComments;
