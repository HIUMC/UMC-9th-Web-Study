interface ErrorStateProps {
  error: string;
  onRetry: () => void;
  onGoHome: () => void;
}

export default function ErrorState({
  error,
  onRetry,
  onGoHome,
}: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center max-w-md mx-auto">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-white mb-2">
          오류가 발생했습니다
        </h2>
        <p className="text-gray-300 mb-6">{error}</p>
        <div className="flex space-x-3">
          <button
            onClick={onRetry}
            className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
          >
            다시 시도
          </button>
          <button
            onClick={onGoHome}
            className="bg-[#2a2a2a] text-gray-300 px-6 py-3 rounded-lg hover:bg-[#3a3a3a] transition-colors"
          >
            홈으로 이동
          </button>
        </div>
      </div>
    </div>
  );
}
