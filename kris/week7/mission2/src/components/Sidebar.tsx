import { Search, User, X } from "lucide-react"
import { useState } from "react";
import { Link } from "react-router-dom"
import useDeleteUser from "../hooks/mutations/useDeleteUser";
import { useAuth } from "../context/AuthContext";

type SidebarProps = {
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar = ({isOpen, onClose}: SidebarProps) => {
  const [isUserDeleteModalOpen, setIsUserDeleteModalOpen] = useState(false);

  const {mutate: deleteUser} = useDeleteUser();

  const {logout} = useAuth();

  const handleOpenDeleteUserModal = () => {
    setIsUserDeleteModalOpen(true);
  }

  const handleDeleteUser = () => {
    deleteUser();
    logout();
  }

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
        <div className="text-center cursor-pointer" onClick={handleOpenDeleteUserModal}>
          <p className="text-gray-400 mb-3 text-sm">탈퇴하기</p>
        </div>
        
      </aside>
      {isUserDeleteModalOpen && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-[#555555] p-6 rounded-md w-[400px] h-[250px]">
              <div className="flex flex-row justify-end mb-10">
                <X className="scale-85 cursor-pointer" color="white" onClick={() => setIsUserDeleteModalOpen(false)}/>
              </div>
              <div className="flex flex-row justify-center my-5">
                <h2 className="text-lg mb-4 text-white">정말 탈퇴하시겠습니까?</h2>
              </div>
              <div className="flex justify-center space-x-6">
                <button className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer w-[100px]" onClick={handleDeleteUser}>예</button>
                <button className="px-4 py-2 bg-[#FF1E9D] text-white rounded-md cursor-pointer w-[100px]" onClick={() => setIsUserDeleteModalOpen(false)}>아니오</button>
              </div>
            </div>
          </div>
        )}
    </>
    
  )
}