import { useEffect, useRef, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ProfileEditModal } from "../components/ProfileEditModal";
import { IoSettingsOutline } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";

export const MyPage = () => {
    const navigate = useNavigate();
    const {logout} = useAuth();
    const [ data, setData ] = useState<ResponseMyInfoDto | null>(null);
    const [isSettingOpen, setIsSettingOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const settingRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);

            setData(response);
        };

        getData();
    }, []);

    const handleLogout = async() => {
        await logout();
        navigate("/");
    };

    const handleProfileUpdateSuccess = async () => {
        const response = await getMyInfo();
        setData(response!);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (settingRef.current && !settingRef.current.contains(e.target as Node)) {
                setIsSettingOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-full gap-4 relative pt-20">
            <div ref={settingRef} className="absolute top-24 right-8 flex flex-col items-end">
                <button
                    onClick={() => setIsSettingOpen((prev) => !prev)}
                    className="p-2 hover:bg-gray-700 rounded-full transition-colors z-10"
                >
                    <IoSettingsOutline size={24} className="text-gray-300" />
                </button>

                {isSettingOpen && (
                    <div className="absolute top-full mt-2 right-0 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg z-20">
                        <button
                            onClick={() => {
                                setIsSettingOpen(false);
                                setIsEditModalOpen(true);
                            }}
                            className="px-4 py-2 hover:bg-neutral-700 flex items-center gap-2 justify-center text-sm whitespace-nowrap transition"
                        >
                            <FiEdit2 size={16} />
                            수정
                        </button>
                    </div>
                )}
            </div>

            {isEditModalOpen && data && (
                <ProfileEditModal 
                    user={data} 
                    onClose={() => setIsEditModalOpen(false)}
                    onSuccess={handleProfileUpdateSuccess}
                />
            )}

            <h1 className="text-2xl"><strong className="text-gray-400">{data?.data.name}</strong>님 환영합니다.</h1>
            <img src = {data?.data.avatar ? data?.data.avatar : "/src/assets/default-avatar.webp"} alt={"구글 로고"} className="w-60 h-60 rounded-full" />
            <h1 className="text-lg text-gray-300 font-bold">{data?.data.email}</h1>
            {data?.data.bio && (
                <p className="text-gray-400 text-center max-w-md px-4">{data.data.bio}</p>
            )}
            <button className="cursor-pointer bg-blue-500 rounded-sm p-4 hover:bg-blue-600 duration-200" onClick={handleLogout}>
                로그아웃
            </button>
        </div>
    )
}