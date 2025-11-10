import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetLp from "../hooks/queries/useGetLp";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Error } from "../components/Error";
import useGetInfiniteLpComments from "../hooks/queries/useGetInfiniteLpComments";
import type { PaginationOrder } from "../types/common";
import { CommentCard } from "../components/CommentCard/CommentCard";
import { CommentCardSkeletonList } from "../components/CommentCard/CommentCardSkeletonList";
import { useInView } from "react-intersection-observer";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import usePostComment from "../hooks/mutations/usePostComment";
import useDeleteLp from "../hooks/mutations/useDeleteLp";
import usePatchLp from "../hooks/mutations/usePatchLp";

export const LpDetailPage = () => {
  // URL 파라미터에서 lpId 추출
  const { lpId } = useParams();

  const navigate = useNavigate();

  // LP 데이터 가져오기
  const { data, isLoading, isError } = useGetLp(Number(lpId));
  const lp = data?.data; // LP 데이터

  // 댓글 정렬 상태
  const [order, setOrder] = useState<PaginationOrder>("desc");

  // 댓글 입력창 상태
  const [commentContent, setCommentContent] = useState("");

  // 댓글 데이터 가져오기
  const {
    data: comments,
    isLoading: commentsLoading,
    isFetching: commentsFetching,
    hasNextPage: commentsHasNextPage,
    fetchNextPage: commentsFetchNextPage,
  } = useGetInfiniteLpComments(Number(lpId), 10, order);

  const { mutate: postComment } = usePostComment();

  // 댓글 작성 핸들러
  const handleCommentSubmit = () => {
    postComment(
      { lpId: Number(lpId), content: commentContent },
      {
        onSuccess: () => {
          // 서버에 성공적으로 등록된 경우에만 입력창 초기화
          setCommentContent("");
        },
      }
    );
  };

  // 내 정보 가져오기(토큰이 있는 경우에만!)
  const { data: me } = useGetMyInfo();

  // 좋아요 관련 뮤테이션 훅
  // mutate: 비동기 요청을 실행하고, 콜백함수를 이용해서 결과 처리
  // mutateAsync: mutate의 프로미스 버전으로, async/await와 함께 사용 가능
  const { mutate: postLikeMutate } = usePostLike();
  const { mutate: deleteLikeMutate } = useDeleteLike();

  // 내가 좋아요 눌렀는지 여부확인(state가 아닌 서버에서 받아온 데이터로)
  const isLiked = lp?.likes.some((like) => like.userId === me?.data.id);

  const { mutate: deleteLp } = useDeleteLp();
  const { mutate: editLp } = usePatchLp();

  // 편집 모드 상태 및 입력값
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editThumbnail, setEditThumbnail] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  // LP 수정 핸들러
  const editLpHandler = () => {
    // 편집 모드 진입: 현재 LP값으로 입력창 초기화
    setEditTitle(lp?.title ?? "");
    setEditContent(lp?.content ?? "");
    setEditThumbnail(lp?.thumbnail ?? null);
    setThumbnailFile(null);
    setIsEditing(true);
  };

  const cancelEditHandler = () => {
    setIsEditing(false);
    setThumbnailFile(null);
  };

  const handleThumbnailChange = (file?: File) => {
    if (!file) return;
    setThumbnailFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setEditThumbnail(String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const saveEditHandler = () => {
    if (!lp) return;

    // API 타입 요구사항에 맞추기 위해 최소한의 필드 제공
    const payload = {
      lpId: Number(lpId),
      title: editTitle,
      content: editContent,
      thumbnail: editThumbnail ?? "",
      tags: lp.tags ? lp.tags.map((t: any) => t.name) : [],
      published: lp.published ?? false,
    };

    editLp(payload, {
      onSuccess: () => {
        setIsEditing(false);
        setThumbnailFile(null);
      },
    });
  };

  // LP 삭제 핸들러
  const deleteLpHandler = () => {
    // 삭제 뮤테이션을 호출하고, 성공 시 홈으로 이동
    deleteLp(Number(lpId), {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  // 좋아요 버튼 핸들러
  const handleLikeLp = () => {
    postLikeMutate(Number(lpId));
  };

  // 좋아요 취소 버튼 핸들러
  const handleDislikeLp = () => {
    deleteLikeMutate(Number(lpId));
  };

  // 무한 스크롤 감지 훅
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

  return (
    <div className="p-20">
      <div className="bg-neutral-800 p-8 rounded-lg max-w-4xl mx-auto">
        {/* 제목과 버튼 */}
        <div className="flex justify-between items-center mb-6">
          {isEditing ? (
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full mr-4 px-3 py-2 text-2xl font-bold rounded bg-neutral-700 text-white"
            />
          ) : (
            <h1 className="text-white text-3xl font-bold">{lp?.title}</h1>
          )}

          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={saveEditHandler}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 disabled:opacity-60"
                >
                  저장
                </button>
                <button
                  onClick={cancelEditHandler}
                  className="px-4 py-2 bg-neutral-600 text-white rounded hover:bg-neutral-500"
                >
                  취소
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={editLpHandler}
                  className="px-3 py-2 text-white rounded hover:bg-neutral-700 transition-colors"
                >
                  ✏️
                </button>
                <button
                  onClick={deleteLpHandler}
                  className="px-3 py-2 text-white rounded hover:bg-neutral-700 transition-colors"
                >
                  🗑️
                </button>
              </>
            )}
          </div>
        </div>

        {/* 썸네일 */}
        <div className="relative w-full h-96 mb-6 mx-auto">
          {isEditing ? (
            <div className="w-full h-full rounded-lg bg-neutral-700 flex items-center justify-center overflow-hidden">
              {editThumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={editThumbnail} alt="thumbnail" className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-400">썸네일을 업로드하거나 기존 썸네일을 유지하세요.</div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleThumbnailChange(e.target.files?.[0])}
                className="absolute bottom-4 left-4 text-sm text-white"
              />
            </div>
          ) : (
            <img src={lp?.thumbnail} alt={lp?.title} className="w-full h-full object-cover rounded-lg" />
          )}

          {/* 좋아요 버튼 - 우하단 */}
          <button
            onClick={isLiked ? handleDislikeLp : handleLikeLp}
            className={`absolute bottom-4 right-4 text-4xl transition-colors duration-200 ${
              isLiked ? "text-red-500" : "text-gray-400"
            }`}
            style={{ WebkitTextStroke: "1px black" }}
          >
            ♥
          </button>
        </div>

        {/* 업로드일 */}
        <p className="text-gray-300 mb-4">
          업로드일: {lp?.createdAt ? new Date(lp.createdAt).toLocaleDateString() : ""}
        </p>

        {/* 좋아요 */}
        <p className="text-gray-300 mb-6">좋아요: {lp?.likes?.length}개</p>

        {/* 본문 */}
        <div className="text-gray-200 leading-relaxed">
          <h3 className="text-lg font-semibold mb-3">본문</h3>
          {isEditing ? (
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={8}
              className="w-full px-4 py-3 bg-neutral-700 text-white rounded-lg border border-neutral-600 focus:border-white focus:outline-none"
            />
          ) : (
            <p>{lp?.content}</p>
          )}
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
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              className="flex-1 px-4 py-3 bg-neutral-700 text-white rounded-lg border border-neutral-600 focus:border-white focus:outline-none"
            />
            <button
              className="px-6 py-3 bg-neutral-600 text-white rounded-lg hover:bg-neutral-500 transition-colors duration-200"
              onClick={handleCommentSubmit}
            >
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
                  <CommentCard
                    key={comment.id}
                    id={comment.id}
                    content={comment.content}
                    author={comment.author}
                    currentUserId={me?.data.id}
                    lpId={Number(lpId)}
                  />
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
