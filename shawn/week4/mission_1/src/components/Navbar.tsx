import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/movies/popular", label: "Popular" },
  { to: "/movies/now_playing", label: "Now Playing" },
  { to: "/movies/top_rated", label: "Top Rated" },
  { to: "/movies/upcoming", label: "Upcoming" },
];
export default function Navbar() {
  return (
    <div className="flex justify-center items-center gap-3 p-4 mt-5">
      {LINKS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-bold" : "text-gray-500"
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
}
