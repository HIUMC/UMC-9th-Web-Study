import { useMutation } from "@tanstack/react-query";
import { deleteLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useDeleteLps() {
    return useMutation({
        mutationFn:deleteLp,
        onSuccess: (lpid) => {
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEY.lps, lpid],
            })
            alert("Lp 삭제 완료")
        },
        onError: (error) => {
            console.error("Lp 삭제 실패 : ", error)
        }
    })
}

export default useDeleteLps;