import { useMutation } from "@tanstack/react-query";
import { patchLp } from "../../apis/lp";
import type { RequestCreateLpDto } from "../../types/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePatchLp(lpId: number) {
  return useMutation({
    mutationFn:  (body: RequestCreateLpDto) => patchLp({ lpId }, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, lpId],
      })
    }
  })
}

export default usePatchLp;