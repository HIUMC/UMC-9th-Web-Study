import { useEffect } from "react";
import { useModalActions } from "../hooks/useModalStore";

const Modal = () => {
  const { close, confirmClear } = useModalActions();  

    useEffect(() => {
    document.body.style.overflow = "hidden";   // 스크롤 잠금

    return () => {
      document.body.style.overflow = "auto";   // 스크롤 다시 활성화
    };
  }, []);

  return (
    <div className="fixed inset-0  bg-black/40 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-[300px]">
        <h2 className="text-lg font-semibold mb-4">정말 삭제하시겠습니까?</h2>

        <div className="flex justify-between gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded cursor-pointer hover:bg-gray-400"
            onClick={close}          >
            아니요
          </button>

          {/* ✔ 네 = clearCart() + closeModal() */}
          <button
            className="px-4 py-2 bg-black text-white rounded cursor-pointer hover:bg-gray-600"
            onClick={confirmClear}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
