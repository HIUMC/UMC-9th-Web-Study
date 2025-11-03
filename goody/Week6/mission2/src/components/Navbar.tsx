import { Link, NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { useQuery } from "@tanstack/react-query";

interface NavbarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: () => void; // 부모로부터 받을 토글 함수
}

const Navbar = ({isSidebarOpen,setIsSidebarOpen}:NavbarProps) => {

    
    const { accessToken, logout } = useAuth();
    const navigate = useNavigate();

    const { data } = useQuery<ResponseMyInfoDto>({
        queryKey: ["userInfo"],
        queryFn: getMyInfo,
        staleTime: 5 * 60 * 1000, 
        gcTime: 10 * 60 * 1000, 
        enabled : !!accessToken,
    });

    const handleLogout = async () => {
        await logout();
        navigate("/")
    }

    const LINKS = [
        { to: '/login', label: '로그인' },
        { to: '/signup', label: '회원가입' },
    ];

    return (
        <nav className="flex justify-between items-center bg-fuchsia-200 fixed w-full h-20 z-50">
            <div className="flex items-center justify-between gap-5 ">
                <button
                    onClick={setIsSidebarOpen}
                    className="cursor-pointer p-3"
                >
                    <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="4"
                        d="M7.95 11.95h32m-32 12h32m-32 12h32"
                        />
                    </svg>
                </button>
                <Link to='/' className="text-3xl font-bold text-gray-700 p-4 hover:text-black">Goody</Link>
            </div>
            {!accessToken && (
                <div className="gap-7 mr-6 flex justify-center items-center">
                    {LINKS.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className="flex text-gray-400 font-bold cursor-pointer hover:text-black"
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>
            )}
            {accessToken && (
                <div className="gap-7 mr-6 flex justify-center items-center">
                    <div>{data?.data?.name}님 반갑습니다.</div>
                    <button
                        className="cursor-pointer bg-gray-300 rounded-sm p-3 hover:scale-90"
                        onClick={handleLogout}
                    >
                        로그아웃
                    </button>
                </div>
            )}

        </nav>
    )
}

export default Navbar
