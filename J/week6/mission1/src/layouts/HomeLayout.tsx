import { Link, Outlet } from "react-router-dom"
import { Footer } from "../components/Footer"
import { SideBar } from "../components/SideBar"
import { useSidebar } from "../context/SideBarContext";

export const HomeLayout = () => {
    const { isSidebarOpen, toggleSidebar, closeSidebar, isMobile } = useSidebar();

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <nav className="fixed top-0 w-full bg-neutral-900 text-2xl font-bold p-4 flex justify-between items-center z-50">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 bg-neutral-800 text-white rounded-md hover:bg-neutral-700 transition"
                    >
                    <svg
                        width="28"
                        height="28"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                        className={"transition-transform duration-300"}
                        >
                        <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="4"
                            d="M7.95 11.95h32m-32 12h32m-32 12h32"
                        />
                        </svg>
                    </button>
                    <Link to="/" className="text-pink-500">
                        돌려돌려 LP판
                    </Link>
                </div>
                <div className="space-x-4">
                    <Link 
                        to="/login" 
                        className="p-2 text-xs rounded cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        로그인
                    </Link>
                    <Link 
                        to="/signup" 
                        className="bg-pink-500 p-2 text-xs rounded cursor-pointer hover:bg-pink-600 transition-colors"
                    >
                        회원가입
                    </Link>
                </div>
            </nav>
            {isMobile && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30"
                    onClick={closeSidebar}
                />
            )}
            <div className="flex flex-1 relative">
                <SideBar/>
                <main
                    className={`flex-1 p-8 overflow-y-auto transition-all duration-300 ${
                    isSidebarOpen && !isMobile ? "ml-60" : "ml-0"
                    }`}
                >
                    <Outlet />
                </main>
            </div>
            <Footer/>
        </div>
    )
}