import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetLpDetail } from "../hooks/queries/useGetLpDetail";
import { useGetLpComments } from "../hooks/queries/useGetLpComments";
import { useInView } from "react-intersection-observer";
import { timeAgo } from "../utils/timeAgo";
import deleteIcon from "../assets/delete.png";
import editIcon from "../assets/edit.png";

import Comment from "../components/Comments/Comment";
import CommentSkeletonList from "../components/Comments/LpcardSkeletonList";
import OrderBtn from "../components/OrderBtn";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import Heart from "../components/Heart";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import usePostLike from "../hooks/mutations/usePostLike";
import usePostComment from "../hooks/mutations/usePostComment";
import useDeleteLp from "../hooks/mutations/useDeleteLp";
import useUpdateLp from "../hooks/mutations/useUpdateLp";

const LpDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const lpId = Number(lpid);
  const { accessToken } = useAuth();
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [commentText, setCommentText] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const { data: lpData, isLoading, isError } = useGetLpDetail(lpId);
  const { data: me } = useGetMyInfo(accessToken);

  // LP 좋아요
  const likes = lpData?.data?.likes || [];
  const isLiked = likes.some((like) => like.userId === me?.data?.id);
  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();
  const handleLikeLp = () => {
    likeMutate({lpId : Number(lpId)})
    console.log("좋아요")
  }
  const handleDislikeLp = () => {
    disLikeMutate({lpId : Number(lpId)})
    console.log("싫어요")
  }


// 댓글
  const {
    data: comments,
    fetchNextPage,
    isPending,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
  } = useGetLpComments(lpId, order);
  const { mutate: postCommentMutate } = usePostComment();
  const updateLpMutation = useUpdateLp();
  const deleteLpMutation = useDeleteLp();

 const handleCommentSubmit = () => {
    if (!commentText.trim()) return alert("댓글을 입력해주세요!");
    postCommentMutate(
      { lpId, content: commentText },
      {
        onSuccess: () => {
          setCommentText("");
        },
        onError: () => alert("댓글 작성 실패!"),
      }
    );
  };

  // 삭제 버튼 클릭 핸들러
const handleDeleteLp = () => {
  if (!window.confirm("정말로 이 LP를 삭제하시겠습니까?")) return;

  deleteLpMutation.mutate(({lpId}), {
    onSuccess: () => {
      alert("삭제 완료");
      // 삭제 후 페이지 이동 (예: LP 목록 페이지)
      window.location.href = "/"; // 필요에 따라 라우터 변경
    },
    onError: (err: any) => {
      console.error("LP 삭제 실패:", err.response?.data);
      alert("삭제 실패! 서버에서 요청을 처리할 수 없습니다.");
    },
  });
};




  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

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
              <img className="w-6 h-6 cursor-pointer" src={editIcon} 
               onClick={() => {
                  setEditTitle(lpData.title);
                  setEditContent(lpData.content);
                  setIsEditOpen(true);
                }}
              />
              <img className="w-6 h-5 cursor-pointer" src={deleteIcon} 
                onClick={handleDeleteLp}
              />
            </div>
          </div>

          {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-[#202020] p-6 rounded shadow-lg flex flex-col gap-4 w-[400px] text-white">
            <h3 className="font-bold text-center">LP 수정</h3>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full bg-[#303030] rounded px-3 py-2 text-sm"
            />
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full bg-[#303030] rounded px-3 py-2 text-sm"
            />
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => {
                  const formData = new FormData();
                  formData.append("title", editTitle);
                  formData.append("content", editContent);

             updateLpMutation.mutate(
  {
    lpId,
    data: {
      title: editTitle,
      content: editContent,
      thumbnail: lpData.data?.thumbnail ?? "default-thumbnail.jpg",
      tags: lpData.data?.tags ?? ['0'],
      published: lpData.data?.published ?? false,
    },
  },
  {
    onSuccess: () => {
      alert("수정 완료");
      setIsEditOpen(false);
    },
    onError: (err: any) => {
      console.error("LP 수정 실패:", err.response?.data);
      alert("수정 실패! 서버에서 요청을 처리할 수 없습니다.");
    }
  }
);


                }}
                className="px-4 py-1 bg-pink-500 rounded hover:opacity-90"
              >
                저장
              </button>
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-4 py-1 bg-gray-500 rounded hover:opacity-90"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

          <img src={lpData.thumbnail} className="rounded max-h-100 object-cover	" />
          <p className="text-sm text-gray-200">{lpData.content}</p>

          <Heart isLiked={isLiked} handleLike={isLiked ? handleDislikeLp : handleLikeLp} />
          
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
              <Comment comment={c} lpId={lpId} />
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
