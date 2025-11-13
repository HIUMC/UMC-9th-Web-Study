import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { FloatingButton } from "../components/FloatingButton";

const ProtectedLayout = () => {
  const {accessToken} = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const closeSidebar = () => setSidebarOpen(false);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  if(!accessToken) {
    alert("로그인이 필요한 서비스입니다. 로그인을 해주세요.")
    return <Navigate to={'/login'} replace state={{from: location}}/>
  }
  return (
    <div className="h-dvh flex flex-col">
      <nav>
        <Navbar onToggleSidebar={toggleSidebar}/>
      </nav>
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar}/>
        <main className="flex-1">
          <Outlet />
        </main>
        <div className="fixed right-10 bottom-20">
          <FloatingButton/>
        </div>
      </div>
      <Footer />
    </div>
  )
  
}

export default ProtectedLayout;