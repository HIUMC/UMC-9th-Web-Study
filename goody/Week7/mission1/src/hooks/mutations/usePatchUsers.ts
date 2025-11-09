import { useMutation } from "@tanstack/react-query"
import { patchUsers, type patchUsersProps } from "../../apis/users"
import { QUERY_KEY } from "../../constants/key"
import { queryClient } from "../../App"

function usePatchUsers(){
    return useMutation({
        mutationFn: (editData : patchUsersProps) => patchUsers(editData),
        onSuccess : () => {
            queryClient.invalidateQueries({
            queryKey:[QUERY_KEY.myInfo],       
            })
        },
        onError : (error) => {
            console.error("유저 수정 실패 : ", error)
        },
    })
}

export default usePatchUsers