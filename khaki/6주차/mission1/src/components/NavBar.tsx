import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";

interface NavBarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const NavBar = ({ isSidebarOpen, setIsSidebarOpen }: NavBarProps) => {
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();

  const { data } = useQuery<ResponseMyInfoDto>({
    queryKey: ["userInfo"],
    queryFn: getMyInfo,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    gcTime: 10 * 60 * 1000, // 10분간 메모리에 보관
    enabled: !!accessToken, // accessToken이 있을 때만 실행
  });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center w-full p-4">
      <div className="flex items-center gap-4">
        {/* 햄버거 버튼 */}
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white">
          ☰
        </button>

        <Link to="/" className="text-[#b2dab1] text-3xl font-bold">
          돌려돌려LP판
        </Link>
      </div>

      <>
        {!accessToken && (
          <div className="flex gap-6 mr-8">
            <NavLink
              key="/login"
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-[#b2dab1] font-bold"
                  : "text-gray-500 hover:text-[#b2dab1] transition-colors duration-200"
              }
            >
              로그인
            </NavLink>
            <NavLink
              key="/signup"
              to="/signup"
              className={({ isActive }) =>
                isActive
                  ? "text-[#b2dab1] font-bold"
                  : "text-gray-500 hover:text-[#b2dab1] transition-colors duration-200"
              }
            >
              회원가입
            </NavLink>
          </div>
        )}

        {accessToken && (
          <div className="flex items-center gap-6 mr-8">
            <span className="text-white">{data?.data?.name}님 반갑습니다</span>

            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-[#b2dab1] transition-colors duration-200"
            >
              로그아웃
            </button>
          </div>
        )}
      </>
    </div>
  );
};

export default NavBar;
