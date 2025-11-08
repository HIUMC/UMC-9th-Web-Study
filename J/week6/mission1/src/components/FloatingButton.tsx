import { useNavigate } from "react-router-dom";

export const FloatingButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="
        fixed bottom-6 right-6
        w-14 h-14
        rounded-full
        bg-pink-600 text-white text-3xl font-bold
        flex items-center justify-center
        shadow-lg hover:bg-pink-700
        transition-all duration-200
      "
    >
      +
    </button>
  );
};
