import { useCartInfo } from "../hooks/useCartStore";
import { useModalActions, useModalInfo } from "../hooks/useModalStore";
import DeleteModal from "./DeleteModal";

const PriceBox = () => {
  const { isOpen } = useModalInfo();
  const { openModal } = useModalActions();

  const { total } = useCartInfo();

  const handleInitializeCart = () => {
    openModal();
  };

  return (
    <div className="mx-6 p-2 flex justify-between items-center">
      <button
        className="border p-4 rounded-md cursor-pointer h-12 flex items-center justify-center"
        onClick={handleInitializeCart}
      >
        초기화
      </button>
      <div className="p-12 flex justify-end">총 가격: {total}원</div>
      {isOpen && <DeleteModal />}
    </div>
  );
};

export default PriceBox;
