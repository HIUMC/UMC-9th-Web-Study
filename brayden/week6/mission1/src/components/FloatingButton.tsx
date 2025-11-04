import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function FloatingButton() {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const handleClick = () => {
    if (accessToken) {
      navigate("/new-lp");
    } else {
      navigate("/login");
    }
  };

  return (
    <button
      className="
        fixed bottom-6 right-6
        bg-pink-600 hover:bg-pink-700
        text-white rounded-full
        w-14 h-14 flex items-center justify-center
        shadow-lg
        transition-all duration-300
      "
      onClick={handleClick}
    >
      <Plus size={25} />
    </button>
  );
}
