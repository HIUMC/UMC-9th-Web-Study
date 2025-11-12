import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: () => getLpList({ cursor, search, order, limit }), // 외부 인자 O -> callback 설정

    // 데이터가 신선하다고 간주하는 시간
    // 이 시간동안 캐시된 데이터를 그대로 사용. 컴포넌트가 마운트되거나 창에 포커스 들어오는 경우도 재요청 X
    // 5분동안 기존 데이터를 그대로 활용해서 네트워크 요청을 줄인다.
    staleTime: 1000 * 60 * 5, // 5분

    // Garbage Collection Time
    // 비활성 상태인 쿼리 데이터가 캐시에 남아있는 시간
    // staleTime이 지나고 데이터가 신선하지 않더라도 일정시간동안 메모리에 저장
    // 그 이후에 해당 쿼리가 전혀 사용되지 않으면 gcTime이 지난 후에 제거한다(garbage collection)
    // 10분 동안 사용되지 않으면 해당 캐시 데이터 삭제, 다시 요청 시 새로운 데이터를 받아옴
    gcTime: 100 * 60 * 10, // 10분 -> App 전체의 메모리 사이즈를 고려하여 결정

    // 조건에 따라 쿼리 실행 여부 제어
    // boolean 타입 -> 기본값은 true
    // enabled: Boolean(search),

    // 주식 데이터 : 맨날 바뀜
    // 예 : 랭킹 시스템 -> 1분마다 자동으로 갱신시키고 싶음 => refetchInterval
    // refetchInterval: 100 * 60,

    // 쿼리 요청이 실패했을 때 자동으로 재시도 할 횟수 지정
    // 기본값은 3회 정도, 네트워크 오류 등 임시적인 문제를 보완할 수 있음.
    // 전역적으로 모든 쿼리에 대해서 설정
    // retry : 3,

    // initialData : 쿼리 실행 전 미리 제공할 초기 데이터를 설정
    // 컴포넌트가 렌더링 될 때 빈 데이터 구조를 미리 제공해서, 로딩 전에도 안전하게 UI를 구성할 수 있게 해주는 친구다.

    // keepPreviousData : Pagination일 경우 파라미터가 변경될 때 이전 데이터를 유지하여 깜박임(flicking)을 줄여준다.
    // ex) 페이지네이션 시 페이지 전환 사이에 이전 데이터를 보여주어 사용자 경험을 향상시킨다.

    select: (data) => data.data.data,
  });
}

export default useGetLpList;
