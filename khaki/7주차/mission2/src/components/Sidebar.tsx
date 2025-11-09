import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ConfirmModal from "./ConfirmModal";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const handleMyPageClick = (e: React.MouseEvent) => {
    if (!accessToken) {
      e.preventDefault();
      alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
      navigate("/login");
    }
  };

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const openConfirm = () => setIsConfirmOpen(true);
  const closeConfirm = () => setIsConfirmOpen(false);

  return (
    <div
      className={`
      fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-gray-800 z-50 transform transition-transform duration-300 ease-in-out flex flex-col
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      <div className="relative flex flex-col mt-8 space-y-6 px-4 flex-1 overflow-auto">
        {/* 검색 */}
        <NavLink
          key="/search"
          to="/search"
          className={({ isActive }) => (isActive ? "text-[#b2dab1] font-bold" : "text-white hover:text-[#b2dab1]")}
        >
          검색
        </NavLink>
        {/* 마이페이지 - 항상 표시, 로그인 체크 */}
        <NavLink
          key="/my"
          to="/my"
          onClick={handleMyPageClick}
          className={({ isActive }) => (isActive ? "text-[#b2dab1] font-bold" : "text-white hover:text-[#b2dab1]")}
        >
          마이페이지
        </NavLink>
      </div>

      <div className="px-4 py-4 flex justify-center">
        <button className="text-white w-full hover:text-[#b2dab1]" onClick={openConfirm}>
          탈퇴하기
        </button>
      </div>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onCancel={closeConfirm}
      />
    </div>
  );
};
export default Sidebar;
