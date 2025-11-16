import { useMutation } from "@tanstack/react-query";
import { patchLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePatchLp() {
  return useMutation({
    mutationFn: patchLp,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.id],
      });
      alert("LP 상세 정보가 수정되었습니다!");
    },
    onError: () => {
      alert("LP 상세 정보 수정에 실패했습니다!");
    },
  });
}

export default usePatchLp;
