import { Outlet } from "react-router-dom";
import Footer from "../components/basicLayout/Footer";
import Navbar from "../components/basicLayout/Navbar";
import FloatingButton from "../components/FloatingButton";
import Sidebar from "../components/basicLayout/Sidebar";
import { useState } from "react";

const HomeLayout = () => {
  const [isClosed, setIsClosed] = useState(false); // 기본값: 열림 (false)

  const toggleSidebar = () => {
    setIsClosed((prev) => !prev);
  };

  return (
    <div className="h-dvh flex flex-col">
      {/* ✅ Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* ✅ 콘텐츠 영역 (가로 배치) */}
      <div className="flex flex-row flex-1 transition-all duration-300 bg-black">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ${
            isClosed ? "w-0" : "w-[15%]"
          }`}
        >
          <Sidebar isClosed={isClosed} />
        </div>

        {/* Main */}
        <main className="flex-1 overflow-y-auto pl-9">
          <Outlet />
          <FloatingButton />
        </main>
      </div>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
};

export default HomeLayout;
