// src/components/navbar.tsx
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex flex-row bg-gray-900 justify-between gap-4 p-4 text-white">
      <NavLink to="/" className="place-content-center">
        홈
      </NavLink>
      <div className="flex flex-row gap-4 p-4 place-content-center">
        <NavLink to="/login">로그인</NavLink>
        <NavLink to="/signup">회원가입</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
