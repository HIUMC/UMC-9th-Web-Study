import { useSelector } from "../hooks/useCustomRedux";
import { useModalInfo } from "../hooks/useModalStore";
import DeleteAllButton from "./ClearButton";
import ConfirmModal from "./ConfirmModal";

const PriceBox = () => {
  const { total } = useSelector((state) => state.cart);
  const { isOpen } = useModalInfo();
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
