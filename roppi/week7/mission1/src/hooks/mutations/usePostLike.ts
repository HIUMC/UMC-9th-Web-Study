import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";

const usePostLike = () => {
  return useMutation({
    mutationFn: (variables: { lpId: number }) => postLike(variables),
    onSuccess: (_, variables) => {
      queryClient.refetchQueries({
        queryKey: ["lp", variables.lpId],
      });
    },
  });
}
export default usePostLike;