import type { Comment } from '../types/lp';
import { PAGINATION_ORDER } from '../enums/common';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import CommentSkeleton from './CommentSkeleton';

type CommentSectionProps = {
  comments: Comment[];
  commentOrder: PAGINATION_ORDER;
  onOrderChange: (order: PAGINATION_ORDER) => void;
  userId: number | null;
  onCreateComment: (content: string) => void;
  onEditComment: (commentId: number, content: string) => void;
  onDeleteComment: (commentId: number) => void;
  isCreating: boolean;
  isUpdating: boolean;
  isLoadingInitial: boolean;
  isFetchingMore: boolean;
  hasMore: boolean;
  scrollRef: (node?: Element | null) => void;
};

const CommentSection = ({
  comments,
  commentOrder,
  onOrderChange,
  userId,
  onCreateComment,
  onEditComment,
  onDeleteComment,
  isCreating,
  isUpdating,
  isLoadingInitial,
  isFetchingMore,
  hasMore,
  scrollRef,
}: CommentSectionProps) => {
  return (
    <div className="max-w-3xl mx-auto mt-8 bg-[#1C1C1E] rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6">댓글 ({comments.length || 0})</h2>

      {/* 정렬 버튼 (최신순, 오래된순) */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => onOrderChange(PAGINATION_ORDER.desc)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            commentOrder === PAGINATION_ORDER.desc
              ? 'bg-pink-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          최신순
        </button>
        <button
          onClick={() => onOrderChange(PAGINATION_ORDER.asc)}
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
      <CommentForm
        onSubmit={onCreateComment}
        isSubmitting={isCreating}
      />

      {/* 초기 로딩 skeleton */}
      {isLoadingInitial && (
        <div className="space-y-4">
          {Array(3).fill(0).map((_, i) => (
            <CommentSkeleton key={`init-skeleton-${i}`} />
          ))}
        </div>
      )}

      {/* 댓글 목록 */}
      {!isLoadingInitial && (
        <div>
          {comments.map((comment) => {
            const isMyComment = userId !== null && comment.author.id === userId;

            return (
              <CommentItem
                key={comment.id}
                comment={comment}
                isMyComment={isMyComment}
                onEdit={onEditComment}
                onDelete={onDeleteComment}
                isUpdating={isUpdating}
              />
            );
          })}

          {/* 추가 로딩 skeleton */}
          {isFetchingMore && hasMore && (
            <div className="space-y-4">
              {Array(3).fill(0).map((_, i) => (
                <CommentSkeleton key={`more-skeleton-${i}`} />
              ))}
            </div>
          )}

          {/* 무한 스크롤 트리거 */}
          {hasMore && (
            <div ref={scrollRef} className="h-10" />
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
