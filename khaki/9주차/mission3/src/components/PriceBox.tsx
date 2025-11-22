import { useCartInfo } from "../hooks/useCartStore";
import { useModalActions } from "../hooks/useModal";

export const PriceBox = () => {
  const { total } = useCartInfo();
  const { openModal } = useModalActions();

  return (
    <div className="p-8 flex justify-between items-center border-t-2 border-gray-300 w-full">
      <button onClick={openModal} className="border p-4 rounded-md cursor-pointer">
        장바구니 초기화
      </button>
      <div>총 가격: {total}원</div>
    </div>
  );
};
