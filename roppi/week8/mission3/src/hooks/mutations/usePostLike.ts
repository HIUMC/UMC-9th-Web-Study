import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";



const usePostLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lpId : number) =>
      postLike(lpId),
 
    onSuccess: (_, lpId) => {
      queryClient.invalidateQueries({
        queryKey: ["lp", lpId],
      });
    },
  });
};
export default usePostLike;