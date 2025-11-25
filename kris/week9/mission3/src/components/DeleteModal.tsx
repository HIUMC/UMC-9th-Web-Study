import { useCartActions } from "../hooks/useCartStore";
import { useModalActions, useModalInfo } from "../hooks/useModalStore";

const DeleteModal = () => {
  const { isOpen } = useModalInfo();
  const { clearCart } = useCartActions();
  const { closeModal } = useModalActions();

  const handleClearCart = () => {
    clearCart();
    closeModal();
  };

  const handleCloseModal = () => {
    closeModal();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 flex items-center justify-center z-30" />
      <div className="bg-white p-6 rounded-lg z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-semibold text-lg mb-4">
          정말 장바구니를 초기화하시겠습니까?
        </h2>
        <div className="flex flex-row justify-center gap-4">
          <button
            className="rounded-md bg-red-400 px-5 py-2 cursor-pointer"
            onClick={handleClearCart}
          >
            네
          </button>
          <button
            className="rounded-md bg-gray-300 px-5 py-2 cursor-pointer"
            onClick={handleCloseModal}
          >
            아니오
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
