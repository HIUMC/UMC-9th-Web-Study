import { useMutation } from "@tanstack/react-query"
import { postLp } from "../../apis/lp"
import { queryClient } from "../../App"
import { QUERY_KEY } from "../../constants/key"

function useLpAdd ({onSuccessCallback} = {}) {
    return useMutation({
        mutationFn:postLp,
        onSuccess : (data) => {
            // 성공 시 실행
            console.log("LP 추가 성공");
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEY.lps],
            })
            if (onSuccessCallback) {
                onSuccessCallback(data);
            }
        },
        onError: (error) => {
            // 에러 처리
            console.error("LP 추가 실패:", error);
            alert("LP 추가에 실패했습니다. 다시 시도해주세요.");
        }
    })
}

export default useLpAdd