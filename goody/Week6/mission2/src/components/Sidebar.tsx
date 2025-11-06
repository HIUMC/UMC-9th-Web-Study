import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}


const Sidebar = ({isOpen, onClose}:SidebarProps) => {
  const { accessToken } = useAuth();

  return (
    <>
      <div
        className={`flex flex-col space-y-5 justify-between items-center w-[250px] bg-gray-200 transform transition-transform duration-300 ease-in-out fixed top-20 left-0 bottom-0 z-40
            ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* 닫기 */}
        <button
            onClick={onClose}
            className="cursor-pointer p-3 font-bold text-2xl "
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
              className="flex text-gray-400 font-bold cursor-pointer hover:text-black"
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
            <Link to="#" className="mt-auto">
              탈퇴하기
            </Link>
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
