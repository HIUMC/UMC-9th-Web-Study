import { useMutation } from "@tanstack/react-query"
import { postLogout } from "../../apis/auth"

export const usePostLogout = () => {
    return useMutation({
        mutationFn: () => postLogout(),
    })
}