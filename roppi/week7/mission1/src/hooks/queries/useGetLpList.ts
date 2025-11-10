import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

export function useGetLpList({cursor, search, order, limit}: PaginationDto) {
return useQuery({
  queryKey: [QUERY_KEY.lps, search, order],
  queryFn: () => getLpList({cursor, search, order, limit}),
  
  // 5분 동안 기존 데이터를 그대로 활용해서 네트워크 요청을 줄임
  staleTime: 1000 * 60 * 5,
  // 사용되지 않는 상태인 쿼리 데이터가 캐시에 남아있는 시간
  // staleTime 이후에 데이터가 신선하지 않더라도, 일정 시간 동안 메모리에 보관,
  // 그 이후에 해당 쿼리가 전혀 사용되지 않으면 해당 캐시 데이터 삭제
  gcTime: 1000 * 60 * 10,

  // 조건에 따라 쿼리를 실행 여부 제어
  // enabled: Boolean(search)
  // refechInterval: 1000 * 60 * 5, // 5분마다 백그라운드에서 자동으로 refetch

  // retry 쿼리 요청이 실패했을 때 자동으로 재시도할 횟수를 지정한다.
  // retry: 2,

  // initialData: 쿼리 실행 전에 미리 제공할 초기 데이터를 지정한다.

  // keepPreviousData: <페이지네이션 때> 파라미터가 변경될 때 이전 데이터를 유지하녀 UI 깜빡임을 줄여줌
  // keepPreviousData: true,

  select: (data) => data.data.data,
},
);

}