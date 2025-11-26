import { useCartInfo } from "../hooks/useCartStore";
import { useModalActions } from "../hooks/useModalStore";

export const PriceBox = () => {
    const { total } = useCartInfo();
    const { openModal } = useModalActions();

    const handleOpenModal = () => {
        openModal();
    };

    return (
        <div className="p-12 flex justify-between">
            <button
                onClick={handleOpenModal}
                className="border p-4 rounded-md cursor-pointer"
            >
                전체 삭제
            </button>
            <div>총 가격: {total}원</div>
        </div>
    )
}