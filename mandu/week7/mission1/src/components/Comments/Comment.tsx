import { useEffect, useState } from "react";
import useGetCommentList from "../../hooks/queries/useGetComments";
import { PAGINATION_ORDER } from "../../enums/common";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import CommentSkeletonList from "./CommentSkeletonList";
import ToggleButton from "../Buttons/ToggleButton";
import usePostComment from "../../hooks/mutations/usePostComment";

const Comment = () => {
  const { lpid } = useParams();

  const [asc, setAsc] = useState(true);
  const currentOrder = !asc ? PAGINATION_ORDER.asc : PAGINATION_ORDER.desc;

  const { data, isFetching, hasNextPage, isPending, fetchNextPage, isError } =
    useGetCommentList(lpid, 10, currentOrder);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  // 댓글 입력
  const [newComment, setNewComment] = useState("");
  const { mutate, isPending: isSubmitting } = usePostComment(lpid!);
  const handlePostComment = () => {
    if (!newComment.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    mutate(
      { lpId: Number(lpid), content: newComment },
      {
        onSuccess: () => {
          // 성공 시 입력창 비우기
          setNewComment("");
        },
      }
    );
  };

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <div className="mt-8 border-t border-gray-700 pt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold mb-4">댓글</h3>

        <ToggleButton asc={asc} setAsc={setAsc} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            placeholder="댓글 작성..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-grow p-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            onClick={handlePostComment}
            disabled={!newComment.trim()}
            className="px-4 py-2 font-bold bg-pink-400 rounded-md transition-colors hover:bg-pink-600 disabled:opacity-50"
          >
            작성
          </button>
        </div>
        {data?.pages
          .map((page) => page.data.data)
          .flat()
          .map((comment) => (
            <div key={comment.id} className="bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="font-semibold text-white">
                  {comment.author.name}
                </span>
                <span className="ml-2 text-xs text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-300">{comment.content}</p>
            </div>
          ))}

        {data?.pages[0].data.data.length === 0 && (
          <p className="text-gray-500">작성된 댓글이 없습니다.</p>
        )}
      </div>

      {/* (8) 스켈레톤 UI 및 Intersection Observer ref */}
      {isFetching && <CommentSkeletonList count={10} />}
      <div ref={ref} className="h-10" />
    </div>
  );
};

export default Comment;
