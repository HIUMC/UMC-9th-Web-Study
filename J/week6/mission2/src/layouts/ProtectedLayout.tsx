import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Footer } from "../components/Footer";
import { SideBar } from "../components/SideBar";
import { useSidebar } from "../context/SideBarContext";
import { useEffect } from "react";
import { FloatingButton } from "../components/FloatingButton";

export const ProtectedLayout = () => {
    const {accessToken, logout, userName} = useAuth();
    const { isSidebarOpen, toggleSidebar, closeSidebar, isMobile } = useSidebar();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!accessToken) {
            alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
            navigate("/login", { state: { from: location.pathname }, replace: true });
        }
    }, [ navigate, location]);
    
    return (<div className="flex flex-col min-h-screen  bg-black text-white">
        <nav className="fixed top-0 w-full bg-neutral-900 text-2xl font-bold p-4 flex justify-between items-center z-50">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 bg-neutral-800 text-white rounded-md hover:bg-neutral-700 transition"
                        aria-label="사이드바 열기"
                    >
                    <svg
                        width="28"
                        height="28"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                        className={"transition-transform duration-300"}
                        >
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="4"
                            d="M7.95 11.95h32m-32 12h32m-32 12h32"
                        />
                        </svg>
                    </button>
                    <Link to="/" className="text-pink-500">
                        돌려돌려 LP판
                    </Link>
                </div>
                <div className="flex flex-center space-x-4">
                    <div className="text-lg">
                        <span className="text-gray-400 dark:text-gray-300 text-xl">{userName}</span>
                        님 환영합니다
                    </div>
                    <button 
                        onClick={async() => {
                            await logout();
                            window.location.href="/";
                        }} 
                        className="p-2 text-xs rounded cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        로그아웃
                    </button>
                </div>
            </nav>
            {isMobile && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30"
                    onClick={closeSidebar}
                />
            )}
            <div className="flex flex-1 relative">
                <SideBar />
                <main
                    className={`flex-1 p-8 overflow-y-auto transition-all duration-300 ${
                    isSidebarOpen && !isMobile ? "ml-60" : "ml-0"
                    }`}
                >
                    <Outlet />
                    <FloatingButton/>
                </main>
            </div>
            <Footer/>
    </div>
    );
};