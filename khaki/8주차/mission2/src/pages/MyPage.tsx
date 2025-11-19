import { useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Error } from "../components/Error";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import usePatchMyInfo from "../hooks/mutations/usePatchMyInfo";

const MyPage = () => {
  const { data, isLoading, isError } = useGetMyInfo();
  const user = data?.data;

  const { mutate: patchMyInfo } = usePatchMyInfo();

  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [bioInput, setBioInput] = useState("");
  const [avatarInput, setAvatarInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // 설정 창 열면 기존 정보가 있다면 기존정보 띄우고 없다면 빈값
  const openEditor = () => {
    setIsEditing(true);
    setNameInput(user?.name ?? "");
    setBioInput(user?.bio ?? "");
    setAvatarInput(user?.avatar ?? "");
  };

  const handleSaveWithLoading = () => {
    if (!nameInput.trim()) return;
    patchMyInfo(
      { name: nameInput.trim(), bio: bioInput || "", avatar: avatarInput || "" },
      {
        onSuccess: () => setIsEditing(false),
        onSettled: () => setIsSaving(false),
      }
    );
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Error message="사용자 정보를 불러올 수 없습니다." />
      </div>
    );
  }

  return (
    <div className="text-white flex flex-col items-center gap-4">
      {user?.avatar ? (
        <img src={user.avatar} alt="avatar" className="w-24 h-24 rounded-full object-cover" />
      ) : (
        <div className="w-24 h-24 rounded-full bg-neutral-600 flex items-center justify-center text-2xl">
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
      )}

      <h1 className="text-xl font-semibold">{user?.name}님 환영합니다.</h1>

      <h2 className="text-sm text-gray-300">{user?.email}</h2>

      <div className="flex gap-2">
        <button className="px-4 py-2 bg-pink-400 text-white rounded-md" onClick={openEditor}>
          설정
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-neutral-800 p-6 rounded w-96">
            <h3 className="text-lg font-semibold mb-4">프로필 수정</h3>

            <label className="block mb-2 text-sm">이름 (필수)</label>
            <input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full px-3 py-2 mb-3 rounded bg-neutral-700 text-white"
            />
            {!nameInput.trim() && <p className="text-red-400 text-sm mb-2">이름은 빈값일 수 없습니다.</p>}

            <label className="block mb-2 text-sm">자기소개 (선택)</label>
            <textarea
              value={bioInput}
              onChange={(e) => setBioInput(e.target.value)}
              className="w-full px-3 py-2 mb-3 rounded bg-neutral-700 text-white"
            />

            <label className="block mb-2 text-sm">프로필 사진</label>
            <input type="file" accept="image/*" className="mb-2" />
            <input
              type="text"
              placeholder="또는 이미지 URL 붙여넣기"
              value={avatarInput}
              onChange={(e) => setAvatarInput(e.target.value)}
              className="w-full px-3 py-2 mb-3 rounded bg-neutral-700 text-white"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setIsEditing(false)} className="px-3 py-1 bg-neutral-600 text-white rounded">
                취소
              </button>
              <button
                onClick={handleSaveWithLoading}
                className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
