import { useDispatch, useSelector } from "../hooks/useCustomRedux"
import { clearCart } from "../slices/cartSlice";
import { closeModal } from "../slices/modalSlice";

const Modal = () => {
    const {isOpen} = useSelector((state) => state.modal)
    const dispatch = useDispatch(); 

    const handleDeleteAll = () => {
        dispatch(clearCart());
        dispatch(closeModal());
    }
  return (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-70 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} 
        onClick={() => dispatch(closeModal())}>
            <div className={`fixed top-1/2 left-1/2 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? "translate-y-0" : "-translate-y-full"}`}>
                <div className="flex flex-col gap-4">
                    <span className="text-gray-800 font-bold text-2xl p-4">정말 삭제하시겠습니까?</span>
                    <div className="flex justify-end gap-3 p-2">
                        <button 
                            className="border bg-red-600 text-white cursor-pointer"
                            onClick={handleDeleteAll}
                            >네</button>
                        <button 
                            className="border bg-gray-300 text-gray-600 cursor-pointer"
                            onClick={() => dispatch(closeModal())}
                            >아니오</button>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Modal
