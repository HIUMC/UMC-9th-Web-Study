import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { openModal } from "../slices/modalSlice";
import DeleteModal from "./DeleteModal";

const PriceBox = () => {
  const { total } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleInitializeCart = () => {
    dispatch(openModal());
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
      {isOpen && <DeleteModal />}
    </div>
  );
};

export default PriceBox;
