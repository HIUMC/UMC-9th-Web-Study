import { useMutation } from "@tanstack/react-query";
import type { RequestPatchLpDto } from "../../types/lp";
import { updateLp } from "../../apis/lp";
import { queryClient } from "../../App";

export default function usePatchLp() {
  return useMutation({
    mutationFn: (variables: { lpId: number; data: RequestPatchLpDto }) =>
      updateLp(variables),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["lp", variables.lpId] });
      await queryClient.refetchQueries({ queryKey: ["lp", variables.lpId] });
    },
  });
}
