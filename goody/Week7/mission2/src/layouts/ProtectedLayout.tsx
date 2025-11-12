import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const ProtectedLayout = () => {
    const {accessToken} = useAuth();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    }
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
            const handleResize = () => {
                // 데스크탑 크기(768px) 이상이 되면 사이드바를 열고,
                if (window.innerWidth >= 768) {
                    setIsSidebarOpen(true);
                } 
                // 모바일 크기가 되면 사이드바를 닫습니다.
                else {
                    setIsSidebarOpen(false);
                }
            };
    
            // resize 이벤트 리스너 등록
            window.addEventListener('resize', handleResize);
            
            // 컴포넌트가 사라질 때 리스너 제거 (메모리 누수 방지)
            return () => window.removeEventListener('resize', handleResize);
        }, [isSidebarOpen]); 

    // 로그인 해야만 mypage접근 가능
    if(!accessToken){
        alert("로그인이 필요한 서비스 입니다. 로그인을 해주세요!");
        return <Navigate to ={"/login"} state={{ from: location.pathname }} replace /> // replace : 뒤로가기 히스토리가 안남음
    }

    return (
        <div className="h-dvh flex flex-col">
        <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={toggleSidebar} />
        <main className="flex-1 mt-10">
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar}/>
            <Outlet />
        </main>
        <Footer/>
        </div>
    )
};

export default ProtectedLayout
