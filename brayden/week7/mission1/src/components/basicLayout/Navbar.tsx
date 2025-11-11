import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import hamburgerIconSvg from "../../assets/hamburger-button.svg";
import { Search } from "lucide-react";
import type { ResponseMyInfoDto } from "../../types/auth";
import { useEffect, useState } from "react";
import { getMyInfo } from "../../apis/auth";

interface NavbarPropWs {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    const getData = async () => {
      const response = await getMyInfo();
      setData(response);
    };
    getData();
  }, [accessToken]);

  const handleLogout = async () => {
    await logout();
    navigate("/");  
  };

  return (
    <nav className="flex items-center justify-between bg-gray-900 text-pink-500 p-4 font-bold text-xl">
      {/* 왼쪽: 로고 */}
      <div className="flex">
        <button className="pr-2 cursor-pointer" onClick={toggleSidebar}>
          <img
            src={hamburgerIconSvg}
            alt="햄버거아이콘"
            width={30}
            height={40}
            className="invert"
          />
        </button>
        <Link to="/">돌려돌려LP판</Link>
      </div>

      {/* 오른쪽: 버튼 그룹 */}
      <div className="flex items-center space-x-4">
        <Link to="/search" className="text-white">
          <Search />
        </Link>
        {!accessToken ? (
          <>
            <Link
              to="/login"
              className="text-sm bg-black text-white px-3 py-1 rounded transition"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              className="text-sm bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700 transition"
            >
              회원가입
            </Link>
          </>
        ) : (
          <>
            <span className="text-sm bg-black text-white px-3 py-1 rounded transition">
              {data?.data.name}님 반갑습니다.
            </span>
            <button
              onClick={handleLogout}
              className="text-sm bg-black text-white px-3 py-1 rounded hover:bg-pink-600 transition"
            >
              로그아웃
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
