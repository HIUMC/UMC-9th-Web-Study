import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteComment } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

export const useDeleteComment = (lpid: string) => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, number>({
        mutationFn: (commentid) => deleteComment(lpid, commentid),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY.lpComments, lpid]});
        },
    });
};