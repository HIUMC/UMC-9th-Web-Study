import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { type CartState } from "../slices/cartSlice";
import { openModal } from "../slices/modalSlice";

export const PriceBox = () => {
  const { total } = useSelector((state): CartState => state.cart);
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    // 모달 열기 액션 디스패치
    dispatch(openModal());
    console.log({ isOpen });
  };

  return (
    <div className="p-8 flex justify-between items-center border-t-2 border-gray-300 w-full">
      <button onClick={handleOpenModal} className="border p-4 rounded-md cursor-pointer">
        장바구니 초기화
      </button>
      <div>총 가격: {total}원</div>
    </div>
  );
};
