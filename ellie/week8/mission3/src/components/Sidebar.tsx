import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-70 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-900">
            <h2 className="text-2xl font-bold text-gray-900">돌려돌려 LP판</h2>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              <li>
                <a
                  href="#search"
                  className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover :bg-gray-100 transition-colors"
                >
                  <span>
                    <FaSearch />
                  </span>
                  <span className="ml-3 font-medium">찾기</span>
                </a>
              </li>
              <li>
                <a
                  href="#my"
                  className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover :bg-gray-100 transition-colors"
                >
                  <span>
                    <IoPersonCircleOutline />
                  </span>
                  <span className="ml-3 font-medium">마이페이지</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};

// fixed inset-0 => 화면 전체를 덮음
