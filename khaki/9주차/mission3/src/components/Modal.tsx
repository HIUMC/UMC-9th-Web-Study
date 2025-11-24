import { useCartActions } from "../hooks/useCartStore";
import { useModalActions, useModalInfo } from "../hooks/useModal";

const Modal = () => {
  const { clearCart } = useCartActions();
  const { isOpen } = useModalInfo();
  const { closeModal } = useModalActions();

  const handleInitializeCart = () => {
    // 장바구니 초기화 로직 추가 예정
    clearCart();
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      {/* absolute는 flex레이아웃의 영향을 받지 않고 화면 전체를 차지한다. */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal}></div>
      {/* 모달 콘텐츠 */}
      {/* relative는 flex레이아웃의 영향을 받고 z-index를 적용하기 위해 필요 */}
      <div className="relative z-10 bg-white rounded-xl shadow-lg p-6 min-w-[280px] text-center">
        <h2 className="text-xl font-semibold mb-4">장바구니를 초기화하시겠습니까?</h2>
        <div className="flex items-center justify-center">
          <button
            onClick={handleInitializeCart}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mr-1"
          >
            네
          </button>
          <button
            onClick={closeModal}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-1"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
