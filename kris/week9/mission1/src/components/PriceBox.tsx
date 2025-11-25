import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";

const PriceBox = () => {
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleInitializeCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="p-12 flex justify-between">
      <button
        className="border p-4 rounded-md cursor-pointer"
        onClick={handleInitializeCart}
      >
        초기화
      </button>
      <div className="p-12 flex justify-end">총 가격: {total}원</div>
    </div>
  );
};

export default PriceBox;
