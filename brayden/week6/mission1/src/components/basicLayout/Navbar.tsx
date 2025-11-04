import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import hamburgerIconSvg from "../../assets/hamburger-button.svg";
import { Search } from "lucide-react";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const { accessToken } = useAuth();

  return (
    <nav className="flex items-center justify-between bg-gray-800 text-pink-500 p-4 font-bold text-xl">
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
              className="text-xs bg-black text-white px-3 py-1 rounded hover:bg-pink-600 transition"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              className="text-xs bg-black text-white px-3 py-1 rounded hover:bg-pink-600 transition"
            >
              회원가입
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/my"
              className="text-xs bg-black text-white px-3 py-1 rounded hover:bg-pink-600 transition"
            >
              My Page
            </Link>
            <Link
              to="/search"
              className="text-xs bg-black text-white px-3 py-1 rounded hover:bg-pink-600 transition"
            >
              검색
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
