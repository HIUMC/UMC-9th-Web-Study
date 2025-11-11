import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import EditProfileModal from "../components/EditProfileModal";
import { Settings, User } from "lucide-react";

const MyPage = () => {
    const navigate = useNavigate();
    const {logout} = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const fetchMyInfo = async() => {
        const response = await getMyInfo();
        setData(response);
    };

    useEffect(() => {
        fetchMyInfo();
    }, []);

    const handleLogout = async() => {
        await logout();
        navigate ("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <Navbar />

            <EditProfileModal
                isOpen={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    fetchMyInfo();
                }}
                currentName={data?.data?.name || ''}
                currentBio={data?.data?.bio || undefined}
                currentAvatar={data?.data?.avatar || undefined}
            />

            <div className="relative">
                <h1 className="text-2xl font-semibold text-white mb-6">{data?.data?.name}님 환영합니다.</h1>
            </div>

            <div className="relative mb-6">
                {data?.data?.avatar ? (
                    <img
                        src={data.data.avatar}
                        alt="프로필 이미지"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-500 flex items-center justify-center">
                        <User size={48} className="text-gray-300" />
                    </div>
                )}
                <button
                    onClick={() => setShowEditModal(true)}
                    className="absolute -bottom-2 -right-2 bg-pink-600 hover:bg-pink-700 p-2 rounded-full transition-colors"
                    title="프로필 수정"
                >
                    <Settings size={20} />
                </button>
            </div>

            {data?.data?.bio && (
                <p className="text-gray-300 mb-4 text-center max-w-md">{data.data.bio}</p>
            )}

            <h1 className="text-lg text-gray-300 mb-8">{data?.data?.email}</h1>

            <button
                className="cursor-pointer bg-purple-300 rounded-sm p-5 hover:bg-purple-600 hover:scale-105"
                onClick={handleLogout}
            >
                로그아웃
            </button>
        </div>
    );
};

export default MyPage;