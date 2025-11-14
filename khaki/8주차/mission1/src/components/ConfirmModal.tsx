import useDeleteMyAccount from "../hooks/mutations/useDeleteMyAccount";

interface ConfirmModalProps {
  isOpen: boolean;
  onCancel: () => void;
}

const ConfirmModal = ({ isOpen, onCancel }: ConfirmModalProps) => {
  const { mutate } = useDeleteMyAccount();

  const onConfirm = () => {
    mutate();
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onCancel}>
      <div className="bg-neutral-800 rounded-lg p-6 w-80" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-white text-lg font-semibold">확인</h3>
        <p className="text-gray-300 mt-3">정말 탈퇴하시겠습니까</p>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 bg-neutral-600 text-white rounded hover:bg-neutral-500">
            아니오
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 disabled:opacity-60"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
