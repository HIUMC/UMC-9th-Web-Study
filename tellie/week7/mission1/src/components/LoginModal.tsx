type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const LoginModal = ({ isOpen, onClose, onConfirm }: LoginModalProps) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#1C1C1E] p-6 rounded-lg w-full max-w-sm mx-4 relative z-50">
        <h2 className="text-xl font-bold mb-4 text-white">로그인이 필요한 서비스입니다.</h2>
        <p className="text-gray-300 mb-6">로그인을 해주세요!</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;