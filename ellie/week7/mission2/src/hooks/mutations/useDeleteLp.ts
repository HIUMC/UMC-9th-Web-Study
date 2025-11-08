import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { deleteLp } from "../../apis/lp";

export default function useDeleteLp() {
  return useMutation({
    mutationFn: (variables: { lpId: number }) => deleteLp(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lpList"] });
    },
  });
}
