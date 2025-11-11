import type { Lp } from '../types/lp';
import { Pencil, Trash2, Heart, Image as ImageIcon, Check, X } from 'lucide-react';
import { getRelativeTime } from '../utils/date';
import { useState, useRef } from 'react';

type LpContentProps = {
  lp: Lp;
  onLikeToggle: () => void;
  isLiking: boolean;
  onUpdate?: (lpId: string, data: { title: string; content: string; thumbnail?: string; tags: string[]; imageFile?: File | null }) => void;
  onDelete?: (lpId: string) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
  userId?: number | null;
};

const LpContent = ({ lp, onLikeToggle, isLiking, onUpdate, onDelete, isUpdating, isDeleting, userId }: LpContentProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(lp.title);
  const [editContent, setEditContent] = useState(lp.content);
  const [editThumbnail, setEditThumbnail] = useState<string>(lp.thumbnail);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [editTags, setEditTags] = useState<string[]>(lp.tags?.map(tag => tag.name) || []);
  const [tagInput, setTagInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 작성자인지 확인
  const isAuthor = userId === lp.author?.id;

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !editTags.includes(tagInput.trim())) {
      setEditTags([...editTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (indexToRemove: number) => {
    setEditTags(editTags.filter((_, index) => index !== indexToRemove));
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditTitle(lp.title);
    setEditContent(lp.content);
    setEditThumbnail(lp.thumbnail);
    setEditTags(lp.tags?.map(tag => tag.name) || []);
    setNewImageFile(null);
    setTagInput('');
  };

  const handleSaveEdit = () => {
    if (onUpdate) {
      onUpdate(lp.id.toString(), {
        title: editTitle,
        content: editContent,
        thumbnail: editThumbnail,
        tags: editTags,
        imageFile: newImageFile,
      });
      setIsEditMode(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      if (onDelete) {
        onDelete(lp.id.toString());
      }
    }
  };

  return (
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
          <span className="text-white">{lp.author?.name}</span>
        </div>
        <span className="text-gray-400 text-sm">{getRelativeTime(lp.createdAt)}</span>
      </div>

      {/* 제목 및 수정, 삭제 버튼 */}
      {isEditMode ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full text-2xl font-bold mb-4 bg-[#2C2C2E] text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-pink-600"
            placeholder="LP Title"
          />
          <div className="flex justify-end gap-2 mb-4">
            <button
              onClick={handleImageClick}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              title="사진 변경"
            >
              <ImageIcon size={20} />
            </button>
            <button
              onClick={handleSaveEdit}
              disabled={isUpdating}
              className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50"
              title="수정 완료"
            >
              <Check size={20} />
            </button>
            <button
              onClick={handleCancelEdit}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              title="취소"
            >
              <X size={20} />
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{lp.title}</h1>
          {isAuthor && (
            <div className="flex gap-2">
              <button
                onClick={handleEditClick}
                className="p-2 hover:text-blue-400 transition-colors"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-2 hover:text-red-400 transition-colors disabled:opacity-50"
              >
                <Trash2 size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* 파일 입력 */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      {/* 썸네일 */}
      <div className="aspect-square w-full max-w-xl mx-auto mb-6">
        <img
          src={editThumbnail}
          alt={isEditMode ? editTitle : lp.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* 본문 */}
      {isEditMode ? (
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="w-full mb-4 bg-[#2C2C2E] text-gray-300 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-pink-600 resize-none"
          placeholder="LP Content"
          rows={5}
        />
      ) : (
        <div className="mb-6 text-gray-300">{lp.content}</div>
      )}

      {/* 태그 */}
      {isEditMode ? (
        <>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              className="flex-1 bg-[#2C2C2E] text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-pink-600"
              placeholder="LP Tag"
            />
            <button
              onClick={handleAddTag}
              className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {editTags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-pink-600 text-white text-sm rounded-full"
              >
                # {tag}
                <button
                  onClick={() => handleRemoveTag(index)}
                  className="ml-1 hover:text-gray-300 transition-colors"
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-wrap gap-2 mb-6">
          {lp.tags?.map((tag) => (
            <span key={tag.id} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
              # {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* 좋아요 버튼 */}
      {!isEditMode && (
        <div className="flex items-center justify-center">
          <button
            onClick={onLikeToggle}
            disabled={isLiking}
            className="flex items-center gap-2 text-pink-500 hover:text-pink-400 transition-colors disabled:opacity-50"
          >
            <Heart
              size={24}
              fill={lp.likes && lp.likes.length > 0 ? "currentColor" : "none"}
              className="transition-all"
            />
            <span>{lp.likes?.length || 0}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LpContent;