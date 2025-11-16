import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Sidebar from "../components/Sidebar"
import FloatingButton from "../components/FloatingButton"
import { useEffect, useState } from "react"

const HomeLayout = () => {
      // 사이드 바 열림/닫힘 상태 관리
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

    return (
        <div className="h-dvh flex flex-col">
        <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={toggleSidebar} />
        <div className="flex-1">
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar}/>
            <main className={`pt-20 transition-all duration-300 ease-in-out${isSidebarOpen ? 'pl-[250px]' : 'pl-0'}`}>
                <Outlet />
            </main>
        </div>
        
        <Footer/>
        </div>
    )
}

export default HomeLayout
