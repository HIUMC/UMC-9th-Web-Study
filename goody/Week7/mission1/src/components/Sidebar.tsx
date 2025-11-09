import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import useDeleteUsers from "../hooks/mutations/useDeleteUsers";
import { Modal } from "./Modal";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}


const Sidebar = ({isOpen, onClose}:SidebarProps) => {
  const { accessToken } = useAuth();

  const [isDeleteUserOpen,setIsDeleteUserOpen] = useState(false);

  const {mutate : deleteUserMutate} = useDeleteUsers();

  const handleDeleteUser = () => {
    deleteUserMutate();

  }

  return (
    <>
      <div
        className={`flex flex-col space-y-5 justify-between items-center w-[250px] bg-gray-200 transform transition-transform duration-300 ease-in-out fixed top-20 left-0 bottom-0 z-40
            ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* 닫기 */}
        <button
            onClick={onClose}
            className="cursor-pointer p-3 font-bold text-2xl text-gray-400 hover:text-black"
            >
            닫기
        </button>
        {!accessToken && (
          <>
            <Link
              to="/login"
              className="flex text-gray-400 font-bold cursor-pointer hover:text-black"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              className="flex p-10 text-gray-400 font-bold cursor-pointer hover:text-black"
            >
              회원가입
            </Link>
          </>
        )}
        {accessToken && (
          <>
            <Link
              to="/search"
              className="flex text-gray-400 font-bold cursor-pointer hover:text-black"
            >
              찾기
            </Link>
            <Link
              to="/my"
              className="flex text-gray-400 font-bold cursor-pointer hover:text-black"
            >
              마이 페이지
            </Link>
            <button className="mt-auto text-gray-400 font-bold cursor-pointer hover:text-black p-10" onClick={() => setIsDeleteUserOpen(true)}>
              탈퇴하기
            </button>
            <Modal isOpen={isDeleteUserOpen} onClose={() => setIsDeleteUserOpen(false)}>
              <div className="flex flex-col gap-5 p-4 justify-center items-center">
              <h3 className="font-bold text-center text-xl">정말 탈퇴 하시겠습니까?</h3>
              <div className="flex gap-5 w-full">
                <button 
                  onClick={handleDeleteUser}
                  className="flex-1 border-2 border-fuchsia-50 rounded-2xl cursor-pointer font-semibold"
                >
                  예
                </button>
                <button 
                  onClick={() => setIsDeleteUserOpen(false)}
                  className="flex-1 border-2 border-fuchsia-50 rounded-2xl cursor-pointer font-semibold"
                >
                  아니오
                </button>
              </div>
              </div>
            </Modal>
          </>
        )}
        </div>
        {/* 사이드바 외 영역 클릭시 닫기 함수 실행 */}
        {isOpen && (
        <div 
          className="fixed inset-0 opacity-50 z-30 " 
          onClick={onClose} 
        />
      )}
    </>
  );
};

export default Sidebar;
