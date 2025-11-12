import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostLike() {
  return useMutation({
    mutationFn: postLike,
    // retry : 실패 시 몇번 재요청할 것인지
    // retryDelay : 실패시 몇 초 뒤에 재요청할지
    // post like 요청 성공시 아래의 조건을 실행해줘

    // data -> api 성공 응답 데이터
    // variables -> mutate에 전달한 값
    // context -> onMutate에서 반환한 값
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpid],
        exact: true,
        // false 시 정확히 매칭이 안되도 앞에것만 맞으면 새로 데이터를 가져오라고 fetching
        // true 시 모두 맞아야 데이터 갱신되어야 함.
        // 보통의 경우에는 앞자리가 lps인 경우에는 다 새로고침 해주는 게 굿
        // 하지만 너무 많으면 자원낭비의 단점도 존재
        // invalidateQueries 한 번 더 가능
      });
    },
    // error -> 요청 실패시 발생한 에러
    // variables -> mutate에 전달한 값
    // context -> onMutate에서 반환한 값
    // onError: (error, variables, context) => {},

    // 요청 직전에 실행(optimistic update에서 사용)
    // onMutate: (variables) => {
    //   console.log("hi");
    // },
    // 요청이 끝난 후 항상 실행됨(OnSuccess, onError 후에 실행됨)
    // 로딩 상태를 초기화할 때 유용
    // onSettled: (data, error, variables, context) => {},
  });
}

export default usePostLike;
