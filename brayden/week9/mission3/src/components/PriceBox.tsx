import { useCartInfo } from "../hooks/useCartStore";
import { useModalAction } from "../hooks/useModalStore";

const PriceBox = () => {
  const { total } = useCartInfo();
  const { open } = useModalAction();

  const handleInitializeCart = () => {
    open();
  };
  return (
    <div className="p-12 flex justify-between">
      <button
        onClick={handleInitializeCart}
        className="border p-4 rounded-md cursor-pointer hover:bg-red-500 transition-all duration-200"
      >
        장바구니 초기화
      </button>
      <div>총 가격 : {total}원</div>
    </div>
  );
};

export default PriceBox;
