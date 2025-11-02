import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isDetailPage = location.pathname.startsWith("/lp/");

  const toggleBurger = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="h-dvh flex flex-col">
        <Navbar onMenuClick={toggleBurger} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          <main className="flex-1 bg-gray-950 h-dvh text-white">
            <Outlet />
          </main>
        </div>
        {!isDetailPage && <Footer />}
      </div>
    </>
  );
};

export default RootLayout;
