import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({cursor, search, order, limit}: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, order],
    queryFn: () => getLpList({
      cursor, search, order, limit,
    }),

    // 데이터가 fresh하다고 간주되는 시간. 이 시간 동안 캐시된 데이터 그대로 사용
    // 컴포넌트가 마운트 되거나 창에 포커스 들어와도 재요청 X
    staleTime: 1000*60*5, // 5분 동안 기존 데이터 그대로 활용

    // 사용되지 않는 쿼리 데이터가 캐시에 남아있는 시간
    // staleTime 지나고 데이터가 fresh하지 않아도 일정 시간 메모리에 보관
    // 그 이후에 해당 쿼리가 전혀 사용되지 않으면 gcTime 후 제거 (garbage collection)
    gcTime: 1000*60*10, // 10분 동안 사용되지 않으면 캐시 데이터 삭제, 재요청 시 데이터 받아오기

    // 조건에 따라 쿼리 실행 여부 제어
    // enabled: Boolean(search),

    // refetchInterval: 100*60,

    // 쿼리 요청 실패 시 자동으로 재시도할 횟수 (기본값: 3)
    // retry: 3,

    // initialData: 쿼리 실행 전 미리 제공할 초기 데이터 설정
    // 렌더링될 때 빈 데이터 구조 제공해서 로딩 전에도 안전하게 UI 구성
    // initialData: [],

    // 파라미터 변경 시 이전 데이터 유지하여 UI 깜박임(Flicking) 줄임
    // ex. 페이지네이션 시 페이지 전환 사이 이전 데이터 표시
    // keepPreviousData: true,

    select: data => data.data.data,
  })
}

export default useGetLpList
