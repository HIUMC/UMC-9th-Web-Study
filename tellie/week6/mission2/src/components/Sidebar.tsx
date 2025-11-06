import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`fixed inset-0 z-40 lg:hidden ${open ? "" : "hidden"}`}
        onClick={onClose} // 바깥 클릭 시 닫힌다.
        aria-hidden="true"
      />

      <aside
        className={`fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64
                    bg-zinc-950 border-r border-white/10 p-4
                    transition-transform duration-200 ease-out text-white
                    ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <nav className="flex h-full flex-col justify-between text-sm">
            <div className="space-y-1">
                <button
                    onClick={() => {
                        onClose();
                        navigate("/search");
                    }}
                    className="block w-full text-left text-white/90 rounded-lg px-3 py-2 hover:bg-white/5 hover:text-white"
                >
                    찾기
                </button>
                <button
                    onClick={() => {
                        onClose();
                        navigate(accessToken ? "/my" : "/login");
                    }}
                    className="block w-full text-left text-white/90 rounded-lg px-3 py-2 hover:bg-white/5 hover:text-white"
                >
                    마이페이지
                </button>
            </div>
            <div className="pt-3 border-t border-white/10">
                <button
                    onClick={() => {
                        onClose();
                        navigate("/");
                    }}
                    className="block w-full text-left text-white/90 rounded-lg px-3 py-2 hover:bg-white/5 hover:text-white"
                >
                    탈퇴하기
                </button>
            </div>
        </nav>
      </aside>
    </>
  );
}
export default Sidebar;
