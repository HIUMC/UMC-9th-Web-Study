import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getLp } from "../../apis/lp";

function useGetLp(id: number) {
  return useQuery({
    queryKey: [QUERY_KEY.lp, id],
    queryFn: () => getLp(id),

    staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
    gcTime: 1000 * 60 * 10, // 10분간 캐시 보관
    retry: 2, // 실패 시 2번 재시도
    enabled: Boolean(id) && !isNaN(id) && id > 0, // id가 유효한 숫자일 때만 실행
  });
}

export default useGetLp;
