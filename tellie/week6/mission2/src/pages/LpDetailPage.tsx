import { useParams, useNavigate, useLocation } from 'react-router-dom';
import useGetLpDetail from '../hooks/queries/useGetLpDetail';
import useGetLpComments from '../hooks/queries/useGetLpComments';
import type { Tag, Comment } from '../types/lp';
import { Pencil, Trash2, Heart } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import LoginModal from '../components/LoginModal';
import CommentSkeleton from '../components/CommentSkeleton';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useInView } from 'react-intersection-observer';
import { PAGINATION_ORDER } from '../enums/common';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLpComment } from '../apis/lp';

// 상세 페이지 컴포넌트
const LpDetailPage = () => {
  const { lpId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [hasShownModal, setHasShownModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [commentOrder, setCommentOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const [commentText, setCommentText] = useState('');
  const { data: lp, isPending, isError } = useGetLpDetail(lpId || '');
  const { 
    data: commentsData, 
    isFetching: commentsFetching, 
    hasNextPage: commentsHasNextPage,
    isLoading: commentsPending,
    fetchNextPage: commentsFetchNextPage,
  } = useGetLpComments(lpId || '', commentOrder);

  const { ref, inView } = useInView({ threshold: 0 });

  // 댓글 작성 mutation
  const createCommentMutation = useMutation({
    mutationFn: () => createLpComment(lpId || '', commentText),
    onSuccess: () => {
      setCommentText('');
      // 쿼리 캐시 무효화하여 댓글 목록 다시 로드
      queryClient.invalidateQueries({ 
        queryKey: ['lpComments', lpId, commentOrder] 
      });
    },
    onError: (error) => {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성에 실패했습니다.');
    },
  });

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

  // 최초 마운트 시에만 로그인 체크
  useEffect(() => {
    if (!hasShownModal && !isAuthenticated) {
      setShowLoginModal(true);
      setHasShownModal(true);
    }
  }, [hasShownModal, isAuthenticated]);

  // 로그인 상태가 true로 변경될 때 모달을 닫는다.
  useEffect(() => {
    if (isAuthenticated && showLoginModal) {
      setShowLoginModal(false);
      // 로그인 완료 후 댓글 쿼리 다시 로드
      queryClient.invalidateQueries({
        queryKey: ['lpComments', lpId, commentOrder]
      });
    }
  }, [isAuthenticated, showLoginModal, queryClient, lpId, commentOrder]);

  const handleLoginConfirm = () => {
    setShowLoginModal(false);
    // 현재 URL을 state로 전달하여 로그인 후 복귀할 수 있도록 했다.
    navigate('/login', { state: { from: location.pathname } });
  };

  const handleModalClose = () => {
    setShowLoginModal(false);
    navigate('/');
  };

  if(isPending) {
    return <LoadingSpinner />;
  }

  if(isError) {
    return <ErrorMessage />;
  }

  if (!lp) return null;

  return (
    <>
      <LoginModal
        isOpen={showLoginModal}
        onClose={handleModalClose}
        onConfirm={handleLoginConfirm}
      />
      <div className='min-h-screen bg-black text-white'>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-[#1C1C1E] rounded-lg p-6">
          {/* author 정보, 작성일 */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-600">
                {lp.author?.profileImage ? (
                  <img 
                    src={lp.author.profileImage} 
                    alt={`${lp.author.name}'s profile`} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400">
                    {lp.author?.name?.[0] || '?'}
                  </div>
                )}
              </div>
              <span className="text-white">{lp.author?.name || '오타니얌'}</span>
            </div>
            <span className="text-gray-400 text-sm">1월 전</span>
          </div>

          {/* 제목 및 수정, 삭제 버튼 */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{lp.title}</h1>
            <div className="flex gap-2">
              <button className="p-2 hover:text-blue-400 transition-colors">
                <Pencil size={20} />
              </button>
              <button className="p-2 hover:text-red-400 transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
          </div>

          {/* 썸네일 */}
          <div className="aspect-square w-full max-w-xl mx-auto mb-6">
            <img 
              src={lp.thumbnail} 
              alt={lp.title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* 본문 */}
          <div className="mb-6 text-gray-300">
            {lp.content}
          </div>

          {/* 태그 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {lp.tags?.map((tag: Tag) => (
              <span key={tag.id} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                # {tag.name}
              </span>
            ))}
          </div>

          {/* 좋아요 버튼 */}
          <div className="flex items-center justify-center">
            <button className="flex items-center gap-2 text-pink-500 hover:text-pink-400 transition-colors">
              <Heart size={24} fill="currentColor" />
              <span>{lp.likes?.length || 0}</span>
            </button>
          </div>
        </div>

        {/* 댓글 섹션 */}
        <div className="max-w-3xl mx-auto mt-8 bg-[#1C1C1E] rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">댓글 ({commentsData?.pages[0]?.data?.data?.length || 0})</h2>

          {/* 정렬 버튼 (최신순, 오래된순) */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => handleOrderChange(PAGINATION_ORDER.desc)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                commentOrder === PAGINATION_ORDER.desc
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              최신순
            </button>
            <button
              onClick={() => handleOrderChange(PAGINATION_ORDER.asc)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                commentOrder === PAGINATION_ORDER.asc
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              오래된순
            </button>
          </div>

          {/* 댓글 작성 칸 */}
          <div className="mb-8 pb-6 border-b border-gray-700">
            <label className="block text-sm font-semibold text-white mb-3">댓글</label>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value.slice(0, 500))}
              placeholder="댓글을 입력해주세요"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600 mb-3"
              rows={3}
              maxLength={500}
            />
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500">
                  {commentText.length > 0 ? `${commentText.length} / 500` : '0 / 500'}
                </span>
                {commentText.length === 0 && (
                  <span className="text-xs text-gray-600">최소 1자 이상 입력해주세요</span>
                )}
                {commentText.length > 450 && (
                  <span className="text-xs text-yellow-600">({500 - commentText.length}자 남음)</span>
                )}
              </div>
              <button
                onClick={() => createCommentMutation.mutate()}
                disabled={commentText.length === 0 || commentText.length > 500 || createCommentMutation.isPending}
                className="px-6 py-2 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {createCommentMutation.isPending ? '작성 중...' : '작성'}
              </button>
            </div>
          </div>

          {/* 초기 로딩 skeleton */}
          {commentsPending && (
            <div className="space-y-4">
              {Array(3).fill(0).map((_, i) => (
                <CommentSkeleton key={`init-skeleton-${i}`} />
              ))}
            </div>
          )}

          {/* 댓글 목록 */}
          {!commentsPending && (
            <div>
              {commentsData?.pages?.flatMap((page) =>
                page.data.data.map((comment: Comment) => (
                  <div key={comment.id} className="flex gap-3 mb-4 pb-4 border-b border-gray-700">
                    {/* 프로필 이미지 */}
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
                      {comment.author?.profileImage ? (
                        <img 
                          src={comment.author.profileImage} 
                          alt={comment.author.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400 text-xs">
                          {comment.author?.name?.[0] || '?'}
                        </div>
                      )}
                    </div>

                    {/* 댓글 내용 */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-white">{comment.author?.name}</span>
                        <span className="text-gray-400 text-xs">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-300 mt-1">{comment.content}</p>
                    </div>
                  </div>
                ))
              )}

              {/* 추가 로딩 skeleton */}
              {commentsFetching && commentsHasNextPage && (
                <div className="space-y-4">
                  {Array(3).fill(0).map((_, i) => (
                    <CommentSkeleton key={`more-skeleton-${i}`} />
                  ))}
                </div>
              )}

              {/* 무한 스크롤 트리거 */}
              {commentsHasNextPage && (
                <div ref={ref} className="h-10" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default LpDetailPage;