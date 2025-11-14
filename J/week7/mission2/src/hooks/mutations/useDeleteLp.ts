import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteLp } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

export const useDeleteLp = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (lpid: number) => deleteLp(lpid),
        onSuccess: (_, lpid) => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY.lp, lpid]});
        },
    });
}