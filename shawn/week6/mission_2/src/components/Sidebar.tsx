import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: "/search",
      label: "찾기",
      icon: "🔍",
    },
    {
      path: "/my",
      label: "마이페이지",
      icon: "👤",
    },
  ];

  return (
    <aside className="w-48 bg-black border-r border-[#2a2a2a] h-screen sticky top-0 flex flex-col">
      <nav className="flex-1 pt-8">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 text-gray-300 hover:text-white hover:bg-[#1a1a1a] transition-colors ${
                  location.pathname === item.path
                    ? "text-white bg-[#1a1a1a] border-l-4 border-pink-500"
                    : ""
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
