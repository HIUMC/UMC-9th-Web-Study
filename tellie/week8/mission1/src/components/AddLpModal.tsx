import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLp, uploadImage } from "../apis/lp";
import { QUERY_KEY } from "../constants/key";

type AddLpModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddLpModal = ({ isOpen, onClose }: AddLpModalProps) => {
  const [lpName, setLpName] = useState("");
  const [lpContent, setLpContent] = useState("");
  const [lpTag, setLpTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const handleAddTag = () => {
    if (lpTag.trim()) {
      setTags([...tags, lpTag.trim()]);
      setLpTag("");
    }
  };

  const handleRemoveTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지 업로드 mutation
  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (error: any) => {
      console.error("이미지 업로드 실패:", error);
      alert(`이미지 업로드에 실패했습니다.\n${error?.response?.data?.message || error?.message || "알 수 없는 오류"}`);
    },
  });

  // LP 생성 mutation
  const createLpMutation = useMutation({
    mutationFn: createLp,
    onSuccess: () => {
      // LP 목록 쿼리 무효화하여 자동 새로고침
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps]
      });
      // 폼 리셋
      setLpName("");
      setLpContent("");
      setLpTag("");
      setTags([]);
      setSelectedImage(null);
      setImageFile(null);
      onClose();
    },
    onError: (error: any) => {
      console.error("LP 생성 실패:", error);
      alert(`LP 생성에 실패했습니다.\n${error?.response?.data?.message || error?.message || "알 수 없는 오류"}`);
    },
  });

  const handleAddLp = async () => {
    if (!lpName.trim() || !lpContent.trim() || !imageFile) {
      alert("LP 이름, 내용, 이미지를 모두 입력해주세요.");
      return;
    }

    try {
      // 1. 이미지 업로드
      const uploadResult = await uploadImageMutation.mutateAsync(imageFile);

      // 2. LP 생성
      await createLpMutation.mutateAsync({
        title: lpName,
        content: lpContent,
        thumbnail: uploadResult.imageUrl,
        tags: tags,
        published: true,
      });
    } catch (error) {
      // 에러는 각 mutation의 onError에서 처리됨
      console.error("LP 추가 중 에러 발생:", error);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#2C2C2E] p-6 rounded-lg w-full max-w-lg mx-4 relative z-50">
        {/* x 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl font-light leading-none"
          aria-label="Close modal"
        >
          ×
        </button>

        {/* 이미지 영역 */}
        <div className="flex justify-center items-center mb-6">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />

          {/* 선택한 사진 (왼쪽) */}
          {selectedImage && (
            <div className="w-48 h-48 rounded-lg overflow-hidden flex-shrink-0 z-20">
              <img
                src={selectedImage}
                alt="Selected LP Cover"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* LP 디스크 (오른쪽 또는 중앙) */}
          <div
            onClick={handleImageClick}
            className={`w-48 h-48 rounded-full overflow-hidden cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0 ${selectedImage ? '-ml-12 z-10' : ''}`}
          >
            {/* 가장 바깥쪽 Disk 테두리 첫번째 원 : 회색~검정 그라데이션 */}
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
              {/* Disk 본체 두번째 원 : 조금 더 어두운 회색~검정 그라데이션 */}
              <div className="w-44 h-44 rounded-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                {/* Disk 중앙 세번째 원 : 흰색 배경 */}
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                  {/* 레코드 구멍 네번째 원 : 검정색 작은 원 */}
                  <div className="w-2 h-2 rounded-full bg-black"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LP Name 입력 */}
        <input
          type="text"
          placeholder="LP Name"
          value={lpName}
          onChange={(e) => setLpName(e.target.value)}
          className="w-full bg-[#1C1C1E] text-white placeholder-gray-500 px-4 py-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-pink-600"
        />

        {/* LP Content 입력 */}
        <input
          type="text"
          placeholder="LP Content"
          value={lpContent}
          onChange={(e) => setLpContent(e.target.value)}
          className="w-full bg-[#1C1C1E] text-white placeholder-gray-500 px-4 py-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-pink-600"
        />

        {/* 태그 입력, Add 버튼 */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="LP Tag"
            value={lpTag}
            onChange={(e) => setLpTag(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && lpTag.trim() && handleAddTag()}
            className="flex-1 bg-[#1C1C1E] text-white placeholder-gray-500 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-pink-600"
          />
          <button
            onClick={handleAddTag}
            disabled={!lpTag.trim()}
            className={`px-6 py-3 rounded-lg transition-colors text-white ${
              lpTag.trim()
                ? 'bg-pink-600 hover:bg-pink-700'
                : 'bg-[#9CA3AF] cursor-not-allowed'
            }`}
          >
            Add
          </button>
        </div>

        {/* 태그 */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-pink-600 text-white text-sm rounded-full"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(index)}
                  className="ml-1 hover:text-gray-300 transition-colors"
                  aria-label={`Remove ${tag} tag`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Add LP 버튼 */}
        <button
          onClick={handleAddLp}
          disabled={uploadImageMutation.isPending || createLpMutation.isPending}
          className="w-full py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploadImageMutation.isPending
            ? "이미지 업로드 중..."
            : createLpMutation.isPending
            ? "LP 생성 중..."
            : "Add LP"}
        </button>
      </div>
    </div>
  );
};

export default AddLpModal;
