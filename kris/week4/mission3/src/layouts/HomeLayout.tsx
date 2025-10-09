import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col">
      <nav>
        <Navbar/>
      </nav>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-black text-white">footer</footer>
    </div>
  )
}

export default HomeLayout