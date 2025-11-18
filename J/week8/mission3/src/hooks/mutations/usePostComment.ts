import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postComment } from "../../apis/lp"
import { QUERY_KEY } from "../../constants/key";
import type { RequestCommentDto, ResponseCommentDto } from "../../types/lp";

export const usePostComment = (lpid: string) => {
    const queryClient = useQueryClient();

    return useMutation<ResponseCommentDto, Error, RequestCommentDto>({
        mutationFn: (body: RequestCommentDto) => postComment(lpid, body),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY.lpComments, lpid]});
        }
    });
}