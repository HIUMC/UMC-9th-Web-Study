import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import FloatingButton from "../components/FloatingButton";
import Modal from "../components/Modal";
import { useSidebar } from "../hooks/useSidebar";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const { isOpen, toggle, close } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!accessToken) {
    return <Navigate to={"/login"} state={{ location }} replace />;
  }

  return (
    <div className="bg-black min-h-dvh flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50">
        <NavBar isSidebarOpen={isOpen} setIsSidebarOpen={toggle} />
      </nav>

      <div className="flex flex-1 pt-16">
        {/* NavBar 높이만큼 상단 패딩 추가 */}
        <Sidebar isOpen={isOpen} onClose={close} />
        <main
          className={`flex-1 flex justify-center items-center transition-all duration-300 ${isOpen ? "ml-64" : "ml-0"}`}
        >
          <Outlet />
        </main>
      </div>

      {/* 플로팅 버튼 */}
      <FloatingButton onOpen={() => setIsModalOpen(true)} />

      {/* 모달 */}
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default ProtectedLayout;
