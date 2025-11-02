import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { X } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const { accessToken } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768 && open) {
        setOpen(false);
      }
      if (window.innerWidth > 768 && !open) {
        setOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  return (
    <>
      <button
        className="p-2 rounded-md cursor-pointer text-white "
        onClick={() => setOpen(true)}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="4"
            d="M7.95 11.95h32m-32 12h32m-32 12h32"
          />
        </svg>
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 z-50
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            메뉴
          </h2>
          <button onClick={() => setOpen(false)}>
            <X className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-3">
          {accessToken && (
            <Link
              to="/my"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              onClick={() => setOpen(false)}
            >
              마이페이지
            </Link>
          )}

          <Link
            to="/search"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
            onClick={() => setOpen(false)}
          >
            검색
          </Link>
        </nav>
      </div>

      {/* 외부영역 클릭하면 사이드바 닫히게 */}
      {open && <div className="fixed inset-0" onClick={() => setOpen(false)} />}
    </>
  );
}
