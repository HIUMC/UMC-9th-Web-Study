import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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

  return (
    <div
      className={`
      fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-gray-800 z-50 transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      <div className="flex flex-col mt-8 space-y-6 px-4">
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
    </div>
  );
};
export default Sidebar;
