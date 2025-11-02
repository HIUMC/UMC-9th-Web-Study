import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetLp from "../hooks/queries/useGetLp";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Error } from "../components/Error";
import useGetInfiniteLpComments from "../hooks/queries/useGetInfiniteLpComments";
import type { PaginationOrder } from "../types/common";
import { CommentCard } from "../components/CommentCard/CommentCard";
import { CommentCardSkeletonList } from "../components/CommentCard/CommentCardSkeletonList";
import { useInView } from "react-intersection-observer";

export const Lp = () => {
  const { lpId } = useParams();
  const [order, setOrder] = useState<PaginationOrder>("desc");

  const { data, isLoading, isError } = useGetLp({ id: Number(lpId) });

  const {
    data: comments,
    isLoading: commentsLoading,
    isFetching: commentsFetching,
    hasNextPage: commentsHasNextPage,
    fetchNextPage: commentsFetchNextPage,
  } = useGetInfiniteLpComments(Number(lpId), 10, order);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  // inView가 변경될 때마다 실행되는 효과
  useEffect(() => {
    if (inView && commentsHasNextPage && !commentsFetching) {
      commentsFetchNextPage();
    }
  }, [inView, commentsHasNextPage, commentsFetching, commentsFetchNextPage]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Error message="LP 정보를 불러올 수 없습니다." />
      </div>
    );
  }

  const lp = data?.data;

  console.log("LP data:", data);
  console.log("LP lp:", lp);

  return (
    <div className="p-20">
      <div className="bg-neutral-800 p-8 rounded-lg max-w-4xl mx-auto">
        {/* 제목과 버튼 */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-white text-3xl font-bold">{lp?.title}</h1>
          <div className="flex gap-1">
            <button className="px-3 py-2 text-white rounded hover:bg-neutral-700 transition-colors">✏️</button>
            <button className="px-3 py-2 text-white rounded hover:bg-neutral-700 transition-colors">🗑️</button>
          </div>
        </div>

        {/* 썸네일 */}
        <img src={lp?.thumbnail} alt={lp?.title} className="w-64 h-64 object-cover rounded-lg mb-6 mx-auto" />

        {/* 업로드일 */}
        <p className="text-gray-300 mb-4">
          업로드일: {lp?.createdAt ? new Date(lp.createdAt).toLocaleDateString() : ""}
        </p>

        {/* 좋아요 */}
        <p className="text-gray-300 mb-6">좋아요: {lp?.likes?.length}개</p>

        {/* 본문 */}
        <div className="text-gray-200 leading-relaxed">
          <h3 className="text-lg font-semibold mb-3">본문</h3>
          <p>{lp?.content}</p>
        </div>

        {/* 댓글 섹션 */}
        <div className="mt-8">
          {/* 댓글 헤더 - 제목과 정렬 버튼 */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white text-lg font-semibold">댓글</h3>

            <div className="flex">
              <button
                onClick={() => setOrder("asc")}
                className={`px-3 py-1 text-sm rounded-l-xl border border-white transition-colors duration-200 ${
                  order === "asc" ? "bg-white text-black" : "bg-black text-white"
                }`}
              >
                오래된순
              </button>
              <button
                onClick={() => setOrder("desc")}
                className={`px-3 py-1 text-sm rounded-r-xl border border-white border-l-0 transition-colors duration-200 ${
                  order === "desc" ? "bg-white text-black" : "bg-black text-white"
                }`}
              >
                최신순
              </button>
            </div>
          </div>

          {/* 댓글 작성란 */}
          <div className="mb-6 flex gap-3">
            <input
              type="text"
              placeholder="댓글을 작성해주세요..."
              className="flex-1 px-4 py-3 bg-neutral-700 text-white rounded-lg border border-neutral-600 focus:border-white focus:outline-none"
            />
            <button className="px-6 py-3 bg-neutral-600 text-white rounded-lg hover:bg-neutral-500 transition-colors duration-200">
              작성
            </button>
          </div>

          {/* 댓글 목록 */}
          {/* 첫 번째 로딩 시 스켈레톤 */}
          {commentsLoading && <CommentCardSkeletonList count={5} />}

          {comments && (
            <div>
              {comments.pages
                .map((page) => page.data.data)
                .flat()
                .map((comment) => (
                  <CommentCard key={comment.id} id={comment.id} content={comment.content} author={comment.author} />
                ))}

              {/* 다음 페이지 로딩 중일 때 스켈레톤 표시 */}
              {commentsFetching && <CommentCardSkeletonList count={3} />}
            </div>
          )}

          {/* 무한 스크롤 감지 영역 */}
          <div ref={ref} className="h-4"></div>
        </div>
      </div>
    </div>
  );
};
