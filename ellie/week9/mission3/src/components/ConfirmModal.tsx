import { useDispatch } from "react-redux";
import { closeModal } from "../slices/modalSlice";
import { useCartActions } from "../hooks/useCartStore";

const ConfirmModal = () => {
  const dispatch = useDispatch();
  const { clearCart } = useCartActions();

  const handleConfirm = () => {
    clearCart();
    dispatch(closeModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-black text-white w-80 h-50 flex flex-col justify-center items-center rounded-md">
        <p className="text-lg font-semibold">정말 삭제하시겠습니까?</p>
        <div className="flex gap-8 mt-10 text-black">
          <button
            className="bg-white w-20 h-8 rounded-md font-semibold cursor-pointer"
            onClick={handleCloseModal}
          >
            아니오
          </button>
          <button
            className="bg-white w-20 h-8 rounded-md font-semibold cursor-pointer"
            onClick={handleConfirm}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
