import { useMutation } from "@tanstack/react-query";
import { deleteLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useDeleteLp() {
  return useMutation({
    mutationFn: deleteLp,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
      });
      alert("LP가 삭제되었습니다.");
    },
    onError: () => {
      alert("LP 삭제에 실패했습니다. 다시 시도해주세요");
    },
  });
}

export default useDeleteLp;
