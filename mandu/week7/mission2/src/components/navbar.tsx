// src/components/navbar.tsx
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ResponseMyInfoDto } from "../types/auth";
import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { accessToken, logout } = useAuth();

  const [data, setData] = useState<ResponseMyInfoDto>([]);

  useEffect(() => {
    if (accessToken) {
      const getData = async () => {
        const response = await getMyInfo();
        console.log(response);

        setData(response);
      };
      getData();
    }
  }, [accessToken, data.data]);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="flex flex-row bg-gray-900 justify-between gap-4 p-4 z-21 text-white">
      <div className="flex justify-start gap-4">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer"
          onClick={onMenuClick}
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M7.95 11.95h32m-32 12h32m-32 12h32"
          />
        </svg>
        <NavLink to="/" className="place-content-center text-xl font-bold">
          SpinningSpinning Dolimpan
        </NavLink>
      </div>
      <div className="flex flex-row gap-4 p-4 place-content-center text-gray-900">
        {!accessToken && (
          <>
            <NavLink
              to="/login"
              className="text-gray-100 hover:text-blue-500 font-bold"
            >
              로그인
            </NavLink>
            <NavLink
              to="/signup"
              className="text-gray-100 hover:text-blue-500 font-bold"
            >
              회원가입
            </NavLink>
          </>
        )}
        {accessToken && (
          <>
            <NavLink
              to="/my"
              className="text-gray-100 hover:text-blue-500 font-bold"
            >
              {data.data?.name}님 반갑습니다.
            </NavLink>
            <button
              onClick={handleLogout}
              className="text-gray-100 hover:text-blue-500 font-bold"
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
