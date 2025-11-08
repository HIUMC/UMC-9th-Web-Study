import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { queryClient } from "../../App";

export default function useDeleteLike() {
  return useMutation({
    mutationFn: (variables: { lpId: number }) => deleteLike(variables),
    onSuccess: (_, variables) => {
      queryClient.refetchQueries({
        queryKey: ["lp", variables.lpId], // ✅ key를 lp로 통일
      });
    },
  });
}
