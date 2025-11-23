import { useCartInfo } from "../hooks/useCartStore";
import { useModalActions } from "../hooks/useModalStore";

const PriceBox = () => {
  const { total } = useCartInfo();
  const { openModal } = useModalActions();


  const handleOpenModal = () => {
    openModal();
  }

  return (
    <div className="p-12 flex justify-between">
      <button className="border p-4 roudned-md cursor-pointer" onClick={handleOpenModal}>전체 삭제</button>
      <div>총 가격 : {total}원</div>
    </div>
  )
}

export default PriceBox
