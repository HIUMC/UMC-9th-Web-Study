import { useModalActions } from "../hooks/useModalStore";

const DeleteAllButton = () => {
  const { openModal } = useModalActions();

  return (
    <div>
      <button
        onClick={() => openModal()}
        className="border p-4 rounded-md cursor-pointer"
      >
        장바구니 초기화
      </button>
    </div>
  );
};

export default DeleteAllButton;
