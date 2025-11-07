import { useNavigate, useParams } from "react-router-dom";
import { useGetLpDetail } from "../hooks/queries/useGetLpDetail"
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getTimeAgo } from "../utils/time";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

export const LpDetailPage = () => {
    const {lpid} = useParams<{lpid: string}>();
    const {data, isError, isPending, refetch} = useGetLpDetail(lpid!);
    const { userName} = useAuth();
    const [ user, setUser ] = useState<ResponseMyInfoDto | null>(null);
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();
    

    useEffect(() => {
        const getUser = async () => {
            const response = await getMyInfo();
            console.log(response);
            setUser(response);
        };
    
        getUser();
    }, []);

    if (isPending || !data) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="w-12 h-12 border-4 border-t-neutral-500 border-gray-300 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (isError) {
        alert("Error")
        return (
            <div className="flex flex-col justify-center items-center h-[60vh] space-y-4">
                <button
                    onClick={() => refetch()}
                    className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors"
                >
                    재시도
                </button>
            </div>
        );
    }

    return (
    <div className="flex justify-center">
        <div className="bg-neutral-800 rounded-lg shadow-lg p-30 text-white flex flex-col gap-6">
            <div className="flex flex-col gap-6">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-2 ">
                        <img src = {user?.data.avatar ?? "/src/assets/default-avatar.webp"} alt={"구글 로고"} className="w-8 h-8 rounded-full object-cover shadow-sm"/>
                        <p className="font-semibold">{userName}</p>
                    </div>
                    <p className="text-gray-400">{getTimeAgo(data.createdAt)}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <h1 className="text-xl font-bold">{data.title}</h1>
                    <div>
                        <button className="p-2 hover:bg-gray-700 rounded transition">
                            <FiEdit2 size={20}/>
                        </button>
                        <button className="p-2 hover:bg-red-700 rounded transition">
                            <RiDeleteBin6Line size={20}/>
                        </button>
                    </div>
                </div>
                <div className="flex justify-center">
                    <img
                        src={`https://picsum.photos/400/300?random=${data.id}`}
                        alt={data.title}
                        className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-lg"
                    />
                </div>
                    
                <div className="text-gray-200 text-base leading-relaxed">{data.content}</div>
                <div className="flex justify-center items-center gap-1">
                    <button
                        onClick={() => {
                            setIsLiked(!isLiked)
                            }}>
                        {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                    </button>
                    {data.likes.length}
                </div>
            </div>
            
        </div>
    </div>
)

}