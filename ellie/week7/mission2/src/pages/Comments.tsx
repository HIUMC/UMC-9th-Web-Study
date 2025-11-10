import { useForm } from "react-hook-form";
import Comment from "../components/Comment";
import CommentSkeleton from "../components/CommentSkeleton";
import useGetComment from "../hooks/useGetComments";
import { usePostComments } from "../hooks/mutations/usePostComment";
import { useParams } from "react-router-dom";
import useGetInfiniteComments from "../hooks/useGetInfiniteComments";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import CommentSkeletonList from "../components/CommentSkeletonList";
import type { PAGINATION_ORDER } from "../enums/common";
import { queryClient } from "../App";
import MyComment from "../components/MyComment";
import useGetMyInfo from "../hooks/useGetMyInfo";
import { useAuth } from "../context/AuthContext";

export default function Comments() {
  const [order, setOrder] = useState<PAGINATION_ORDER>("asc");
  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isError,
    isFetching,
    refetch,
  } = useGetInfiniteComments(10, order);
  const { lpId } = useParams<{ lpId: string }>();
  const { mutate: createComment } = usePostComments(Number(lpId));
  const { ref, inView } = useInView();

  const { accessToken } = useAuth();
  const { data: myInfo } = useGetMyInfo(accessToken);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: "",
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    // 정렬이 바뀔 때마다 이전 캐시를 비우고 새로 fetch
    queryClient.removeQueries({ queryKey: ["comments", lpId] });
  }, [order]);

  const onSubmit = async (data: any) => {
    createComment(
      { content: data.content },
      {
        onSuccess: () => {
          reset();
          refetch();
        },
      }
    );
  };

  if (isError) {
    return <p>error...</p>;
  }

  return (
    <div className="relative bg-gray-700 w-175 h-full rounded-lg flex flex-col justify-center items-center">
      <div className="absolute top-5 flex flex-row w-full justify-between p-4 ">
        <p className="text-white">댓글</p>
        <div className="flex justify-end mb-4">
          <button
            className={`w-20 h-8 border border-white rounded-sm ${
              order === "asc" ? "bg-white text-black" : "bg-black text-white"
            }`}
            onClick={() => setOrder("asc")}
          >
            오래된순
          </button>
          <button
            className={`w-20 h-8 border border-white rounded-sm ${
              order === "desc" ? "bg-white text-black" : "bg-black text-white"
            }`}
            onClick={() => setOrder("desc")}
          >
            최신순
          </button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="absolute top-20 flex flex-row w-full justify-between p-4 h-17"
      >
        <input
          type="text"
          placeholder="댓글을 입력해 주세요"
          className="border-2 w-150 rounded-md border-white placeholder:text-white placeholder:p-2"
          {...register("content")}
        />
        <button
          type="submit"
          className="bg-black text-white cursor-pointer w-15 text-sm rounded-md"
        >
          작성
        </button>
      </form>
      <div className="absolute top-40 w-full h-96 overflow-y-auto">
        {comments?.pages.flatMap((page) =>
          page.data.data.map((comment) => {
            const isMine = comment.authorId === myInfo?.data.id;
            return isMine ? (
              <MyComment
                key={comment.id}
                id={comment.id}
                author={comment.author?.data?.name ?? "이름 없음"}
                content={comment.content}
                createdAt={comment.createdAt}
                avatarUrl={comment.author?.data?.avatar ?? ""}
                refetchComments={refetch}
              />
            ) : (
              <Comment
                key={comment.id}
                author={comment.author?.data?.name ?? "이름 없음"}
                content={comment.content}
                createdAt={comment.createdAt}
                avatarUrl={comment.author?.data?.avatar ?? ""}
              />
            );
          })
        )}
        {isFetching && <CommentSkeletonList count={2} />}
        <div ref={ref} className="h-10 flex justify-center items-center">
          {isFetchingNextPage ? (
            <p className="text-gray-400 text-sm">불러오는 중...</p>
          ) : hasNextPage ? (
            <p className="text-gray-400 text-sm">아래로 스크롤하면 더보기</p>
          ) : (
            <p className="text-gray-400 text-sm">모든 댓글을 불러왔어요!</p>
          )}
        </div>
      </div>
    </div>
  );
}
