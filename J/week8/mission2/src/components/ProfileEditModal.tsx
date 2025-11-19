import { useState, useRef } from "react";
import { usePatchMyInfo } from "../hooks/mutations/usePatchMyInfo";
import type { ResponseMyInfoDto } from "../types/auth";
import { usePostUpload } from "../hooks/mutations/usePostUpload";

interface ProfileEditModalProps {
    user: ResponseMyInfoDto;
    onClose: () => void;
    onSuccess?: () => void;
}

export const ProfileEditModal = ({user, onClose, onSuccess}: ProfileEditModalProps) => {
    const[name, setName] = useState(user.data.name);
    const[bio, setBio] = useState(user.data.bio || "");
    const[avatar, setAvatar] = useState<File | null>(null);
    const[avatarUrl, setAvatarUrl] = useState(user.data.avatar || "");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { mutateAsync: uploadFile } = usePostUpload();
    const {mutate: patchMyInfo, isPending} = usePatchMyInfo();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatar(file);
            setAvatarUrl(URL.createObjectURL(file));
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let uploadUrl = avatarUrl;

        if (avatar) {
            const formData = new FormData();
            formData.append("file", avatar);

            try {
                const { data } = await uploadFile(formData);
                uploadUrl = data.imageUrl;
            } catch (err) {
                console.error("썸네일 업로드 실패", err);
                alert("썸네일 업로드 실패");
            }
        }

        patchMyInfo(
            { name, bio, avatar: uploadUrl },
            {
                onSuccess: () => {
                    alert("프로필 수정 성공");
                    onSuccess?.();
                    onClose();
                },
                onError: (err) => {
                    console.error("프로필 수정 실패", err);
                    alert("프로필 수정 실패");
                },
            }
        );
    }

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center bg-black/40 justify-center" 
            onClick={onClose}
        >
            <div
                className="flex flex-col bg-neutral-800 rounded-2xl shadow-2xl p-6 max-w-[90%] text-gray-200 gap-4"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="flex justify-end text-gray-500 hover:text-gray-300 transition-colors text-2xl"
                >
                    ✕
                </button>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className="flex flex-row gap-5">
                        <img
                            src={avatarUrl || "/src/assets/default-avatar.webp"}
                            alt="프로필 사진"
                            onClick={handleImageClick}
                            className="w-36 h-36 rounded-full object-cover border-2 border-neutral-600 relative cursor-pointer group transition-opacity group-hover:opacity-70"
                        />
                        <input 
                            ref={fileInputRef}
                            type="file" 
                            onChange={handleFileChange} 
                            className="hidden"
                            accept="image/*"
                        />
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 rounded bg-neutral-700 border border-neutral-600 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                                placeholder="Name"
                                required
                            />
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="w-full p-3 rounded bg-neutral-700 border border-neutral-600 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none resize-none"
                                rows={1}
                                placeholder="Bio"
                            />
                            <p>{user.data.email}</p>
                        </div>

                    </div>
                    <div className="flex justify-center gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 bg-gray-600 hover:bg-gray-700 rounded text-sm transition-colors"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            disabled={isPending || !name.trim()}
                            className={`px-5 py-2 rounded text-sm transition-colors ${
                                isPending || !name.trim()
                                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                                    : "bg-pink-500 text-white hover:bg-pink-600 cursor-pointer"
                            }`}
                        >
                            저장
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};