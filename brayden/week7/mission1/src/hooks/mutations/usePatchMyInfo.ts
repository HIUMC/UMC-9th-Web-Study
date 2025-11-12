import { useMutation } from "@tanstack/react-query";
import { patchMyInfo } from "../../apis/auth";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePatchMyInfo() {
  return useMutation({
    mutationFn: patchMyInfo,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
      });
    },
  });
}

export default usePatchMyInfo;
