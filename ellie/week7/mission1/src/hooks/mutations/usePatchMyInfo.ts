import { useMutation } from "@tanstack/react-query";
import { patchMyInfo } from "../../apis/auth";
import { queryClient } from "../../App";

export default function usePatchMyInfo() {
  return useMutation({
    mutationFn: patchMyInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
  });
}
