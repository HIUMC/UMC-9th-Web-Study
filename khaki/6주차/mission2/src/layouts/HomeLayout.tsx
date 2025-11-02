import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import FloatingButton from "../components/FloatingButton";

const HomeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // 공통 레이아웃을 배치하는 방법
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
      <FloatingButton />
    </div>
  );
};

export default HomeLayout;
