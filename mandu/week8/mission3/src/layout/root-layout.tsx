import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useSidebar } from "../../../mission3/src/hooks/useSidebar";

const RootLayout = () => {
  const isDetailPage = location.pathname.startsWith("/lp/");

  const { isOpen, toggle, close } = useSidebar();

  return (
    <>
      <div className="h-dvh flex flex-col">
        <Navbar onMenuClick={toggle} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar isOpen={isOpen} onClose={close} />
          <main className="flex-1 bg-gray-950 text-white overflow-y-auto">
            <Outlet />
          </main>
        </div>
        {!isDetailPage && <Footer />}
      </div>
    </>
  );
};

export default RootLayout;
