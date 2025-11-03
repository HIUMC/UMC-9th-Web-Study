import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";

const ProtectedLayout = () => {
  const {accessToken} = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    // 화면 크기 변경 시 자동 닫힘
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 768) {
          setIsSidebarOpen(false);
        }
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  if(!accessToken){
    return <Navigate to={"/login"} replace />;
  } 
  return(
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      <Header onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default ProtectedLayout;