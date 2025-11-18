import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect } from "react";
import Sidebar from "../components/SideBar";
import useSidebar from "../hooks/useSidebar";

const ProtectedLayout = () => {
  const {accessToken} = useAuth();
  const { isOpen, toggle, close } = useSidebar();
  
    // 화면 크기 변경 시 자동 닫힘
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 768) {
          close();
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
      <Header onToggleSidebar={toggle} />
      
      <Sidebar isOpen={isOpen} onClose={close} />

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default ProtectedLayout;