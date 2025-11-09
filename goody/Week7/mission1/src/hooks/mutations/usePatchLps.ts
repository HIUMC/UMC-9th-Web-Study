import { useMutation } from "@tanstack/react-query";
import { patchLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import type { CreateLpsDto } from "../../types/lp";

function usePatchLps(lpid : number) {
    return useMutation({
        mutationFn:(editData:CreateLpsDto) => patchLp(editData,{lpid}),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEY.lps],
            })
        }
    })
}

export default usePatchLps;