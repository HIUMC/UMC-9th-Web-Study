import { createPortal } from "react-dom";
import { useDeleteUser } from "../hooks/mutations/useDeleteUser";

interface WithdrawalModalProps {
  onClose: () => void;
}

export const WithdrawalModal = ({ onClose }: WithdrawalModalProps) => {
    const deleteUserMutation = useDeleteUser();

    const handleDelete =() => {
        deleteUserMutation.mutate();
    }

    return createPortal(
        <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50" onClick={onClose}>
            <div
                className="relative flex flex-col items-center justify-center bg-neutral-800 rounded-2xl shadow-2xl gap-6 p-6 w-[500px] h-[300px] text-gray-200"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-500 hover:text-gray-600 transition-colors"
                >
                    ✕
                </button>

                <h2 className="text-xl mb-4">정말 탈퇴하시겠습니까?</h2>
                <div className="flex flex-row justify-between gap-10">
                    <button
                        onClick={handleDelete}
                        disabled={deleteUserMutation.isPending}
                        className="w-[100px] py-2 bg-gray-300 text-black hover:bg-gray-200 rounded-md cursor-pointer"
                    >
                        예
                    </button>
                    <button
                        onClick={onClose}
                        className="w-[100px] py-2 bg-pink-600 hover:bg-pink-700 rounded-md cursor-pointer"
                    >
                        아니오
                    </button>
                </div>  
            </div>    
        </div>,
        document.body
    );
};
