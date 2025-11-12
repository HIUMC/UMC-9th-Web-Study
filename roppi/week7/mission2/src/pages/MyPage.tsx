import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useUpdateMyInfo from "../hooks/mutations/useUpdateMyInfo";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/key";
import { getMyInfo } from "../apis/auth";

const MyPage = () => {
  const { logout, accessToken } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  const { mutate: updateMyInfo } = useUpdateMyInfo();

  // 내 정보 조회
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.myInfo],
    queryFn: getMyInfo,
    // enabled: !!accessToken,
    onSuccess: (res) => {
      setName(res.data.name);
      setBio(res.data.bio || "");
      console.log(res.data.name)
    },
  });

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatar(file);
  };

  // 프로필 저장
  const handleSave = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio || "");
    if (avatar) formData.append("avatar", avatar);

    updateMyInfo(formData, {
      onSuccess: () => setIsEditing(false),
    });
  };

  if (isLoading || !data) return <div className="text-white">로딩중...</div>;

  return (
    <div className="flex flex-col justify-center items-center gap-10 text-white mt-10">
      {!isEditing ? (
        <>
          <img
src={
    data.data.avatar
      ? data.data.avatar
      : "/default-avatar.png"}
                  className="w-24 h-24 rounded-full border object-cover"
          />
          <h1 className="text-2xl font-bold">{data.data.name ? data.data.name : ""}</h1>
          <p className="text-gray-400">{data.data.bio ? data.data.bio : "자기소개가 없습니다."}</p>

          <div className="flex gap-5">
            <button
              className="px-5 py-2 font-bold cursor-pointer border bg-[#e52582] rounded-md"
              onClick={() => setIsEditing(true)}
            >
              프로필 수정
            </button>
            <button
              className="px-5 py-2 font-bold cursor-pointer border bg-[#e52582] rounded-md"
              onClick={handleLogout}
            >
              로그아웃
            </button>
            <button
              className="px-5 py-2 font-bold cursor-pointer border bg-[#e52582] rounded-md"
              onClick={() => navigate("/")}
            >
              홈으로
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-4 items-center w-80">
          {/* 프로필 이미지 선택 */}
          <div
            onClick={() => fileRef.current?.click()}
            className="cursor-pointer relative"
          >
            <img
              src={avatar ? URL.createObjectURL(avatar) : data.data.avatar || "/default-avatar.png"}
              className="w-24 h-24 rounded-full border object-cover"
            />
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* 이름 */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            className="w-full bg-[#303030] border border-gray-600 rounded px-3 py-2 text-sm"
          />

          {/* 자기소개 */}
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="자기소개 (선택)"
            className="w-full bg-[#303030] border border-gray-600 rounded px-3 py-2 text-sm h-20"
          />

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-pink-500 rounded hover:opacity-90"
            >
              저장
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-600 rounded hover:opacity-90"
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
