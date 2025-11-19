import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Sidebar from "./Sidebar";
import useSidebar from "../hooks/useSidebar";
import { useLogoutMutation } from "../hooks/mutations/useLogoutMutation";
import { useGetMyInfo } from "../hooks/queries/useGetMyInfo";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const Navbar = () => {
    const { isOpen, close, toggle } = useSidebar();
    const {accessToken} = useAuth();
    const navigate = useNavigate();
    const { data: myInfo } = useGetMyInfo(!!accessToken);
    const logoutMutation = useLogoutMutation();

    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                // 로그아웃 성공 => 로컬 스토리지에서 토큰 삭제
                localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
                localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
                alert("로그아웃 성공");
                navigate("/");
            },
            onError: (error) => {
                console.error("로그아웃 오류:", error);
                alert("로그아웃 실패");
            }
        });
    };  

    return (
        <>
        <header className='fixed top-0 w-full bg-black shadow-lg border-b border-gray-800 z-50'>
            <div className='flex px-4 justify-between items-center h-16'>
                <div className="flex items-center gap-4">
                    <button onClick={toggle}
                        className="p-2 text-white hover:bg-gray-800 rounded"
                        aria-label="사이드바 토글"
                    >
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
                        // 비로그인 상태 : 로그인, 회원가입 버튼
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
                                onClick={handleLogout}
                                disabled={logoutMutation.isPending}>
                                {logoutMutation.isPending ? "로그아웃 중..." : "로그아웃"}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
        
        <Sidebar open={isOpen} onClose={close} />
        </>
    );  
};

export default Navbar;