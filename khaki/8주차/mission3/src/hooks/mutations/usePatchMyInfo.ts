import { useMutation } from "@tanstack/react-query";
import { patchMyInfo } from "../../apis/user";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import type { ResponseMyInfoDto } from "../../types/auth";

function usePatchMyInfo() {
  return useMutation({
    mutationFn: patchMyInfo,

    onMutate: async (newInfo) => {
      // 1. 해당 쿼리의 요청이 진행 중이라면 취소
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });

      // 2. 현재 캐시 데이터를 가져와 롤백할 변수, 낙관적 업데이트 반영할 변수에 임시저장
      const previousMyInfo = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
      const optimisticMyInfo = JSON.parse(JSON.stringify(previousMyInfo));

      // 3. 캐시 데이터를 즉시 업데이트(낙관적 업데이트)
      optimisticMyInfo!.data.name = newInfo.name;
      optimisticMyInfo!.data.bio = newInfo.bio || null;
      optimisticMyInfo!.data.avatar = newInfo.avatar || null;

      // 업데이트된 데이터를 캐시에 반영
      queryClient.setQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo], optimisticMyInfo);

      return { previousMyInfo };
    },

    onError: (error, _newInfo, context) => {
      console.log("내 정보 수정 실패:", error);
      // 오류가 발생했을 때 이전 상태로 롤백
      queryClient.setQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo], context?.previousMyInfo);
    },

    onSettled: async () => {
      // 항상 최신 데이터를 가져오도록 설정
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },
  });
}

export default usePatchMyInfo;
