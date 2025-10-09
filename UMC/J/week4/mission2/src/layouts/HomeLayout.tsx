import { Outlet } from "react-router-dom"

export const HomeLayout = () => {
    return (
        <div className="h-dvh flex flex-col bg-black text-white">
            <nav>네이게이션 바 입니다.</nav>
            <main className="flex-1">
                <Outlet/>
            </main>
            <footer>푸터</footer>
        </div>
    )
}