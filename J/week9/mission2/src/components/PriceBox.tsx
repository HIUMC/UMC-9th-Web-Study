import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { openModal } from "../slices/modalSlice";

export const PriceBox = () => {
    const { total } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(openModal());
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