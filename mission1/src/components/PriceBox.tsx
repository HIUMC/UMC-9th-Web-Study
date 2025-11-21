import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";

const PriceBox = () => {
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleInitializeCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="p-10 flex justify-end">
      <div className="border-b-2 border-gray-300">
        <div>
          <button
            onClick={handleInitializeCart}
            className="border p-4 rounded-md cursor-pointer"
          >
            장바구니 초기화
          </button>
        </div>
        <p className="text-lg font-semibold">Total : {total} 원</p>
      </div>
    </div>
  );
};

export default PriceBox;
