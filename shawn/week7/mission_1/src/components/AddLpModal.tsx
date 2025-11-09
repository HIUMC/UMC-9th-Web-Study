/**
 * ========================================
 * LP 작성 모달 컴포넌트 (AddLpModal)
 * ========================================
 *
 * LP를 작성할 수 있는 모달 컴포넌트입니다.
 *
 * 주요 기능:
 * 1. 파일 업로드 (이미지)
 * 2. LP 제목, 내용, 태그 입력
 * 3. 모달 외부 클릭 또는 X 버튼으로 닫기
 * 4. 파일 업로드 시 미리보기 표시
 * 5. useMutation으로 LP 생성 API 호출
 * 6. 성공 시 invalidateQueries로 목록 새로고침
 */

import { useState, useRef, type ChangeEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImage, createLp } from "../apis/lp";
import { QUERY_KEY } from "../constants/key";

interface AddLpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddLpModal({ isOpen, onClose }: AddLpModalProps) {
  // React Query Client
  const queryClient = useQueryClient();

  // 입력 필드 상태
  const [lpName, setLpName] = useState("");
  const [lpContent, setLpContent] = useState("");
  const [lpTag, setLpTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // 파일 업로드 관련 상태
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이미지 업로드 Mutation
  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
  });

  // LP 생성 Mutation
  const createLpMutation = useMutation({
    mutationFn: createLp,
    onSuccess: () => {
      // LP 목록 쿼리 무효화하여 자동 새로고침
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });

      // 모달 닫기 및 상태 초기화
      onClose();
      setLpName("");
      setLpContent("");
      setLpTag("");
      setTags([]);
      setSelectedFile(null);
      setPreviewUrl("");
    },
    onError: (error) => {
      console.error("LP 생성 실패:", error);
      alert("LP 생성에 실패했습니다. 다시 시도해주세요.");
    },
  });

  // 모달이 닫혀있으면 렌더링하지 않음
  if (!isOpen) return null;

  /**
   * 모달 외부 클릭 핸들러
   * 백드롭(어두운 배경)을 클릭하면 모달 닫기
   */
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  /**
   * 파일 선택 핸들러
   * 이미지 파일을 선택하면 미리보기 URL 생성
   */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      // 파일 미리보기 URL 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * LP 이미지 클릭 핸들러
   * 이미지를 클릭하면 파일 선택 다이얼로그 열기
   */
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * 태그 추가 핸들러
   * Add 버튼을 클릭하면 태그 배열에 추가
   */
  const handleAddTag = () => {
    if (lpTag.trim() && !tags.includes(lpTag.trim())) {
      setTags([...tags, lpTag.trim()]);
      setLpTag("");
    }
  };

  /**
   * 태그 제거 핸들러
   * 태그를 클릭하면 배열에서 제거
   */
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  /**
   * LP 등록 핸들러
   * Add LP 버튼을 클릭하면 실행
   * 1. 이미지 업로드
   * 2. LP 생성
   */
  const handleSubmit = async () => {
    console.log("=== LP 등록 시작 ===");
    console.log("lpName:", lpName);
    console.log("lpContent:", lpContent);
    console.log("tags:", tags);
    console.log("selectedFile:", selectedFile);

    // 유효성 검사
    if (!lpName.trim()) {
      alert("LP 제목을 입력해주세요.");
      return;
    }
    if (!lpContent.trim()) {
      alert("LP 내용을 입력해주세요.");
      return;
    }
    if (!selectedFile) {
      alert("LP 이미지를 선택해주세요.");
      return;
    }

    try {
      console.log("1. 이미지 업로드 시작...");
      // 1. 이미지 업로드
      const imageResult = await uploadImageMutation.mutateAsync(selectedFile);
      console.log("이미지 업로드 성공:", imageResult);
      console.log(
        "imageResult 전체 구조:",
        JSON.stringify(imageResult, null, 2)
      );

      // API 응답 구조에 따라 URL 추출
      const thumbnailUrl = imageResult.data.imageUrl;
      console.log("추출된 썸네일 URL:", thumbnailUrl);

      if (!thumbnailUrl) {
        throw new Error("이미지 URL을 가져올 수 없습니다.");
      }

      console.log("2. LP 생성 시작...");
      // 2. LP 생성
      await createLpMutation.mutateAsync({
        title: lpName,
        content: lpContent,
        thumbnail: thumbnailUrl,
        tags: tags,
        published: true,
      });
      console.log("LP 생성 성공!");
    } catch (error) {
      console.error("LP 등록 실패:", error);
      alert("LP 등록에 실패했습니다. 콘솔을 확인해주세요.");
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center z-[9999] p-4"
    >
      {/* 모달 컨텐츠 */}
      <div className="bg-[#2a2a2a] rounded-lg w-full max-w-md p-6 relative">
        {/* X 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="닫기"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* LP 이미지 업로드 영역 */}
        <div className="flex flex-col items-center mb-6">
          {/* 숨겨진 파일 입력 */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* LP 이미지 - 파일 업로드 여부에 따라 다른 레이아웃 */}
          {previewUrl ? (
            // 파일 업로드 후: 앨범 커버(정사각형) + 레코드판 반쯤 겹친 느낌
            <div className="relative w-72 h-48 cursor-pointer overflow-visible">
              {/* 앨범 커버 (업로드한 이미지, 왼쪽 정사각형) */}
              <div
                onClick={handleImageClick}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-48 shadow-2xl z-10"
              >
                <img
                  src={previewUrl}
                  alt="LP Cover"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 레코드판 (오른쪽에 반쯤만 보이도록, 원형으로 자르기) */}
              <div className="absolute left-30 top-1/2 -translate-y-1/2 w-40 h-40 pointer-events-none rounded-full overflow-hidden ring-4 ring-black">
                <img
                  src="/images/record.png"
                  alt="LP Record"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ) : (
            // 파일 업로드 전: 기본 레코드판만 표시
            <div
              onClick={handleImageClick}
              className="w-48 h-48 cursor-pointer rounded-full overflow-hidden ring-4 ring-black"
            >
              <img
                src="/images/record.png"
                alt="LP Cover"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* LP Name 입력 필드 */}
        <div className="mb-4">
          <input
            type="text"
            value={lpName}
            onChange={(e) => setLpName(e.target.value)}
            placeholder="LP Name"
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
          />
        </div>

        {/* LP Content 입력 필드 */}
        <div className="mb-4">
          <input
            type="text"
            value={lpContent}
            onChange={(e) => setLpContent(e.target.value)}
            placeholder="LP Content"
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
          />
        </div>

        {/* LP Tag 입력 필드 + Add 버튼 */}
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={lpTag}
            onChange={(e) => setLpTag(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleAddTag();
              }
            }}
            placeholder="LP Tag"
            className="flex-1 px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
          />
          <button
            onClick={handleAddTag}
            className="px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-md transition-colors"
          >
            Add
          </button>
        </div>

        {/* 추가된 태그 목록 */}
        {tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                onClick={() => handleRemoveTag(tag)}
                className="px-3 py-1 bg-pink-500 text-white text-sm rounded-full cursor-pointer hover:bg-pink-600 transition-colors"
              >
                {tag} ×
              </span>
            ))}
          </div>
        )}

        {/* Add LP 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={uploadImageMutation.isPending || createLpMutation.isPending}
          className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploadImageMutation.isPending || createLpMutation.isPending
            ? "등록 중..."
            : "Add LP"}
        </button>
      </div>
    </div>
  );
}
