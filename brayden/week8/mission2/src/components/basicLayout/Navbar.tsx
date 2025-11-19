import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import hamburgerIconSvg from "../../assets/hamburger-button.svg";
import { Search, X as OffButton } from "lucide-react";
// 다른 이름으로 사용하고 싶을 때는 as 키워드 사용
import usePostLogout from "../../hooks/mutations/usePostLogout";
import useGetMyInfo from "../../hooks/queries/useGetMyInfo";

interface NavbarProps {
  toggleSidebar: () => void;
  isSearch: boolean;
  handleSearch: () => void;
}

const Navbar = ({ toggleSidebar, isSearch, handleSearch }: NavbarProps) => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const { mutate: logout } = usePostLogout();
  const { data: myData } = useGetMyInfo(accessToken);
  console.log("isSearch : ", isSearch);

  const handleLogout = async () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between bg-gray-900  p-4 font-bold text-xl">
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
        <Link to="/" className="text-pink-500">
          돌려돌려LP판
        </Link>
      </div>

      {/* 오른쪽: 버튼 그룹 */}
      <div className="flex items-center space-x-4">
        {!isSearch ? (
          <button onClick={handleSearch} className="cursor-pointer text-white">
            <Search />
          </button>
        ) : (
          <button onClick={handleSearch} className="cursor-pointer text-white">
            <OffButton />
          </button>
        )}

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
              {myData?.data.name}님 반갑습니다.
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
