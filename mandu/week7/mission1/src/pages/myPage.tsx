import { useState, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import useUpdateMyInfo from "../hooks/mutations/useUpdateMy";
import type { myPageDto } from "../types/auth";

const MyPage = () => {
  const nav = useNavigate();
  const { logout, accessToken } = useAuth();
  //const [data, setData] = useState<ResponseMyInfoDto>([]);

  const { data, isLoading, isError } = useGetMyInfo(accessToken);

  const { mutate: updateMutate, isPending: isUpdating } = useUpdateMyInfo();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleLogout = async () => {
    await logout();
    nav("/");
  };

  // --- [추가] 6. 수정 모드 진입 핸들러 ---
  const handleEditClick = () => {
    if (!data?.data) return;
    // 현재 데이터로 폼을 채웁니다.
    setName(data.data.name || "");
    setBio(data.data.bio || ""); // (ResponseMyInfoDto에 bio가 있다고 가정)
    setAvatar((data.data.avatar as string) || "");
    setIsEditing(true);
  };

  // --- [추가] 7. 수정 취소 핸들러 ---
  const handleCancelClick = () => {
    setIsEditing(false);
    // state를 리셋할 필요는 없습니다. 어차피 handleEditClick에서 다시 설정됩니다.
  };

  // --- [추가] 8. 폼 제출 (저장) 핸들러 ---
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: myPageDto = {
      // (UpdateUserDto 타입에 맞게)
      name: name,
      bio: bio,
      avatar: avatar,
    };

    updateMutate(payload, {
      onSuccess: () => {
        setIsEditing(false); // 성공 시 뷰 모드로 전환
        console.log(data?.data);
      },
    });
  };

  return (
    <div>
      {isEditing ? (
        // --- 수정 모드 ---
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <h2 className="text-2xl font-bold">프로필 수정</h2>

          <div>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-400"
            >
              아바타 URL
            </label>
            <input
              id="avatar"
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full p-2 text-white bg-gray-700 border border-gray-600 rounded-md"
            />
            {avatar && (
              <img
                src={avatar}
                alt="Avatar preview"
                className="w-24 h-24 rounded-full mt-2"
              />
            )}
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-400"
            >
              이름
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 text-white bg-gray-700 border border-gray-600 rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-400"
            >
              소개 (Bio)
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 text-white bg-gray-700 border border-gray-600 rounded-md"
              rows={3}
            />
          </div>

          <div className="text-gray-400">Email: {data?.data.email}</div>

          <div className="flex space-x-2">
            <button
              type="submit"
              disabled={isUpdating}
              className="px-4 py-2 font-bold bg-pink-400 rounded-md transition-colors hover:bg-pink-600 disabled:opacity-50"
            >
              {isUpdating ? "저장 중..." : "저장"}
            </button>
            <button
              type="button"
              onClick={handleCancelClick}
              className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500"
            >
              취소
            </button>
          </div>
        </form>
      ) : (
        // --- 뷰 모드 ---
        <div className="p-4 space-y-2">
          <h1 className="text-3xl font-bold">{data?.data.name}</h1>
          <img
            src={data?.data.avatar as string}
            alt={"프로필 이미지"}
            className="w-32 h-32 rounded-full"
          />
          <div className="flex justify-between">
            <div>
              <h2 className="text-xl text-gray-400">{data?.data.bio}</h2>
              <h2 className="text-xl text-gray-400">{data?.data.email}</h2>
              {data?.data.bio && (
                <p className="text-gray-300">{data?.data.bio}</p>
              )}
            </div>

            <button
              className="cursor-pointer bg-pink-400 rounded-sm p-3 hover:bg-pink-500"
              onClick={handleEditClick}
            >
              정보 수정
            </button>
          </div>
        </div>
      )}

      <hr className="my-4 border-gray-700" />

      <div className="p-4">
        <button
          className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;
