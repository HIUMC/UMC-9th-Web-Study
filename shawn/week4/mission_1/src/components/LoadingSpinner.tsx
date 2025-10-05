interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
}

export const LoadingSpinner = ({
  size = "md",
  message,
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "size-8",
    md: "size-12",
    lg: "size-16",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-t-transparent border-[#b2dab1]`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
      {message && (
        <p className="text-gray-600 text-sm animate-pulse">{message}</p>
      )}
    </div>
  );
};

// 에러 컴포넌트 추가
interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({
  message = "데이터를 불러오는 중 오류가 발생했습니다.",
  onRetry,
}: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div className="text-red-500 text-6xl">⚠️</div>
      <h3 className="text-xl font-semibold text-gray-800">
        오류가 발생했습니다
      </h3>
      <p className="text-gray-600 text-center max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
        >
          다시 시도
        </button>
      )}
    </div>
  );
};
