import { useDispatch, useSelector } from "../hooks/useCustomRedux"
import { clearCart } from "../slices/cartSlice";
import { openModal } from "../slices/modalSlice";

const PriceBox = () => {
  const { total } = useSelector((state) => state.cart)
  const dispatch = useDispatch();

  const handleResetCart = () => {
    dispatch(clearCart());
  }

  const handleOpenModal = () => {
    dispatch(openModal());
  }

  return (
    <div className="p-12 flex justify-between">
      <button className="border p-4 roudned-md cursor-pointer" onClick={handleOpenModal}>전체 삭제</button>
      <div>총 가격 : {total}원</div>
    </div>
  )
}

export default PriceBox
