interface ActionButtonsProps {
  onGoHome: () => void;
  onLogout: () => void;
}

export default function ActionButtons({
  onGoHome,
  onLogout,
}: ActionButtonsProps) {
  return (
    <div className="flex space-x-4">
      <button
        onClick={onGoHome}
        className="flex-1 bg-[#2a2a2a] text-gray-300 py-3 rounded-lg font-medium hover:bg-[#3a3a3a] transition-colors"
      >
        홈으로
      </button>
      <button
        onClick={onLogout}
        className="flex-1 bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
      >
        로그아웃
      </button>
    </div>
  );
}
