import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

// LP 목록을 가져오는 useQuery 커스텀 훅
function useGetLpList({ cursor, limit, search, order }: PaginationDto) {
  return useQuery({
    // 검색어나 정렬이 바뀌면 완전히 다른 데이터로, queryKey에 반영해 따로따로 캐싱해는 것!
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: () => getLpList({ cursor, limit, search, order }),

    // 데이터 신선도 유지 시간
    staleTime: 1000 * 60 * 5, // 5 minutes

    // 가비지 컬렉션 시간
    gcTime: 1000 * 60 * 10, // 10 minutes

    // 조건에 따라 쿼리 실행 여부 결정
    // enabled: Boolean(search),

    // refetchInterval: 1000 * 60, // 1 minutes

    retry: 3,

    initialData: undefined,

    // 쿼리 키가 변경될 때 이전 데이터를 유지하여 UI 깜빡임 방지
    placeholderData: keepPreviousData,

    // 원하는 데이터만 선택하여 반환
    // select: (data) => data.data.data,
  });
}

export default useGetLpList;
