import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";

export default function Navbar() {
  const { accessToken, logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) return;
    const fetchData = async () => {
      try {
        const response = await getMyInfo();
        setData(response);
      } catch (err) {
        console.error("getMyInfo 실패:", err);
      }
    };
    fetchData();
  }, [accessToken]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
      <div className="flex items-center justify-baseline gap-5 p-4">
        <Sidebar />
        <Link
          to="/"
          className="cursor-pointer text-2xl font-bold text-gray-900 dark:text-white"
        >
          돌려돌려 돌림판
        </Link>
      </div>
      {accessToken ? (
        <div className="space-x-6 mr-5 flex justify-center items-center">
          <div className="text-white">{data?.data.name}님 환영합니다</div>
          <button onClick={handleLogout} className="text-white">
            로그아웃
          </button>
        </div>
      ) : (
        <div className="space-x-6 mr-5">
          <Link
            to="/login"
            className="cursor-pointer text-base text-gray-900 dark:text-white"
          >
            로그인
          </Link>
          <Link
            to="/signup"
            className="cursor-pointer text-base text-gray-900 dark:text-white"
          >
            회원가입
          </Link>
        </div>
      )}
    </nav>
  );
}
