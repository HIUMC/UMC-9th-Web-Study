import { useModalAction, useModalInfo } from "../hooks/useModalStore";
import { useCartAction } from "../hooks/useCartStore";

const Modal = () => {
  const isOpen = useModalInfo();
  const { close } = useModalAction();
  const { clearCart } = useCartAction();
  const handleNoButton = () => {
    close();
  };

  const handleYesButton = () => {
    clearCart();
    close();
  };

  if (!isOpen) return null;
  return (
    // Todo : Modal 뒷 배경
    <div
      className="fixed inset-0 z-50 flex h-full w-full cursor-default 
    items-center justify-center bg-gray-300/50 backdrop-blur-lg"
    >
      {/* 모달 프레임 */}
      <section className="relative bg-white p-5 flex gap-4 flex-col z-100">
        <h1 className="text-black font-bold">정말 삭제하시겠습니까?</h1>

        <div className="flex justify-between">
          <button
            onClick={handleNoButton}
            className="rounded-sm bg-gray-300 text-black w-15 h-10 cursor-pointer"
          >
            아니오
          </button>
          <button
            onClick={handleYesButton}
            className="rounded-sm bg-red-600 text-white w-15 h-10 cursor-pointer"
          >
            네
          </button>
        </div>
      </section>
    </div>
  );
};

export default Modal;
