import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postLike } from "../../apis/lp"
import { QUERY_KEY } from "../../constants/key";

export const usePostLike = (lpid: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => postLike(lpid),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY.lp]})
        }
    })
}