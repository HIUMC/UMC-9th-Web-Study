import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlices";
import { openModal } from "../slices/modalSlices";


const PriceBox = () => {
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // const { isOpen } = useSelector((state) => state.modal);

  return (
    <div className="p-12 flex justify-between items-center">
      <button
        onClick={() => dispatch(openModal())}
        className="border p-4 rounded-md cursor-pointer hover:bg-gray-100"
      >
        장바구니 초기화
      </button>
      <div>총 가격: {total}원</div>
    </div>
  );
};

export default PriceBox;