type DeleteAccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteAccountModal = ({ isOpen, onClose, onConfirm }: DeleteAccountModalProps) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#3A3A3C] p-6 rounded-lg w-full max-w-sm mx-4 relative z-50">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl font-light leading-none"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-8 text-white text-center">정말 탈퇴하시겠습니까?</h2>
        <div className="flex justify-center gap-3">
          <button
            onClick={onConfirm}
            className="px-8 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            예
          </button>
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
