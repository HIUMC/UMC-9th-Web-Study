import { useMutation } from "@tanstack/react-query";
import { patchMyInfo } from "../../apis/auth";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

export default function usePatchMyInfo() {
  return useMutation({
    mutationFn: patchMyInfo,
    onMutate: async (updatedData: any) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myinfo] });
      const previousMyInfo = queryClient.getQueryData([QUERY_KEY.myinfo]);

      queryClient.setQueryData([QUERY_KEY.myinfo], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: { ...old.data, ...updatedData },
        };
      });
      const after = queryClient.getQueryData([QUERY_KEY.myinfo]);

      return { previousMyInfo };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myinfo] });
    },
    onError: (err, variables, context) => {
      if (context?.previousMyInfo) {
        queryClient.setQueryData([QUERY_KEY.myinfo], context.previousMyInfo);
      }
    },
  });
}
