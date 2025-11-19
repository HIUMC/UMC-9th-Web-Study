import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({cursor,search,order,limit,sort}:PaginationDto){
    return useQuery({
        queryKey:[QUERY_KEY.lps,search,order,sort],
        queryFn: () => getLpList({
            cursor,
            search,
            order,
            limit,
            sort,
        }),

        // 데이터가 신선하다고 간주하는 시간
        // 시간 동안은 캐시된 데이터 그대로 사용
        // 컴포넌트가 마운트 되거나 창에 포커스 들어오는경우도 재요청 X
        // 5분 동안 기존 데이터를 그대로 활용해서 네트워크 요청을 줄임.
        staleTime : 5 * 60 * 1000, // 5분

        // 사용되지 않는 쿼리 데이터가 캐시에 남아 있는 시간.
        // staleTime 이후 데이터가 신선하지 않더라도 일정 시간 동안 메모리에 보관 
        // 그 이후에 해당 쿼리가 전혀 사용되지 않으면 gcTime(garbage collection) 이후 제거
        gcTime : 10 * 60 * 1000, // 10분

        // 조건에 따라 쿼리 실행 여부 제어
        // enabled : Boolean(search),

        // retry : 쿼리 요청이 실패 했을 때 자동으로 재시도 할 횟수를 저장.
        // 네트워크 오류 등 일시적인 문제를 보완할 수 있다.
        // 현재는 App.tsx에 전역적으로 선언함.

        // initialData : 쿼리 실행 전 미리 제공할 초기 데이터를 설정.
        // 컴포넌트가 빈 데이터 구조를 미리 제공하여 로딩 전에 안전하게 UI 를 구성할 수 있게 한다.
        
        // keepPreviousData : true,
        // 파라미터가 변경될 때 이전 데이터를 유지해 UI 깜빡임을 줄여줌
        // 예 : 페이지네이션 시 페이지 전환 사이에 이전 데이터를 보여줌

        select: (data) => data.data.data,
        
    });
}


export default useGetLpList;