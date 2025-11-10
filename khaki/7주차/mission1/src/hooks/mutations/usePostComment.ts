import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { postComments } from "../../apis/comments";

function usePostComment() {
  return useMutation({
    mutationFn: postComments,

    // data: 서버에서 반환된 응답 데이터
    // variables: mutate 함수에 전달된 변수(lpId)
    // context: onMutate에서 반환된 값
    onSuccess: (data) => {
      console.log(data, "댓글 추가 성공");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments],
      });
    },

    // error: 발생한 에러 객체
    // variables: mutate 함수에 전달된 변수(lpId)
    // context: onMutate에서 반환된 값
    onError: (error) => {
      console.log("댓글 추가 실패:", error);
    },
  });
}

export default usePostComment;
