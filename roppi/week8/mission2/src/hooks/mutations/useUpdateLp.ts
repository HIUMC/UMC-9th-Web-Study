import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLp } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useUpdateLp(lpId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLp,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
       queryKey: ["lp", lpId],
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
    },
    onError: (error) => {
      console.error("LP 수정 실패:", error);
      alert("LP 수정에 실패했습니다.");
    },
  });
}

export default useUpdateLp; 