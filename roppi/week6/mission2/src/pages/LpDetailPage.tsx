import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetLpDetail } from "../hooks/queries/useGetLpDetail";
import { useGetLpComments } from "../hooks/queries/useGetLpComments";
import { useInView } from "react-intersection-observer";
import { timeAgo } from "../utils/timeAgo";
import deleteIcon from "../assets/delete.png";
import editIcon from "../assets/edit.png";
import pinkHeart from "../assets/pinkH.png";
import whiteHeart from "../assets/whiteH.png";
import Comment from "../components/Comments/Comment";
import CommentSkeletonList from "../components/Comments/LpcardSkeletonList";
import OrderBtn from "../components/OrderBtn";

const LpDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const lpId = Number(lpid);
  const [isLiked, setIsLiked] = useState(false);
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [commentText, setCommentText] = useState("");

  // 상세 정보 패칭
  const { data: lpData, isLoading, isError } = useGetLpDetail(lpId);

  const {
    data: comments,
    fetchNextPage,
    isPending,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
  } = useGetLpComments(lpId, order);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  const handleLike = () => setIsLiked((prev) => !prev);
  const handleCommentSubmit = () => {
    if (!commentText.trim()) return alert("댓글을 입력해주세요!");
    // TODO: 실제 댓글 등록 API 연동
    console.log("댓글 등록:", commentText);
    setCommentText("");
  };

  if (isLoading) return <div className="text-white">로딩중...</div>;
  if (isError || !lpData) return <div className="text-red-400">에러 발생!</div>;

  return (
    <div className="w-[calc(100%-160px)] mx-20 mt-5 h-full flex flex-col items-center text-white">
      {/* LP 상세 카드 */}
      <div className="bg-[#303030] rounded text-white max-w-3xl w-full">
        <div className="w-[calc(100%-40px)] mx-5 py-5 flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <div className="flex gap-5 items-center">
              <img src={lpData.author.avatar} className="w-10 rounded-full" />
              <span>{lpData.author.name}</span>
            </div>
            <span className="text-[9px]">{timeAgo(lpData.createdAt)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-lg font-semibold">{lpData.title}</span>
            <div className="flex gap-1 items-center">
              <img className="w-6 h-6 cursor-pointer" src={editIcon} />
              <img className="w-6 h-5 cursor-pointer" src={deleteIcon} />
            </div>
          </div>

          <img src={lpData.thumbnail} className="rounded" />
          <p className="text-sm text-gray-200">{lpData.content}</p>

          <div className="w-full flex justify-center">
            <img
              src={isLiked ? pinkHeart : whiteHeart}
              onClick={handleLike}
              className="w-6 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 댓글 영역 */}
      <div className="max-w-3xl w-full mt-10 bg-[#202020] rounded p-5 flex flex-col gap-3">
        {/* 정렬 버튼 */}
        <OrderBtn order={order} setOrder={setOrder} />

        {/* 댓글 작성란 */}
        <div className="flex gap-2 items-center">
          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="댓글을 입력하세요..."
            className="flex-1 bg-[#303030] border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-pink-500"
          />
          <button
            onClick={handleCommentSubmit}
            className="px-4 py-2 bg-pink-500 text-white rounded hover:brightness-90"
          >
            등록
          </button>
        </div>

        {/* 댓글 목록 */}
        <div className="mt-4 flex flex-col gap-3">
          {isPending && <CommentSkeletonList count={20} />}
          {comments?.pages
            ?.map((page) => page.data.data)
            ?.flat()
            ?.map((c) => (
              <Comment comment={c} />
            ))}
        </div>

        <div ref={ref} className="h-6" />
        {isFetchingNextPage && (
          <CommentSkeletonList count={20} />
        )}
      </div>
    </div>
  );
};

export default LpDetailPage;
