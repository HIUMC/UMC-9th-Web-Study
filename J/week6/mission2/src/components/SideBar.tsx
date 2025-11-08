import { Link } from "react-router-dom";
import { useSidebar } from "../context/SideBarContext";

export const SideBar = () => {
  const { isSidebarOpen } = useSidebar();

  return (
    <aside
      className={`fixed left-0 top-[72px] h-full bg-neutral-900/90 text-white flex flex-col p-4 space-y-3 transition-transform duration-300 ease-in-out z-30
        ${isSidebarOpen ? "translate-x-0 w-60" : "-translate-x-full w-60"}`}
    >
      <Link to="/" className="hover:bg-gray-700 p-2 rounded">홈</Link>
      <Link to="/my" className="hover:bg-gray-700 p-2 rounded">프로필</Link>
    </aside>
  );
};
