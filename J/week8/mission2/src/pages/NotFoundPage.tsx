import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-gray-400 px-4">
      <h1 className="text-8xl font-extrabold mb-4">Not Found</h1>
      <h2 className="text-3xl font-bold mb-2">페이지를 찾을 수 없습니다</h2>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition-colors"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}
