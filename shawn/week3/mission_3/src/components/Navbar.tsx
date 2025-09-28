// src/components/Navbar.tsx
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-pink-100 to-green-100 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-gray-700">🎬 MovieDB</div>
          <div className="flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-pink-300 text-white"
                    : "text-gray-600 hover:text-gray-800 hover:bg-pink-200"
                }`
              }
            >
              홈
            </NavLink>
            <NavLink
              to="/movies/popular"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-pink-300 text-white"
                    : "text-gray-600 hover:text-gray-800 hover:bg-pink-200"
                }`
              }
            >
              인기 영화
            </NavLink>
            <NavLink
              to="/movies/now-playing"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-pink-300 text-white"
                    : "text-gray-600 hover:text-gray-800 hover:bg-pink-200"
                }`
              }
            >
              상영 중
            </NavLink>
            <NavLink
              to="/movies/top-rated"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-green-300 text-white"
                    : "text-gray-600 hover:text-gray-800 hover:bg-green-200"
                }`
              }
            >
              평점 높은
            </NavLink>
            <NavLink
              to="/movies/upcoming"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-green-300 text-white"
                    : "text-gray-600 hover:text-gray-800 hover:bg-green-200"
                }`
              }
            >
              개봉 예정
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
