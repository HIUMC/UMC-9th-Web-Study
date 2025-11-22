import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { clearCart, type CartState } from "../slices/cartSlice";

export const PriceBox = () => {
  const { total } = useSelector((state): CartState => state.cart);
  const dispatch = useDispatch();

  const handleInitializeCart = () => {
    // 장바구니 초기화 액션 디스패치
    dispatch(clearCart());
  };

  return (
    <div className="p-8 flex justify-between items-center border-t-2 border-gray-300 w-full">
      <button onClick={handleInitializeCart} className="border p-4 rounded-md cursor-pointer">
        장바구니 초기화
      </button>
      <div>총 가격: {total}원</div>
    </div>
  );
};
