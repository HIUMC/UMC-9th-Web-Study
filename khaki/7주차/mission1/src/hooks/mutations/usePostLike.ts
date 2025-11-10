import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/like";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostLike() {
  return useMutation({
    mutationFn: postLike,

    // data: 서버에서 반환된 응답 데이터
    // variables: mutate 함수에 전달된 변수(lpId)
    // context: onMutate에서 반환된 값
    onSuccess: (data) => {
      console.log("좋아요 추가 성공");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lp, data?.data.lpId],
      });
    },

    // error: 발생한 에러 객체
    // variables: mutate 함수에 전달된 변수(lpId)
    // context: onMutate에서 반환된 값
    onError: (error) => {
      console.log("좋아요 추가 실패:", error);
      // 409 에러시에는 캐시를 invalidate하지 않음
    },

    // onMutate: 요청 직전에 실행되는 함수
    onMutate: () => {
      console.log("hi");
    },

    // onSettled: 요청이 성공하든 실패하든 무조건 실행되는 함수
    onSettled: () => {
      console.log("좋아요 추가 요청 완료");
    },
  });
}

export default usePostLike;
