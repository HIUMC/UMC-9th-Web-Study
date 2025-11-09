/**
 * ========================================
 * 프로필 수정 모달 컴포넌트
 * ========================================
 *
 * 사용자가 프로필 정보(이름, bio, 프로필 사진)를 수정할 수 있는 모달입니다.
 */

import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "../../apis/auth";
import { uploadImage } from "../../apis/lp";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserInfo: {
    name: string;
    bio?: string | null;
    avatar?: string | null;
  };
}

export default function ProfileEditModal({
  isOpen,
  onClose,
  currentUserInfo,
}: ProfileEditModalProps) {
  // 폼 상태
  const [name, setName] = useState(currentUserInfo.name);
  const [bio, setBio] = useState(currentUserInfo.bio || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentUserInfo.avatar || null
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  // 이미지 업로드 mutation
  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
  });

  // 프로필 수정 mutation (낙관적 업데이트)
  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    // 🎯 onMutate: 서버 응답 전에 즉시 UI 업데이트
    onMutate: async (newProfile) => {
      // 진행 중인 쿼리 취소 (충돌 방지)
      await queryClient.cancelQueries({ queryKey: ["myInfo"] });

      // 이전 값 저장 (롤백용)
      const previousUserInfo = queryClient.getQueryData(["myInfo"]);

      // 즉시 UI 업데이트 (낙관적 업데이트)
      queryClient.setQueryData(["myInfo"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: {
            ...old.data,
            name: newProfile.name || old.data.name,
            bio: newProfile.bio !== undefined ? newProfile.bio : old.data.bio,
            avatar:
              newProfile.avatar !== undefined
                ? newProfile.avatar
                : old.data.avatar,
          },
        };
      });

      console.log("✅ 닉네임 낙관적 업데이트 완료:", newProfile.name);

      // 이전 값을 context로 반환 (롤백에 사용)
      return { previousUserInfo };
    },
    onSuccess: () => {
      console.log("프로필 수정 성공!");
      // 서버 데이터와 동기화
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
      onClose();
    },
    onError: (error, _newProfile, context) => {
      console.error("프로필 수정 실패:", error);
      alert("프로필 수정에 실패했습니다.");

      // 🔄 롤백: 이전 값으로 복원
      if (context?.previousUserInfo) {
        queryClient.setQueryData(["myInfo"], context.previousUserInfo);
        console.log("❌ 프로필 수정 실패 - 롤백 완료");
      }
    },
  });

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // 미리보기 URL 생성
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // 이미지 클릭 -> 파일 선택 창 열기
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // 저장 버튼 클릭
  const handleSave = async () => {
    console.log("=== 프로필 수정 시작 ===");
    console.log("name:", name);
    console.log("bio:", bio);
    console.log("selectedFile:", selectedFile);

    // 유효성 검사
    if (!name.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }

    try {
      let avatarUrl = currentUserInfo.avatar || undefined;

      // 새로운 이미지가 선택된 경우 업로드
      if (selectedFile) {
        console.log("이미지 업로드 시작...");
        const imageResult = await uploadImageMutation.mutateAsync(selectedFile);
        avatarUrl = imageResult.data.imageUrl;
        console.log("이미지 업로드 성공:", avatarUrl);
      }

      // 프로필 수정 요청
      console.log("프로필 수정 요청...");
      await updateProfileMutation.mutateAsync({
        name: name.trim(),
        bio: bio.trim() || undefined,
        avatar: avatarUrl,
      });
    } catch (error) {
      console.error("프로필 수정 실패:", error);
    }
  };

  // 모달이 열려있지 않으면 렌더링하지 않음
  if (!isOpen) return null;

  const isLoading =
    uploadImageMutation.isPending || updateProfileMutation.isPending;

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center z-[9999]"
      onClick={onClose}
    >
      <div
        className="bg-[#0f0f10] border border-[#2a2a2a] rounded-xl p-8 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">프로필 수정</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        {/* 프로필 이미지 */}
        <div className="flex flex-col items-center mb-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div
            onClick={handleImageClick}
            className="w-32 h-32 rounded-full overflow-hidden cursor-pointer bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-5xl text-white">👤</span>
            )}
          </div>
          <p className="mt-2 text-sm text-gray-400">클릭하여 이미지 변경</p>
        </div>

        {/* 이름 입력 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-pink-500"
            placeholder="이름을 입력하세요"
          />
        </div>

        {/* Bio 입력 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            자기소개
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 min-h-[100px] resize-none"
            placeholder="자기소개를 입력하세요"
          />
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
            onClick={handleSave}
            disabled={isLoading || !name.trim()}
            className="flex-1 px-6 py-3 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
}
