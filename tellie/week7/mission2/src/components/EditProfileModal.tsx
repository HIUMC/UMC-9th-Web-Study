import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMyProfile } from '../apis/auth';
import { uploadImage } from '../apis/lp';
import { User } from 'lucide-react';

type EditProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  currentBio?: string;
  currentAvatar?: string;
};

const EditProfileModal = ({
  isOpen,
  onClose,
  currentName,
  currentBio,
  currentAvatar,
}: EditProfileModalProps) => {
  const [name, setName] = useState(currentName);
  const [bio, setBio] = useState(currentBio || '');
  const [selectedImage, setSelectedImage] = useState<string | null>(currentAvatar || null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

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

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageFile(null);
  };

  // 이미지 업로드 mutation
  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (error: any) => {
      console.error('이미지 업로드 실패:', error);
      alert(`이미지 업로드에 실패했습니다.\n${error?.response?.data?.message || error?.message || '알 수 없는 오류'}`);
    },
  });

  // 프로필 업데이트 mutation
  const updateProfileMutation = useMutation({
    mutationFn: updateMyProfile,
    // 진행중인 쿼리 취소하기
    onMutate: async (newProfile) => {
      await queryClient.cancelQueries({ queryKey: ['myInfo'] });
      const previousData = queryClient.getQueryData(['myInfo']);

      queryClient.setQueryData(['myInfo'], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: {
            ...old.data,
            name: newProfile.name,
            bio: newProfile.bio,
            avatar: newProfile.avatar,
          },
        };
      });

      return { previousData };
    },
    // 성공 시 알림 및 모달 닫기
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
      alert('프로필이 업데이트되었습니다.');
      onClose();
    },
    // 에러 시 롤백하기
    onError: (error: any, _newProfile, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['myInfo'], context.previousData);
      }
      console.error('프로필 업데이트 실패:', error);
      alert(`프로필 업데이트에 실패했습니다.\n${error?.response?.data?.message || error?.message || '알 수 없는 오류'}`);
    },
  });

  const handleSave = async () => {
    if (!name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }

    try {
      let avatarUrl: string | null | undefined = selectedImage;

      if (imageFile) {
        const uploadResult = await uploadImageMutation.mutateAsync(imageFile);
        avatarUrl = uploadResult.imageUrl;
      }

      await updateProfileMutation.mutateAsync({
        name: name.trim(),
        bio: bio.trim() || '',
        avatar: avatarUrl === null ? null : avatarUrl,
      });
    } catch (error) {
      // mutation의 onError에서 에러 처리됨
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#2C2C2E] p-6 rounded-lg w-full max-w-lg mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl font-light leading-none"
        >
          x
        </button>

        <h2 className="text-xl font-bold mb-6 text-white">프로필 수정</h2>

        {/* 프로필 이미지 */}
        <div className="flex flex-col items-center mb-6">
          <div
            onClick={handleImageClick}
            className="w-32 h-32 rounded-full overflow-hidden bg-gray-600 cursor-pointer hover:opacity-80 transition-opacity mb-2"
          >
            {selectedImage ? (
              <img src={selectedImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-500">
                <User size={64} className="text-gray-300" />
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleImageClick}
              className="text-sm text-pink-500 hover:text-pink-400 transition-colors"
            >
              프로필 사진 변경
            </button>
            {selectedImage && (
              <button
                onClick={handleRemoveImage}
                className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
              >
                사진 삭제
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* 이름 입력 */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-white mb-2">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600"
          />
        </div>

        {/* Bio 입력 */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-white mb-2">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="자기소개를 입력하세요"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600"
            rows={3}
          />
        </div>

        {/* 저장 버튼 */}
        <button
          onClick={handleSave}
          disabled={uploadImageMutation.isPending || updateProfileMutation.isPending}
          className="w-full py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploadImageMutation.isPending
            ? '이미지 업로드 중...'
            : updateProfileMutation.isPending
            ? '저장 중...'
            : '저장'}
        </button>
      </div>
    </div>
  );
};

export default EditProfileModal;