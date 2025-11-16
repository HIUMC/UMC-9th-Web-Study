import { useMutation } from "@tanstack/react-query"
import { postComments } from "../../apis/comment"
import { queryClient } from "../../App"
import { QUERY_KEY } from "../../constants/key"
import type { RequestCommentDto } from "../../types/comment"

function usePostComment (lpid: number) {
    return useMutation({
        mutationFn:( content:RequestCommentDto) => postComments(content, {lpid}),
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEY.lpComments,lpid],
                
            })
        },
        onError : (error) => {
            console.error("댓글 작성 실패 : ", error)
        },
        })
}


export default usePostComment