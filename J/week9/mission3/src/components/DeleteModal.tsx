import { useEffect } from "react";
import { useCartActions } from "../hooks/useCartStore";
import { useModalActions, useModalInfo } from "../hooks/useModalStore";

export const DeleteModal = () => {
    const { clearCart } = useCartActions();
    const { isOpen } = useModalInfo();
    const { closeModal } = useModalActions();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.key === "Escape") {
                closeModal();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, []);


    const handleInitializeModal = () => {
        clearCart();
        closeModal();
    }

    const handleCloseModal = () => {
        closeModal();
    }

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 flex justify-center items-center bg-black/20 backdrop-blur-sm z-50"
                    onClick={handleCloseModal}
                >
                    <div
                        className="flex flex-col bg-white rounded-lg p-6 shadow-xl w-60 "
                        onClick={(e) => e.stopPropagation()}
                    >
                        <p className="flex justify-center mb-5 font-bold">정말 삭제하시겠습니까?</p>
                        <div className="flex flex-row justify-center gap-5">
                            <button
                                onClick={handleCloseModal}
                                className="bg-neutral-200 py-2 px-3 rounded-lg hover:bg-neutral-300 transition-colors cursor-pointer"
                            >
                                아니오
                            </button>
                            <button
                                onClick={handleInitializeModal}
                                className="text-white bg-red-500 py-2 px-3 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                            >
                                예
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}