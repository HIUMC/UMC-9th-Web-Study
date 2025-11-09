import { useMutation } from "@tanstack/react-query"
import { patchComments } from "../../apis/comment"
import { queryClient } from "../../App"
import { QUERY_KEY } from "../../constants/key"
import type { RequestCommentDto } from "../../types/comment"

function usePatchComment(lpId: number, commentId:number) {
    return useMutation({
        mutationFn: (content : RequestCommentDto) => patchComments(content,{lpId,commentId}),
        onSuccess : () => {
            queryClient.invalidateQueries({
            queryKey:[QUERY_KEY.lpComments,lpId],       
            })
        },
        onError : (error) => {
            console.error("댓글 수정 실패 : ", error)
        },
    })
}



export default usePatchComment