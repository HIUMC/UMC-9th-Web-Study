import { useSelector } from "../hooks/useCustomRedux";
import DeleteAllButton from "./ClearButton";
import ConfirmModal from "./ConfirmModal";

const PriceBox = () => {
  const { total } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);
  return (
    <div className="p-10 flex justify-end">
      <div className="border-b-2 border-gray-300">
        <DeleteAllButton />
        <p className="text-lg font-semibold">Total : {total} 원</p>
      </div>
      {isOpen && <ConfirmModal />}
    </div>
  );
};

export default PriceBox;
