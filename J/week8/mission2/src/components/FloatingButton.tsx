import { useState } from "react";
import { PostingLpModal } from "./PostingLpModal";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const FloatingButton = () => {
  const [open, setOpen] = useState(false);
  const {accessToken} = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!accessToken) {
      alert("로그인이 필요한 기능입니다.");
      navigate("/login", { state: { from: location.pathname }, replace: true });
      return;
    }
    setOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
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

      {open && <PostingLpModal onClose={() => setOpen(false)} />}
    </>
  );
};
