import { useQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import type { PaginationDto } from "../../types/common";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, search, order, limit],
    queryFn: () => getLpList({ cursor, search, order, limit }),
    //데이터가 신선하다고 간주하는 시간
    //이 시간 동안은 캐시된 데이터를 그대로 사용합니다. 컴포넌트가 마운트 되거나 창에 포커스 들어오는 경우도 재요청X
    //5분 동안 기존 데이터를 그대로 활용해서 네트워크 요청을 줄인다.
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    //사용되지 않는 (비활성 상태)인 쿼리 데이터가 캐시에 남아있는 시간,
    //staleTime 이후에도 데이터가 필요한 경우 다시 네트워크 요청을 시도한다.
    //10분 동안 캐시된 데이터를 유지한다.
    //10분 동안 사용하지 않으면 캐시 데이터가 삭
    //enabled: Boolean(search),
    //refetchInterval: 100 * 60,
    select: (data) => data.data.data,
  });
}

export default useGetLpList;
