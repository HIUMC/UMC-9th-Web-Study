import { createContext, useContext, useState, useEffect, type ReactNode,  } from "react";

interface SidebarContextProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  isMobile: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    let wasMobile = window.innerWidth < 1024;

    const handleResize = () => {
      const nowMobile = window.innerWidth < 1024;
      setIsMobile(nowMobile);

      if (!wasMobile && nowMobile) {
        setIsSidebarOpen(false);
      }

      if (wasMobile && !nowMobile) {
        setIsSidebarOpen(true);
      }

      wasMobile = nowMobile;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => {
    if (isMobile) setIsSidebarOpen(false);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar, openSidebar, closeSidebar, isMobile }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within SidebarProvider");
  return context;
};
