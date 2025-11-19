import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import type { Likes, RequestLpDto, ResponseLpDto } from "../../types/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import type { ResponseMyInfoDto } from "../../types/auth";

export default function useDeleteLike() {
  return useMutation({
    mutationFn: deleteLike,
    // onMutate -> API 요청 이전에 호출
    // UI에 바로 변경을 보여주기 위해 Cache 업데이트
    onMutate: async (lp: RequestLpDto) => {
      // 1. 이 게시글에 관련된 쿼리를 취소 (캐시된 데이터를 새로 불러오는 요청)
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lps, lp.lpId],
      });

      // 2. 현재 게시글의 데이터를 캐시에서 가져와야함
      const previousLpPost = queryClient.getQueryData<ResponseLpDto["data"]>([
        QUERY_KEY.lps,
        lp.lpId,
      ]) ?? {
        id: lp.lpId,
        title: "",
        content: "",
        likes: [],
      };

      // 게시글 데이터를 복사해서 NewLpPost라는 새로운 객체를 만들거임
      // 복사하는 가장 큰 이유는 나중에 오류가 발생했을 때 이전 상태로 되돌리기 위해서다
      const newLpPost = JSON.parse(JSON.stringify(previousLpPost));

      // 게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요의 위치를 찾아야 한다
      const me = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myinfo,
      ]);

      const userId = Number(me?.data.id);

      const likedIndex = newLpPost.likes.findIndex(
        (like: Likes) => like.userId === userId
      );
      if (likedIndex >= 0) {
        newLpPost.likes.splice(likedIndex, 1);
      } else {
        newLpPost.likes.push({ userId, lpId: lp.lpId } as Likes);
      }

      // 업데이트된 게시글 데이터를 캐시에 저장
      // 이렇게하면 UI가 바로 업데이트 됨, 사용자가 변화를 확인할 수 있다.
      queryClient.setQueriesData(
        { queryKey: [QUERY_KEY.lps, lp.lpId] },
        (old: ResponseLpDto | undefined) => {
          if (!old) return { data: newLpPost };
          return { ...old, data: newLpPost };
        }
      );

      return { previousLpPost };
    },
    onSuccess: (_, variables) => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.lps, variables.lpId],
        });
      }, 200); // 0.2초 지연
    },

    onError: (err, newLp, context) => {
      console.log(err, newLp);
      queryClient.setQueryData(
        [QUERY_KEY.lps, newLp.lpId],
        context?.previousLpPost?.id
      );
    },
  });
}
