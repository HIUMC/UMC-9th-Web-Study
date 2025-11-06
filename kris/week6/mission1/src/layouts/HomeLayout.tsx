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
      <nav>
        <Navbar onToggleSidebar={toggleSidebar}/>
      </nav>
      <div className="relative flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar}/>
        <main className="flex-1">
          <Outlet />
        </main>
        <div className="absolute right-3 bottom-3">
          <FloatingButton/>
        </div>
        
      </div>
      <Footer />
    </div>
  )
}

export default HomeLayout