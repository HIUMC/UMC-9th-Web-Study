import { useMutation } from "@tanstack/react-query"
import { patchUsers, type patchUsersProps } from "../../apis/users"
import { QUERY_KEY } from "../../constants/key"
import { queryClient } from "../../App"
import type { ResponseMyInfoDto } from "../../types/auth"

function usePatchUsers(){
    return useMutation({
        mutationFn: (editData : patchUsersProps) => patchUsers(editData),
        onMutate : async (editData) => {
            // 쿼리 취소
            await queryClient.cancelQueries({queryKey:[QUERY_KEY.myInfo]});

            // 현제 데이터 가져오기
            const previousUserInfo = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
            
            // 오류 발생 시 이전 상태로 되돌리기 위한 새로운 객체 생성
            const newUserInfo = {...previousUserInfo, data:{...previousUserInfo?.data, ...editData}};
            
            // 업데이트 된 유저데이터 캐시에 저장 후 바로 UI 업데이트
            queryClient.setQueryData([QUERY_KEY.myInfo], newUserInfo);

            return {previousUserInfo, newUserInfo}
            
        },
        onError: (error, context) => {
            console.log(error);
            queryClient.setQueryData([QUERY_KEY.myInfo], context)
        },
        onSettled: async() => {
            await queryClient.invalidateQueries({
                queryKey:[QUERY_KEY.myInfo]
            })
        }
        
    })
}

export default usePatchUsers