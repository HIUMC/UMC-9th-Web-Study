import { useState } from 'react';
import type { Comment } from '../types/lp';
import { MoreVertical, Pencil, Trash2, X, Check } from 'lucide-react';
import { getRelativeTime } from '../utils/date';

type CommentItemProps = {
  comment: Comment;
  isMyComment: boolean;
  onEdit: (commentId: number, content: string) => void;
  onDelete: (commentId: number) => void;
  isUpdating: boolean;
};

const CommentItem = ({ comment, isMyComment, onEdit, onDelete, isUpdating }: CommentItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState('');
  const [openMenu, setOpenMenu] = useState(false);

  const handleEditStart = () => {
    setIsEditing(true);
    setEditingText(comment.content);
    setOpenMenu(false);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditingText('');
  };

  const handleEditSave = () => {
    if (!editingText.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }
    onEdit(comment.id, editingText);
    setIsEditing(false);
    setEditingText('');
  };

  const handleDelete = () => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      onDelete(comment.id);
      setOpenMenu(false);
    }
  };

  return (
    <div className="flex gap-3 mb-4 pb-4 border-b border-gray-700">
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
        <div className="flex justify-between items-start mb-1">
          <span className="font-semibold text-white">{comment.author?.name}</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-xs">
              {getRelativeTime(comment.createdAt)}
            </span>
            {/* 본인 댓글일 때만 메뉴 버튼 표시 */}
            {isMyComment && !isEditing && (
              <div className="relative">
                <button
                  onClick={() => setOpenMenu(!openMenu)}
                  className="p-1 hover:bg-gray-700 rounded transition-colors"
                >
                  <MoreVertical size={16} className="text-gray-400" />
                </button>
                {/* 메뉴 드롭다운 */}
                {openMenu && (
                  <div className="absolute right-0 mt-1 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden z-10 min-w-[100px]">
                    <button
                      onClick={handleEditStart}
                      className="w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                      <Pencil size={14} />
                      수정
                    </button>
                    <button
                      onClick={handleDelete}
                      className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                      <Trash2 size={14} />
                      삭제
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 수정 모드 */}
        {isEditing ? (
          <div>
            <textarea
              value={editingText}
              onChange={(e) => setEditingText(e.target.value.slice(0, 500))}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white resize-none focus:outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600 mb-2"
              rows={3}
              maxLength={500}
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                {editingText.length} / 500
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleEditCancel}
                  className="px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-gray-600 transition-colors flex items-center gap-1"
                >
                  <X size={14} />
                  취소
                </button>
                <button
                  onClick={handleEditSave}
                  disabled={!editingText.trim() || isUpdating}
                  className="px-3 py-1 bg-pink-600 text-white rounded text-sm hover:bg-pink-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  <Check size={14} />
                  {isUpdating ? '저장 중...' : '저장'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-300 mt-1">{comment.content}</p>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
