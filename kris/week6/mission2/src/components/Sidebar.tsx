import { Search, User } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

type SidebarProps = {
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar = ({isOpen, onClose}: SidebarProps) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-30 transition-opacity md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <aside className={`fixed transition-transform duration-200 md:relative flex flex-col md:translate-x-0 md:justify-between bg-[#222222] text-white w-[200px] h-full z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} aria-hidden={!isOpen}>
        <div>
          <Link to="/search" onClick={onClose} className="flex flex-row my-3 px-5 py-3">
            <Search/>
            <p className="ml-3">찾기</p>
          </Link>
          <Link to="/my" onClick={onClose} className="flex flex-row my-3 px-5 py-3">
            <User/>
            <p className="ml-3">마이페이지</p>
          </Link>
        </div>
        <div className="text-center">
          <p className="text-gray-400 mb-3 text-sm">탈퇴하기</p>
        </div>
      </aside>
    </>
    
  )
}