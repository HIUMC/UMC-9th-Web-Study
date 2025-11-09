import { useMutation } from "@tanstack/react-query"
import { deleteComments } from "../../apis/comment"
import { queryClient } from "../../App"
import { QUERY_KEY } from "../../constants/key"

function useDeleteComment(lpId: number, commentId:number) {
    return useMutation({
        mutationFn:() => deleteComments({lpId, commentId}),
        onSuccess : () => {
                    queryClient.invalidateQueries({
                    queryKey:[QUERY_KEY.lpComments,lpId],       
                    })
                },
                onError : (error) => {
                    console.error("댓글 삭제 실패 : ", error)
                },
    })
}
export default useDeleteComment