import { useMutation } from "@tanstack/react-query";
import { deleteUsers } from "../../apis/users";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";


function useDeleteUsers() {
    return useMutation({
        mutationFn:deleteUsers,
        onSuccess : () => {
            queryClient.invalidateQueries({
            queryKey:[QUERY_KEY.myInfo],       
            })
            alert("유저 삭제 완료")
        },
        onError : (error) => {
            console.error("유저 삭제 실패 : ", error)
        },
    })
}

export default useDeleteUsers;