import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { RequestCommentDto, ResponseCommentDto } from "../../types/lp"
import { patchComment } from "../../apis/lp"
import { QUERY_KEY } from "../../constants/key";

export const usePatchComment = (lpid: string) => {
    const queryClient = useQueryClient();

    return useMutation<ResponseCommentDto, Error, {commentid: number, body: RequestCommentDto}>({
        mutationFn: ({commentid, body}) => patchComment(lpid, commentid, body),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY.lpComments, lpid]})
        }
    });
};