// src/components/navbar.tsx
import { NavLink } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const Navbar = () => {
  const { getItem, removeItem } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken
  );
  const accessToken = getItem();

  const handleLogout = () => {
    removeItem();
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
            <button onClick={handleLogout} className="hover:underline">
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
