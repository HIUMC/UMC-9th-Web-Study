import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key"; // (key.ts에 myInfo 키가 있다고 가정)
import { updateMy } from "../../apis/auth";
import { queryClient } from "../../App";
import type { myPageDto, ResponseMyInfoDto } from "../../types/auth";

function useUpdateMyInfo() {
  return useMutation({
    mutationFn: updateMy,
    onMutate: async (newInfoPayload: myPageDto) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.myInfo],
      });

      // 2. 현재 게시글의 데이터를 캐시해서 가져와야
      const previousMyPost = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);

      // 게시글 데이터를 복사해서 NewLpPost에 저장
      // 복사하는 가장 큰 이유는 나중에 오류가 발생했을 때 이전 상태로 되돌리기 위해서
      const newMyPost = { ...previousMyPost };

      // 업데이트된 게시글 데이터를 캐시에 저장
      // 이렇게하면 UI가 바로 업데이트 됨, 사용자가 변화를 확인할 수 있다.
      queryClient.setQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo], {
        ...previousMyPost, // { status, message } 등 유지
        data: {
          ...previousMyPost?.data, // { id, email } 등 유지
          ...newInfoPayload, // { name, bio, avatar } 덮어쓰기
        },
      });

      return { previousMyPost };
    },
    onError: (error, variables, context) => {
      console.error("사용자 정보 수정 실패:", error);
      queryClient.setQueryData([QUERY_KEY.myInfo], context?.previousMyPost);
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
      console.log("사용자 정보 수정 성공");
    },
  });
}

export default useUpdateMyInfo;
