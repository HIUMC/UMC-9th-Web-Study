import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const MyPage = () => {
    const navigate = useNavigate();
    const {logout} = useAuth();
    const [ data, setData ] = useState<ResponseMyInfoDto | null>(null);
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

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <h1 className="text-2xl"><strong className="text-gray-400">{data?.data.name}</strong>님 환영합니다.</h1>
            <img src = {data?.data.avatar ?? "/default-avatar.webp"} alt={"구글 로고"} className="w-60 h-60 rounded-full" />
            <h1 className="text-lg text-gray-300 font-bold">{data?.data.email}</h1>
            <button className="cursor-pointer bg-blue-500 rounded-sm p-4 hover:bg-blue-600 duration-200" onClick={handleLogout}>
                로그아웃
            </button>
        </div>
    )
}