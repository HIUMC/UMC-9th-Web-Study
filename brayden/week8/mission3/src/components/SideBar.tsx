import { PersonStanding, Search } from "lucide-react";
import { useEffect } from "react";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBar = ({ isOpen, onClose }: SideBarProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      // 사이드바가 열렸을 때 브라우저 body의 overflow를 hidden으로 바꿈
      // 즉, 요소가 화면을 넘어가더라도 스크롤바 생성 X, 넘친 부분을 보이지 않게 함.
      document.body.style.overflow = "hidden";
    } else {
      // 사이드바가 닫혔을 때 브라우저 body의 overflow를 unset으로 바꿈
      // 즉, overflow를 초기값으로 되돌리기 = initial(visible)
      document.body.style.overflow = "unset";
    }

    return () => {
      // 메모리 누수 방지를 위한 이벤트 삭제
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm
    transition-opacity duration-300 z-50 ${
      isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
    >
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl
            transform transition-transform duration-300 ease-in-out z-40 
            ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        role="dialog"
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">돌려돌려 LP판</h2>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              <li>
                <a
                  href="#search"
                  className="flex flex-col gap-5 px-4 py-3 text-gray-700
              rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="ml-3 font-medium flex">
                    <Search />
                    찾기
                  </span>
                  <span className="ml-3 font-medium flex">
                    <PersonStanding />
                    마이페이지
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
