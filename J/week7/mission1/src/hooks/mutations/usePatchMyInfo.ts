import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { RequestPatchMyInfoDto, ResponseMyInfoDto } from "../../types/auth"
import { patchMyInfo } from "../../apis/auth"
import { QUERY_KEY } from "../../constants/key";

export const usePatchMyInfo = () => {
    const queryClient = useQueryClient();

    return useMutation<ResponseMyInfoDto, Error, RequestPatchMyInfoDto>({
        mutationFn: (body: RequestPatchMyInfoDto) => patchMyInfo(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
        },
    });
}