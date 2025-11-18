import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Sidebar } from "../components/Sidebar"
import { useState } from "react"
import { FloatingButton } from "../components/FloatingButton"

const HomeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const closeSidebar = () => setSidebarOpen(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  return (
    <div className="h-dvh flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50">
        <Navbar onToggleSidebar={toggleSidebar}/>
      </nav>
      <div className="relative flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar}/>
        <main className="flex-1 mt-[60px] md:ml-[200px]">
          <Outlet />
        </main>
        <div className="fixed right-10 bottom-20">
          <FloatingButton/>
        </div>
        
      </div>
      <Footer />
    </div>
  )
}

export default HomeLayout