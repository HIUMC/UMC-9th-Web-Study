import { useMutation, useQueryClient } from "@tanstack/react-query"
import { patchLp } from "../../apis/lp";
import type { RequestCreateLpDto, ResponseCreateLpDto } from "../../types/lp";
import { QUERY_KEY } from "../../constants/key";

export const usePatchLp = (lpid: string) => {
    const queryClient = useQueryClient();

    return useMutation<ResponseCreateLpDto, Error, RequestCreateLpDto>({
        mutationFn: (body: RequestCreateLpDto) => patchLp(lpid, body),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QUERY_KEY.lp, lpid]});
        }
    })
}