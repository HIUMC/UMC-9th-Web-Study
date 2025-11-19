import { useMutation } from "@tanstack/react-query";
import { patchMyInfo } from "../../apis/auth";
import { QUERY_KEY } from "../../constants/key";
import { queryClient } from "../../App";
import type { ResponseMyInfoDto } from "../../types/auth";

function usePatchMyInfo() {
  return useMutation({
    mutationFn: patchMyInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
      });
    },
    onMutate: async (newInfo) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.myInfo],
      });
      const previousMyInfo = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
      const newMyInfo = {...previousMyInfo,
        data: {
          ...previousMyInfo?.data,
          name: newInfo.name,
          bio: newInfo.bio || previousMyInfo?.data.bio,
          avatar: newInfo.avatar || previousMyInfo?.data.avatar,
        }
      };
      queryClient.setQueryData([QUERY_KEY.myInfo], newMyInfo);
      return { previousMyInfo };
    },
    onError: (error, newInfo, context) => {
      console.log(error, newInfo)
      queryClient.setQueryData([QUERY_KEY.myInfo], context?.previousMyInfo);
      alert("정보 수정 실패");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
      });
    },
  })
}

export default usePatchMyInfo;