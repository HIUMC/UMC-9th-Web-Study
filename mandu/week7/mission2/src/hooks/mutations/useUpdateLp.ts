import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLp } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useUpdateLp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLp,
    onSuccess: (data, variables) => {
      // 1. 상세 페이지 캐시를 무효화
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpId], // (useGetLpDetail의 쿼리 키)
      });
      // 2. 목록 페이지 캐시도 무효화
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
    },
    onError: (error) => {
      console.error("LP 수정 실패:", error);
      alert("LP 수정에 실패했습니다.");
    },
  });
}

export default useUpdateLp;
