import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import FloatButton from "../components/FloatButton"

const HomeLayout = () => {
  return (
    <div className = 'h-dvh flex flex-col'>
        <Navbar />
        <main className="flex-1 mt-10">
            <Outlet />
        </main>
        <Footer />
        <FloatButton />
    </div>
  )
}

export default HomeLayout
