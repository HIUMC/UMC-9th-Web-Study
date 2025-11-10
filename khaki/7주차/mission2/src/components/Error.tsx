interface ErrorProps {
  message?: string;
}

export const Error = ({ message = "오류가 발생했습니다." }: ErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
      <div className="text-6xl mb-4">❌</div>
      <h2 className="text-xl font-bold text-red-400 mb-2">오류</h2>
      <p className="text-gray-300 text-center">{message}</p>
    </div>
  );
};
