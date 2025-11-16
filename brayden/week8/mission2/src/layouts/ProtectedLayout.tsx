import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/basicLayout/Navbar";
import Footer from "../components/basicLayout/Footer";
import FloatingButton from "../components/basicLayout/FloatingButton";
import { useEffect, useState } from "react";
import Sidebar from "../components/basicLayout/Sidebar";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);

  // ✅ 반응형 감지
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsOpen(false);
      else setIsOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ 로그인되지 않은 경우
  if (!accessToken) {
    alert("로그인이 필요한 서비스입니다! 로그인을 해주세요!");
    return <Navigate to={"/login"} replace />;
  }

  return (
    <div className="h-dvh flex flex-col">
      {/* ✅ Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* ✅ 콘텐츠 영역 */}
      <div className="flex flex-row flex-1 transition-all duration-300 bg-black">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ${
            isOpen ? "w-[15%]" : "w-0"
          }`}
        >
          <Sidebar isOpen={isOpen} onClose={closeSidebar} isMobile={isMobile} />
        </div>

        {/* ✅ Main */}
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

export default ProtectedLayout;
