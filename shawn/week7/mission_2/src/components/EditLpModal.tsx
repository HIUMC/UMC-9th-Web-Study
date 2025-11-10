/**
 * ========================================
 * LP 수정 모달 컴포넌트
 * ========================================
 */

import { useState, useRef, useEffect } from "react";

interface EditLpModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  tags: string[];
  thumbnailUrl: string;
  onSubmit: (data: {
    title: string;
    content: string;
    tags: string[];
    file: File | null;
  }) => void;
  isLoading?: boolean;
}

export default function EditLpModal({
  isOpen,
  onClose,
  title: initialTitle,
  content: initialContent,
  tags: initialTags,
  thumbnailUrl,
  onSubmit,
  isLoading,
}: EditLpModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [tagInput, setTagInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(thumbnailUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 모달이 열릴 때마다 props의 값으로 state 초기화
  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle);
      setContent(initialContent);
      setTags(initialTags);
      setPreviewUrl(thumbnailUrl);
      setFile(null); // 파일은 항상 초기화
      setTagInput(""); // 태그 입력도 초기화
    }
  }, [isOpen, initialTitle, initialContent, initialTags, thumbnailUrl]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    onSubmit({ title, content, tags, file });
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#0f0f10] border border-[#2a2a2a] rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">LP 수정</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        {/* LP 이미지 */}
        <div className="flex flex-col items-center mb-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-48 h-48 rounded-full overflow-hidden cursor-pointer ring-4 ring-black bg-[#1a1a1a]"
          >
            <img
              src={previewUrl}
              alt="LP"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="mt-2 text-sm text-gray-400">클릭하여 이미지 변경</p>
        </div>

        {/* 제목 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            제목 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
            placeholder="LP 제목"
          />
        </div>

        {/* 내용 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            내용 <span className="text-red-500">*</span>
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 min-h-[150px] resize-none"
            placeholder="LP 내용"
          />
        </div>

        {/* 태그 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            태그
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
              className="flex-1 px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
              placeholder="태그 입력 후 엔터"
            />
            <button
              onClick={handleAddTag}
              className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
            >
              추가
            </button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-[#1a1a1a] text-gray-300 text-sm rounded-full flex items-center gap-2"
                >
                  #{tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="text-red-400 hover:text-red-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 버튼들 */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-6 py-3 bg-[#2a2a2a] text-gray-300 rounded-lg font-medium hover:bg-[#3a3a3a] transition-colors disabled:opacity-50"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !title.trim() || !content.trim()}
            className="flex-1 px-6 py-3 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
}

