import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";
import { FloatingButton } from "../components/FloatingButton";
import { useSidebar } from "../hooks/useSidebar";

const HomeLayout = () => {
  const { isOpen, toggle, close } = useSidebar();

  return (
    <div className="h-dvh flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50">
        <Navbar onToggleSidebar={toggle} />
      </nav>
      <div className="relative flex flex-1">
        <Sidebar isOpen={isOpen} onClose={close} />
        <main className="flex-1 mt-[60px]">
          <Outlet />
        </main>
        <div className="fixed right-10 bottom-20">
          <FloatingButton />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
