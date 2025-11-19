import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import FloatingButton from "../components/FloatingButton";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";
import { useSidebar } from "../hooks/useSidebar";

const HomeLayout = () => {
  const { isOpen, toggle, close } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { accessToken } = useAuth();

  return (
    // 전체 레이아웃 컨테이너
    <div className="bg-black min-h-dvh flex flex-col">
      {/* 네비게이션 바 */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <NavBar isSidebarOpen={isOpen} setIsSidebarOpen={toggle} />
      </nav>

      {/* 사이드바 + 메인 컨텐츠 영역 */}
      <div className="flex flex-1 pt-16">
        <Sidebar isOpen={isOpen} onClose={close} />
        <main
          className={`flex-1 flex justify-center items-center transition-all duration-300 ${isOpen ? "ml-64" : "ml-0"}`}
        >
          <Outlet />
        </main>
      </div>

      {/* 플로팅 버튼 */}
      <div className="fixed bottom-10 right-10 z-50">
        <FloatingButton onOpen={() => accessToken && setIsModalOpen(true)} />
      </div>

      {/* 모달 */}
      {accessToken && isModalOpen && <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default HomeLayout;
