/**
 * ========================================
 * LP 상세 정보 조회 React Query 훅
 * ========================================
 *
 * 특정 LP(Landing Page) 게시글의 상세 정보를 조회하는 훅입니다.
 * React Query의 useQuery를 사용하여 데이터를 캐싱하고 효율적으로 관리합니다.
 *
 * 주요 기능:
 * 1. LP 상세 정보 조회 및 캐싱
 * 2. 5분간 데이터를 신선한 상태로 유지 (불필요한 재요청 방지)
 * 3. lpId가 없으면 자동으로 쿼리 비활성화
 */

import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

/**
 * LP 상세 정보를 조회하는 훅
 *
 * @param lpId - 조회할 LP의 고유 ID
 * @returns React Query의 useQuery 결과 객체
 *
 * 반환 객체의 주요 속성:
 * - data: LP 상세 정보 (제목, 내용, 썸네일, 태그, 좋아요 등)
 * - isLoading: 데이터 로딩 중인지 여부
 * - isError: 에러 발생 여부
 * - error: 발생한 에러 객체
 * - refetch: 데이터를 다시 가져오는 함수
 *
 * 사용 예시:
 * ```tsx
 * function LpDetailPage() {
 *   const { lpId } = useParams();
 *   const { data, isLoading, isError } = useGetLpDetail(lpId);
 *
 *   if (isLoading) return <div>로딩중...</div>;
 *   if (isError) return <div>에러 발생</div>;
 *
 *   return (
 *     <div>
 *       <h1>{data.data.title}</h1>
 *       <p>{data.data.content}</p>
 *     </div>
 *   );
 * }
 * ```
 */
function useGetLpDetail(lpId: string) {
  return useQuery({
    // queryKey: 각 LP의 ID별로 별도의 캐시 관리
    queryKey: [QUERY_KEY.lp, lpId],

    // queryFn: 실제 데이터를 가져오는 함수
    queryFn: () => getLpDetail(lpId),

    // staleTime: 데이터가 신선하다고 간주하는 시간
    // 5분 동안은 동일한 LP를 다시 조회해도 서버에 요청하지 않고 캐시된 데이터 사용
    staleTime: 1000 * 60 * 5, // 5분

    // gcTime: 캐시 데이터가 메모리에 유지되는 시간
    // 10분 동안 사용하지 않으면 캐시에서 삭제
    gcTime: 1000 * 60 * 10, // 10분

    // enabled: 쿼리 실행 여부를 제어하는 플래그
    // lpId가 존재할 때만 쿼리를 실행 (빈 문자열이나 undefined면 실행 안 함)
    enabled: !!lpId,
  });
}

export default useGetLpDetail;
