// src/components/navbar.tsx
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { accessToken, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <nav className="flex flex-row bg-gray-900 justify-between gap-4 p-4 text-white">
      <NavLink to="/" className="place-content-center">
        홈
      </NavLink>
      <div className="flex flex-row gap-4 p-4 place-content-center">
        {accessToken ? (
          <>
            <NavLink to="/mypage">내정보</NavLink>
            <button onClick={() => logout()} className="hover:underline">
              로그아웃
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">로그인</NavLink>
            <NavLink to="/signup">회원가입</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
