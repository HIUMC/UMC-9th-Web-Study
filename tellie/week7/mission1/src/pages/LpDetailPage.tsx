import { useParams, useNavigate } from 'react-router-dom';
import useGetLpDetail from '../hooks/queries/useGetLpDetail';
import useGetLpComments from '../hooks/queries/useGetLpComments';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import LpContent from '../components/LpContent';
import CommentSection from '../components/CommentSection';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useInView } from 'react-intersection-observer';
import { PAGINATION_ORDER } from '../enums/common';
import { useCreateLpCommentMutation } from '../hooks/mutations/useCreateLpCommentMutation';
import { useToggleLpLikeMutation } from '../hooks/mutations/useToggleLpLikeMutation';
import { useUpdateLpCommentMutation } from '../hooks/mutations/useUpdateLpCommentMutation';
import { useDeleteLpCommentMutation } from '../hooks/mutations/useDeleteLpCommentMutation';
import { useUpdateLpMutation } from '../hooks/mutations/useUpdateLpMutation';
import { useDeleteLpMutation } from '../hooks/mutations/useDeleteLpMutation';

const LpDetailPage = () => {
  const { lpId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, userId } = useAuth();
  const [commentOrder, setCommentOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const hasCheckedAuth = useRef(false);
  const { data: lp, isPending, isError } = useGetLpDetail(lpId || '');
  const {
    data: commentsData,
    isFetching: commentsFetching,
    hasNextPage: commentsHasNextPage,
    isLoading: commentsPending,
    fetchNextPage: commentsFetchNextPage,
  } = useGetLpComments(lpId || '', commentOrder);

  const { ref, inView } = useInView({ threshold: 0 });

  const createCommentMutation = useCreateLpCommentMutation(lpId || '', commentOrder);
  const toggleLikeMutation = useToggleLpLikeMutation(lpId || '', lp, userId);
  const updateCommentMutation = useUpdateLpCommentMutation(lpId || '', commentOrder);
  const deleteCommentMutation = useDeleteLpCommentMutation(lpId || '', commentOrder);
  const updateLpMutation = useUpdateLpMutation(lpId || '');
  const deleteLpMutation = useDeleteLpMutation();

  const handleLikeToggle = () => {
    if (!isAuthenticated) {
      alert('로그인이 필요합니다.');
      return;
    }
    toggleLikeMutation.mutate();
  };

  const handleEditComment = (commentId: number, content: string) => {
    updateCommentMutation.mutate({ commentId, content });
  };

  const handleDeleteComment = (commentId: number) => {
    deleteCommentMutation.mutate(commentId);
  };

  const handleUpdateLp = (_lpId: string, data: { title: string; content: string; thumbnail?: string; tags: string[]; imageFile?: File | null }) => {
    updateLpMutation.mutate(data);
  };

  const handleDeleteLp = (lpId: string) => {
    deleteLpMutation.mutate(lpId);
  };

  // 무한 스크롤 트리거
  useEffect(() => {
    if (inView && commentsHasNextPage && !commentsFetching) {
      commentsFetchNextPage();
    }
  }, [inView, commentsHasNextPage, commentsFetching, commentsFetchNextPage]);

  // 정렬 변경 시 페이지 다시 로드
  const handleOrderChange = (newOrder: PAGINATION_ORDER) => {
    setCommentOrder(newOrder);
    navigate(`/lp/${lpId}?order=${newOrder}`, { replace: true });
  };

  // 비로그인 상태 체크 - alert 표시 (최초 1회만)
  useEffect(() => {
    if (!hasCheckedAuth.current && !isAuthenticated) {
      hasCheckedAuth.current = true;
      alert('로그인이 필요합니다.');
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if(isPending) {
    return <LoadingSpinner />;
  }

  if(isError) {
    return <ErrorMessage />;
  }

  if (!lp) return null;

  // 무한 스크롤 시 데이터를 페이지 단위로 나눠서 저장하므로 모든 댓글 데이터를 평탄화하여 하나의 배열로 만든다.
  const allComments = commentsData?.pages?.flatMap((page) => page.data.data) || [];

  return (
    <>
      <div className='min-h-screen bg-black text-white'>
        <div className="container mx-auto px-4 py-8">
          <LpContent
            lp={lp}
            onLikeToggle={handleLikeToggle}
            isLiking={toggleLikeMutation.isPending}
            onUpdate={handleUpdateLp}
            onDelete={handleDeleteLp}
            isUpdating={updateLpMutation.isPending}
            isDeleting={deleteLpMutation.isPending}
            userId={userId}
          />

          <CommentSection
            comments={allComments}
            commentOrder={commentOrder}
            onOrderChange={handleOrderChange}
            userId={userId}
            onCreateComment={(content) => createCommentMutation.mutate(content)}
            onEditComment={handleEditComment}
            onDeleteComment={handleDeleteComment}
            isCreating={createCommentMutation.isPending}
            isUpdating={updateCommentMutation.isPending}
            isLoadingInitial={commentsPending}
            isFetchingMore={commentsFetching}
            hasMore={commentsHasNextPage}
            scrollRef={ref}
          />
        </div>
      </div>
    </>
  );
};

export default LpDetailPage;