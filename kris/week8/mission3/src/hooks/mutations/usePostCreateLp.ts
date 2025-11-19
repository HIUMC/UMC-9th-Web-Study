import { useMutation } from "@tanstack/react-query";
import { postCreateLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostCreateLp() {
  return useMutation({
    mutationFn: postCreateLp,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
      });
    }
  })
}

export default usePostCreateLp;