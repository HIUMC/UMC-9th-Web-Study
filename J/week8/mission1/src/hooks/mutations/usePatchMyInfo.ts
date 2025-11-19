import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { RequestPatchMyInfoDto, ResponseMyInfoDto } from "../../types/auth"
import { patchMyInfo } from "../../apis/auth"
import { QUERY_KEY } from "../../constants/key";

export const usePatchMyInfo = () => {
    const queryClient = useQueryClient();

    return useMutation<ResponseMyInfoDto, Error, RequestPatchMyInfoDto>({
        mutationFn: (body: RequestPatchMyInfoDto) => patchMyInfo(body),
        onMutate: async (body: RequestPatchMyInfoDto) => {
            await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });

            const previousData = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);

            queryClient.setQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo], (old) => {
                if (!old) return old;
                return {...old, data: {...old.data,...body,},};
            });

            return { previousData };
        },

        onError: (err, body, context: any) => {
            if (context?.previousData) {
                queryClient.setQueryData([QUERY_KEY.myInfo], context.previousData);
            }
            alert("닉네임 변경 실패");
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
        },
    });
}