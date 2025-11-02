import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import FloatingButton from "../components/FloatingButton";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!accessToken) {
    return <Navigate to={"/login"} state={{ location }} replace />;
  }

  return (
    <div className="bg-black min-h-dvh flex flex-col">
      <nav>
        <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </nav>

      <div className="flex flex-1">
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

export default ProtectedLayout;
