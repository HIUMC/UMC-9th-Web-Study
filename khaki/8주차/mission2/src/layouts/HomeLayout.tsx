import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import FloatingButton from "../components/FloatingButton";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";

const HomeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { accessToken } = useAuth();

  return (
    <div className="bg-black min-h-dvh flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50">
        <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </nav>

      <div className="flex flex-1 pt-16">
        <Sidebar isOpen={isSidebarOpen} />
        <main
          className={`flex-1 flex justify-center items-center transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <Outlet />
        </main>
      </div>

      {/* 플로팅 버튼 */}
      <FloatingButton onOpen={() => accessToken && setIsModalOpen(true)} />

      {/* 모달 */}
      {accessToken && isModalOpen && <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default HomeLayout;
