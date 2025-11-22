import { useDispatch } from "react-redux";
import { openModal } from "../slices/modalSlice";

const DeleteAllButton = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button
        onClick={() => dispatch(openModal())}
        className="border p-4 rounded-md cursor-pointer"
      >
        장바구니 초기화
      </button>
    </div>
  );
};

export default DeleteAllButton;
