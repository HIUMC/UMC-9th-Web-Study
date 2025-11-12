import { useAuth } from "../context/AuthContext";
import { Pencil, Check, UserCircle } from "lucide-react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useState } from "react";
import usePatchMyInfo from "../hooks/mutations/usePatchMyInfo";
import usePostImgUpload from "../hooks/mutations/usePostImgUpload";
import ImgSelector from "../components/ModalComponent/ImgSelector";
import InputComponent from "../components/ModalComponent/InputComponent";

const MyPage = () => {
  const { accessToken } = useAuth();
  const { data: my } = useGetMyInfo(accessToken);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editProfile, setEditProfile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { mutate: patchMutate } = usePatchMyInfo();
  const { mutate: uploadImg } = usePostImgUpload();

  // 수정 버튼 클릭 시
  const handleEdit = () => {
    setIsEditing(true);
    setEditName(my?.data.name || "");
    setEditBio(my?.data.bio || "");
    setPreview(my?.data.avatar || null);
  };

  // 이름, bio 변경 핸들러
  const handleEditName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEditName(e.target.value);
  const handleEditBio = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEditBio(e.target.value);

  // 이미지 변경 핸들러
  const handleImgChange = (file: File | null) => {
    setEditProfile(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  // 수정 완료 버튼 클릭 시 상태관리 함수
  const handleEditComplete = () => {
    if (!editName.trim() || !editBio.trim()) {
      alert("이름과 소개를 모두 입력해주세요!");
      return;
    }

    // 이미지 업로드가 필요한 경우
    if (editProfile) {
      uploadImg(editProfile, {
        onSuccess: (imageUrl) => {
          patchMutate(
            { name: editName, bio: editBio, avatar: imageUrl },
            {
              onSuccess: () => {
                alert("회원정보가 수정되었습니다!");
                setIsEditing(false);
              },
            }
          );
        },
      });
    } else {
      // 이미지 변경 없이 이름, bio만 수정
      patchMutate(
        {
          name: editName,
          bio: editBio,
          avatar: my?.data.avatar || "",
        },
        {
          onSuccess: () => {
            alert("회원정보가 수정되었습니다!");
            setIsEditing(false);
          },
        }
      );
    }
  };

  const myData = my?.data;

  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="flex flex-row gap-6 items-center">
        {/* 프로필 이미지 */}
        {isEditing ? (
          <ImgSelector
            onChange={handleImgChange}
            defaultImg={preview || myData?.avatar || ""}
          />
        ) : myData?.avatar ? (
          <img
            src={myData.avatar}
            alt="프로필 이미지"
            width={200}
            height={200}
            className="rounded-lg object-cover"
          />
        ) : (
          <UserCircle className="text-white" size={150} />
        )}

        {/* 이름 / bio / 버튼 */}
        <div className="flex flex-col text-white gap-4">
          <div className="flex flex-row gap-2 items-center">
            {isEditing ? (
              <InputComponent
                value={editName}
                onChange={handleEditName}
                classname="text-lg"
              />
            ) : (
              <span className="text-2xl font-semibold">{myData?.name}</span>
            )}

            {isEditing ? (
              <button onClick={handleEditComplete} className="cursor-pointer">
                <Check />
              </button>
            ) : (
              <button onClick={handleEdit} className="cursor-pointer">
                <Pencil size={20} className="hover:text-gray-500 transition" />
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {isEditing ? (
              <InputComponent
                value={editBio}
                onChange={handleEditBio}
                inputComment="소개를 입력해주세요"
              />
            ) : (
              <span>{myData?.bio || "소개가 없습니다."}</span>
            )}
            <span className="text-white text-sm">{myData?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
