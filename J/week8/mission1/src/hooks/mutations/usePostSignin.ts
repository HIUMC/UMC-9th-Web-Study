import { useMutation } from "@tanstack/react-query"
import type { RequestSigninDto, ResponseSigninDto } from "../../types/auth"
import { postSignin } from "../../apis/auth"

export const usePostSignin = () => {
    return useMutation<ResponseSigninDto, Error, RequestSigninDto>({
        mutationFn: (signinData) => postSignin(signinData),
    })
}