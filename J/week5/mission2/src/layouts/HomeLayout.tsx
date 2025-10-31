import { Link, Outlet } from "react-router-dom"

export const HomeLayout = () => {
    return (
        <div className="h-dvh flex flex-col bg-black text-white">
            <nav className="bg-neutral-900 text-2xl font-bold p-4 flex justify-between items-center">
                <Link
                to="/"
                className="text-pink-500">
                    돌려돌려 LP판
                </Link>
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

            <main className="flex-1">
                <Outlet/>
            </main>
            <footer>푸터</footer>
        </div>
    )
}