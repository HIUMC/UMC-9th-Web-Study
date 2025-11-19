import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { RequestCreateLpDto, ResponseCreateLpDto } from "../../types/lp";
import { postLp } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

export const usePostLp = () => {
    const queryClient = useQueryClient();

    return useMutation<ResponseCreateLpDto, Error, RequestCreateLpDto>({
        mutationFn: (body) => postLp(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
        },
        onError: (error) => {
            console.log("Lp 생성 실패: ",error);
        },
    });
}