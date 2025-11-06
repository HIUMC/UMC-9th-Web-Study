import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ResponseMyInfoDto } from "../types/auth";
import { Search } from "lucide-react";
import Sidebar from "./Sidebar";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const {accessToken, logout} = useAuth();
    const navigate = useNavigate();
    const [myInfo, setMyInfo] = useState<ResponseMyInfoDto | null>(null);
    useEffect(() => {
        const fetchMyInfo = async () => {
            if (accessToken) {
                const response = await getMyInfo();
                setMyInfo(response);
            }
        };
        fetchMyInfo();
    }, [accessToken]);  

    return (
        <>
        <header className='fixed top-0 w-full bg-black shadow-lg border-b border-gray-800 z-10'>
            <div className='max-w-7xl mx-auto flex px-4 justify-between items-center h-16'>
                <div className="flex items-center gap-4">
                    {/* 버거 버튼 */}
                    <button
                        onClick={() => setOpen(true)}
                        className="p-2 text-white hover:bg-gray-800 rounded"
                        aria-label="사이드바 열기"
                    >
                        {/* 버거 SVG */}
                        <svg viewBox="0 0 48 48" className="h-6 w-6" xmlns="http://www.w3.org/2000/svg">
                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"
                                d="M7.95 11.95h32m-32 12h32m-32 12h32"
                            />
                        </svg>
                    </button>
                    <h1 className='text-3xl font-extrabold text-pink-500 cursor-pointer'
                        onClick={() => navigate('/')}>돌려돌려LP판</h1>
                </div>
                <div className='flex items-center gap-4'>
                    <button 
                        className="p-2 text-white hover:bg-gray-800 rounded"
                        onClick={() => navigate('/search')}
                        aria-label="검색"
                    >
                        <Search className="h-5 w-5" />
                    </button>
                    {!accessToken ? (
                        // 비로그인 : 로그인, 회원가입 버튼
                        <>
                            <button 
                                className='px-4 py-2 text-white border border-gray-700 rounded-md hover:bg-gray-800' 
                                onClick={() => navigate('/login')}>
                                로그인
                            </button>
                            <button 
                                className='px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700' 
                                onClick={() => navigate('/signup')}>
                                회원가입
                            </button>
                        </>
                    ) : (
                        // 로그인 : (닉네임)님 반갑습니다, 로그아웃 버튼
                        <>
                            <span className="text-white/90 leading-none inline-flex items-center">
                                <b>{myInfo?.data?.name}</b>님 반갑습니다.
                            </span>
                            <button 
                                className='px-4 py-2 text-white border border-gray-700 rounded-md hover:bg-gray-800' 
                                onClick={logout}>
                                로그아웃
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>

        <Sidebar open={open} onClose={() => setOpen(false)} />
        </>
    );  
};

export default Navbar;