import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginHeader from "../components/LoginHeader";

const MyPage = () => {
    const navigate = useNavigate();
    const {logout} = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);
    useEffect(() => {
        const getData = async() => {
            const response = await getMyInfo();

            setData(response);
        };
        getData();
    }, []);

    const handleLogout = async() => {
        await logout();
        navigate ("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <LoginHeader />
            <h1 className="text-2xl font-semibold text-white mb-6">{data?.data?.name}님 환영합니다.</h1>
            <img src={data?.data?.avatar as string} alt={"프로필 이미지"} className="w-24 h-24 rounded-full mb-6" />
            <h1 className="text-lg text-gray-300 mb-8">{data?.data?.email}</h1>

            <button className="cursor-pointer bg-purple-300 rounded-sm p-5 hover:bg-purple-600 hover:scale-105" onClick={handleLogout}>로그아웃</button>
        </div>
    );
};

export default MyPage;