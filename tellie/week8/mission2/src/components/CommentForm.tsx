import { useState } from 'react';

type CommentFormProps = {
  onSubmit: (content: string) => void;
  isSubmitting: boolean;
};

const CommentForm = ({ onSubmit, isSubmitting }: CommentFormProps) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = () => {
    if (!commentText.trim()) {
      return;
    }
    onSubmit(commentText);
    setCommentText('');
  };

  return (
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
          onClick={handleSubmit}
          disabled={commentText.length === 0 || commentText.length > 500 || isSubmitting}
          className="px-6 py-2 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? '작성 중...' : '작성'}
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
