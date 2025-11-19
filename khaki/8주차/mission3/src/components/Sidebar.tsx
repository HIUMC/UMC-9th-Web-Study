import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ConfirmModal from "./ConfirmModal";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  // 마이페이지 클릭 핸들러
  const handleMyPageClick = (e: React.MouseEvent) => {
    if (!accessToken) {
      e.preventDefault();
      alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
      navigate("/login");
    }
  };

  // 탈퇴하기 확인 모달 상태 관리
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const openConfirm = () => setIsConfirmOpen(true);
  const closeConfirm = () => setIsConfirmOpen(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    // 배경 오버레이
    // - 사이드바 열림: 투명도 100%, 오버레이가 기존화면을 덮어 클릭 불가,
    // - 사이드바 닫힘: 투명도 0, 포인터 이벤트 비활성화하여 오버레이를 클릭 불가, 기존화면 클릭 가능
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-30 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      {/* 사이드바 컨테이너 */}
      <aside
        className={`
        fixed top-16 left-0 h-[calc(100dvh-4rem)] w-64 bg-gray-800 z-50 transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full"} border border-gray-700`}
      >
        <div className="relative flex flex-col mt-8 space-y-6 px-4 flex-1 overflow-auto">
          {/* 홈 */}
          <NavLink
            key="/"
            to="/"
            className={({ isActive }) => (isActive ? "text-[#b2dab1] font-bold" : "text-white hover:text-[#b2dab1]")}
          >
            홈
          </NavLink>
          {/* 마이페이지*/}
          <NavLink
            key="/my"
            to="/my"
            onClick={handleMyPageClick}
            className={({ isActive }) => (isActive ? "text-[#b2dab1] font-bold" : "text-white hover:text-[#b2dab1]")}
          >
            마이페이지
          </NavLink>
        </div>

        <div className="px-auto py-10 flex justify-center">
          <button className="text-white w-full hover:text-[#b2dab1]" onClick={openConfirm}>
            탈퇴하기
          </button>
        </div>
      </aside>

      {/* 탈퇴하기 확인 모달 */}
      <div>
        <ConfirmModal isOpen={isConfirmOpen} onCancel={closeConfirm} />
      </div>
    </div>
  );
};
export default Sidebar;
