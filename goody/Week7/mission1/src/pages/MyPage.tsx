import { useEffect, useState } from "react"
import { getMyInfo } from "../apis/auth"
import type { ResponseMyInfoDto } from "../types/auth"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import useGetMyInfo from "../hooks/queries/useGetMyInfo"
import usePatchUsers from "../hooks/mutations/usePatchUsers"
import useImageUpload from "../hooks/mutations/useImageUpload"
import type { patchUsersProps } from "../apis/users"

const MyPage = () => {

    const navigate = useNavigate();
    const{logout, accessToken} = useAuth();

    const {data} = useGetMyInfo(accessToken);
    // 수정 모드 상태
    const [isEditing,setIsEditing] = useState(false);
    // 폼 입력용
    const [nameInput,setNameInput] = useState("");
    const [bioInput,setBioInput] = useState("");
    // 이미지 상태
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null); // 로컬 미리보기
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null); // 서버 저장용 URL

    const { mutate : patchUserMutate } = usePatchUsers();
    const { mutate: uploadImageMutate, isPending: isUploading } = useImageUpload({
        onSuccessCallback: (data) => {
        // 이미지 업로드 성공 시, 서버 URL을 avatarUrl state에 저장
            const newImageUrl = data.imageUrl;
            console.log("이미지 업로드 성공, 서버 URL:", newImageUrl);
            setAvatarUrl(newImageUrl);
            setAvatarPreview(newImageUrl); // 미리보기도 서버 URL로 교체
        },
        onErrorCallback: () => {
            alert("이미지 업로드에 실패했습니다.");
            setAvatarPreview(data?.data?.avatar ?? null); // 실패 시 원래 이미지로 복구
        }
    });
    
    // 수정 시작 핸들러
    const handleStartEdit = () => {
        if (!data?.data) return;
        // 현재 데이터로 폼 상태 초기화
        setNameInput(data.data.name);
        setBioInput(data.data.bio ?? ""); // bto가 null일 수 있으니 ?? "" 처리
        setAvatarUrl(data.data.avatar ?? null);
        setAvatarPreview(data.data.avatar ?? null);
        setIsEditing(true);
    };
    // 수정 취소
    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 1단계: 로컬 미리보기
        const localPreview = URL.createObjectURL(file);
        setAvatarPreview(localPreview);

        // 2단계: 서버로 파일 업로드
        const formData = new FormData();
        formData.append("file", file);
        uploadImageMutate(formData);
    };

    const handleSave = () => {
        if (nameInput.trim() === "") {
            alert("이름은 필수입니다.");
            return;
        }

        const payload: patchUsersProps = {
            name: nameInput,
            bio: bioInput, // Bio (빈 문자열도 가능)
            avatar: avatarUrl, // 이미지 URL (null도 가능)
        };

        patchUserMutate(payload, {
        onSuccess: () => {
            setIsEditing(false); // 수정 모드 종료
            // 쿼리가 무효화되고 useQuery가 데이터를 새로고침할 것임.
        },
        });
    };

    const handleLogout = async() => {
        await logout();
        navigate("/")
    }

    console.log(data?.data.name)
    return (
    <div>
      {/* 수정 모드 */}
        {isEditing ? (
            <div>
            <h3>프로필 수정</h3>
            
            {/* 아바타 수정 */}
            <label className="cursor-pointer">
                <img 
                    src={avatarPreview ?? "/default-avatar.png"} // 기본 아바타 이미지 경로
                    alt="아바타 미리보기" 
                    className="w-32 h-32 rounded-full object-cover"
                />
                <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden"
                    onChange={handleImageChange}
                />
            </label>
            {isUploading && <p>이미지 업로드 중...</p>}

            {/* 이름 수정 */}
            <div>
                <label htmlFor="name">이름</label>
                <input
                id="name"
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="border p-2"
                />
            </div>

            {/* Bio 수정 */}
            <div>
                <label htmlFor="bio">소개 (Bio)</label>
                <input
                id="bto"
                type="text"
                placeholder="소개를 입력하세요"
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                className="border p-2"
                />
            </div>
            
            {/* 버튼 */}
            <div className="flex gap-2 mt-4">
                <button
                onClick={handleSave}
                className="bg-green-500 text-white p-2 rounded"
                >
                저장
                </button>
                <button
                onClick={handleCancelEdit}
                className="bg-gray-400 text-white p-2 rounded"
                >
                취소
                </button>
            </div>
            </div>

        ) : (
            // 보기 모드
            <div className="mt-12">
                <h1>{data?.data?.name}님 환영합니다</h1>
                <img 
                    src={data?.data?.avatar ?? "/default-avatar.png"} // 기본 아바타
                    alt={"프로필 이미지"}
                    className="w-32 h-32 rounded-full object-cover"
                />
                <h1>{data?.data?.email}</h1>
                {/* Bio가 있다면 표시 */}
                {data?.data?.bio && <p className="mt-12">소개: {data.data.bio}</p>}
                
                <button
                    className="cursor-pointer bg-blue-300 rounded-sm p-3 hover:scale-90"
                    onClick={handleStartEdit}
                >
                    설정 (수정하기)
                </button>
                <button
                    className="cursor-pointer bg-red-300 rounded-sm p-3 hover:scale-90 ml-2"
                    onClick={handleLogout}
                >
                    로그아웃
                </button>
            </div>
        )}
        </div>
    );
    
}

export default MyPage
