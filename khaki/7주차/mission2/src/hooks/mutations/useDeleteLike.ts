import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/like";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import type { ResponseLpDto } from "../../types/lp";
import type { ResponseMyInfoDto } from "../../types/auth";

function useDeleteLike() {
  return useMutation({
    mutationFn: deleteLike,

    // lp: mutationFn의 인자로 전달된 변수
    onMutate: async (lpId) => {
      // 1. 해당 쿼리의 요청이 진행 중이라면 취소
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.lp, lpId] });

      // 2. 현재 캐시 데이터를 가져와 변수에 임시저장
      const previousLpData = queryClient.getQueryData<ResponseLpDto>([QUERY_KEY.lp, lpId]);

      // 나중에 오류가 발생했을 때 이전 상태로 롤백하기 위해 이전 데이터를 반환
      const rollBackLpData = JSON.parse(JSON.stringify(previousLpData));

      // 3. 캐시 데이터를 즉시 업데이트(낙관적 업데이트)
      // 게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요의 위치를 찾아 제거
      const me = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
      const userId = Number(me?.data.id);

      const likedIndex = previousLpData?.data.likes.findIndex((like) => like.userId === userId) ?? -1;
      // a ?? b는 a가 null 또는 undefined일 때만 b를 반환합니다.

      if (likedIndex >= 0) {
        previousLpData!.data.likes.splice(likedIndex, 1);
      }
      // else{
      //   const newLike = {userId, lpId} as Likes
      //   previousLpData!.data.likes.push(newLike);
      // }

      // 업데이트된 데이터를 캐시에 반영
      queryClient.setQueryData<ResponseLpDto>([QUERY_KEY.lp, lpId], previousLpData);

      return { previousLpData, rollBackLpData };
    },

    onError: (error, lpId, context) => {
      console.log("좋아요 삭제 실패:", error);
      queryClient.setQueryData<ResponseLpDto>([QUERY_KEY.lp, lpId], context?.rollBackLpData);
    },

    onSettled: async (_data, _error, lpId, _context) => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lp, lpId] });
    },
  });
}

export default useDeleteLike;
