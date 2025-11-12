import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostLike() {
    return useMutation({
        mutationFn:postLike,
        // data : API 성공 응답 데이터
        // variables : mutate에 전달한 값
        // context : onMutate에서 반환한 값
        onSuccess : (data) => { //postLike 성공시 ~행동 해줘 variable : mutation 전달한 값이 담김
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEY.lps, data.data.lpId],
                exact:true,
            })
        },
        // error : 요청 실패시 발생한 에러
        // onError : 요청 실패시 실행
        // onError(error, variables, context) => {},

        // onMutate : 요청 직전에 실행
        // Optimistic Update 구현시 유용
        // onMutate(variables) => { return hello }

        // onSettled : 요청 끝난 후 항상 실행됨
        // 로딩 상태를 초기화 할 때 유용함. 

    })
}

export default usePostLike