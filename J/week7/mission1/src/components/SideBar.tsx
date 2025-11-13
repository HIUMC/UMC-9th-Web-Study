import { Link, useNavigate } from "react-router-dom";
import { useSidebar } from "../context/SideBarContext";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { WithdrawalModal } from "./WithdrawalModal";

export const SideBar = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState<boolean>(false);

  const handleClick = () => {
    if(!accessToken) {
      alert("탈퇴하려면 로그인을 해주세요");
      navigate("/login", { state: { from: location.pathname }, replace: true });
      return;
    }
    setIsWithdrawalModalOpen(true);
  };

  return (
    <aside
      className={`fixed left-0 top-[72px] h-full bg-neutral-900/90 text-white flex flex-col p-4 space-y-3 transition-transform duration-300 ease-in-out z-30
        ${isSidebarOpen ? "translate-x-0 w-60" : "-translate-x-full w-60"}`}
    >
      <Link to="/" className="hover:bg-gray-700 p-2 rounded">홈</Link>
      <Link to="/my" className="hover:bg-gray-700 p-2 rounded">마이페이지</Link>
      <button
        onClick={handleClick}
        disabled={!accessToken}
        className="absolute bottom-25 left-4 right-4 text-base text-gray-400 hover:text-gray-300 px-3 py-2 rounded transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        탈퇴하기
      </button>
      {isWithdrawalModalOpen && <WithdrawalModal onClose={() => setIsWithdrawalModalOpen(false)} />}
    </aside>
  );
};
