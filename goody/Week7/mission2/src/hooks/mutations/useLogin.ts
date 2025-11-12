import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { useAuth } from "../../context/AuthContext";

function useLogin () {

    const {login} = useAuth();

    return useMutation({
        mutationFn:login,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEY.myInfo],
            })
        },
        onError : (error) => {
            console.error("로그인 실패", error)
        },
    })
}

export default useLogin;