import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import type { Likes, ResponseLpDetailDto } from "../../types/lp";
import type { ResponseMyInfoDto } from "../../types/auth";

function usePostLike() {
    return useMutation({

        // data : API 성공 응답 데이터
        // variables : mutate에 전달한 값
        // context : onMutate에서 반환한 값

        mutationFn:postLike,

        // onMutate : API 요청 직전에 실행
        // UI에 바로 변경을 보여주기 위해 Cache 업데이트
        // Optimistic Update 구현시 유용
        onMutate: async(lp) => {
            // 1. 이 게시물에 관련된 쿼리를 취소 
            await queryClient.cancelQueries({queryKey:[QUERY_KEY.lps, lp.lpid]});
        
            // 2. 현재 게시글의 데이터를 캐시헤서 가져오기
            const previousLpPost = queryClient.getQueryData<ResponseLpDetailDto>([QUERY_KEY.lps,lp.lpid]);
                    
            // 게시글 데이터를 복사해서 newLpPost 라는 새로운 객체를 만듬
            // 오류 발생시 이전 상태로 되돌리기 위함
            const newLpPost = {...previousLpPost};
        
            // 게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요의 위치를 찾아야함.
            const me = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
            const userId = Number(me?.data.id);
        
            // userId 기준으로 좋아요 위치 찾기
            const likedIndex = previousLpPost?.data.likes.findIndex((like) => like.userId === userId) ?? -1;
        
            if(likedIndex >= 0) { // 좋아요 있음 => 좋아요 삭제
                previousLpPost?.data.likes.splice(likedIndex, 1);
            } else {
                const newLike = {userId,lpId:lp.lpid} as Likes;
                previousLpPost?.data.likes.push(newLike);
            }
        
            // 업데이트된 게시글 데이터를 캐시에 저장
            // UI 바로 업데이트
            queryClient.setQueryData([QUERY_KEY.lps,lp.lpid],newLpPost);
        
            return {previousLpPost, newLpPost}
        },
        
        onError: (err,newLp,context) => {
            console.log(err,newLp);
            queryClient.setQueryData([QUERY_KEY.lps,newLp.lpid], context?.previousLpPost?.data.id)
        },
        
        // 서버 상태 동기화
        // onSetteled는 API 요청이 끝난 후 성공하든 실패하든 실행
        onSettled : async(data, error, variables, context) => {
            await queryClient.invalidateQueries({
            queryKey:[QUERY_KEY.lps,variables.lpid],
            })
        },
    })
}

export default usePostLike