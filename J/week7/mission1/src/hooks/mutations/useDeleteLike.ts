import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteLike } from "../../apis/lp"
import { QUERY_KEY } from "../../constants/key";

export const useDeleteLike = (lpid: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteLike(lpid),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY.lp]})
        }
    })
}