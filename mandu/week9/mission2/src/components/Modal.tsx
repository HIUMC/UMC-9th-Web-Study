import { useDispatch } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";
import { isClose } from "../slices/modalSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const handleInitialState = () => {
    dispatch(clearCart());
    dispatch(isClose());
  };
  const handleClose = () => {
    dispatch(isClose());
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-50 rounded-2xl p-10"
      >
        <p className="font-bold p-4">정말 삭제하시겠습니까?</p>
        <div className="flex justify-between gap-2">
          <button
            className="p-3 bg-gray-300 rounded-md cursor-pointer"
            onClick={handleClose}
          >
            아니요
          </button>
          <button
            className="px-5  bg-red-600 text-white rounded-md cursor-pointer"
            onClick={handleInitialState}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
