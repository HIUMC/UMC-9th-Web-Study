import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { useAuth } from "../../context/AuthContext";

function useLogout () {

    const {logout} = useAuth();

    return useMutation({
        mutationFn:logout,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEY.myInfo],
            })
        },
        onError : (error) => {
            console.error("로그아웃 실패", error)
        },
    })
}

export default useLogout;