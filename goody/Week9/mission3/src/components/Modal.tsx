import { useCartActions } from "../hooks/useCartStore";
import { useModalActions, useModalInfo } from "../hooks/useModalStore";

const Modal = () => {
    const { clearCart } = useCartActions();
    const isOpen = useModalInfo();
    const { closeModal } = useModalActions();

    const handleDeleteAll = () => {
        clearCart();
        closeModal();
    }
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-70 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} 
        onClick={() => closeModal()}>
            <div 
                className={`fixed w-60 bg-white shadow-xl rounded-sm transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? "translate-y-0" : "-translate-y-full"}`}
                onClick={(e) => e.stopPropagation()}
                >
                <div className="flex flex-col gap-3">
                    <span className="flex items-center justify-center text-gray-800 font-bold text-xl p-2 mt-2">정말 삭제하시겠습니까?</span>
                    <div className="flex justify-end gap-3 py-3 px-6">
                        <button 
                            className="border border-red-600 bg-red-600 px-3 py-2 rounded-md text-white cursor-pointer"
                            onClick={handleDeleteAll}
                            >네</button>
                        <button 
                            className="border bg-gray-300 px-3 py-2 rounded-md text-gray-600 cursor-pointer"
                            onClick={() => closeModal()}
                            >아니오</button>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Modal
