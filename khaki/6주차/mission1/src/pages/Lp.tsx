import { useParams } from "react-router-dom";
import useGetLp from "../hooks/queries/useGetLp";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Error } from "../components/Error";

export const Lp = () => {
  const { lpId } = useParams();
  const { data, isLoading, isError } = useGetLp({ id: Number(lpId) });

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Error message="LP 정보를 불러올 수 없습니다." />
      </div>
    );
  }

  const lp = data?.data;

  return (
    <div className="p-20">
      <div className="bg-neutral-800 p-8 rounded-lg max-w-4xl mx-auto">
        {/* 제목과 버튼 */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-white text-3xl font-bold">{lp?.title}</h1>
          <div className="flex gap-1">
            <button className="px-3 py-2 text-white rounded hover:bg-neutral-700 transition-colors">✏️</button>
            <button className="px-3 py-2 text-white rounded hover:bg-neutral-700 transition-colors">🗑️</button>
          </div>
        </div>

        {/* 썸네일 */}
        <img src={lp?.thumbnail} alt={lp?.title} className="w-64 h-64 object-cover rounded-lg mb-6 mx-auto" />

        {/* 업로드일 */}
        <p className="text-gray-300 mb-4">
          업로드일: {lp?.createdAt ? new Date(lp.createdAt).toLocaleDateString() : ""}
        </p>

        {/* 좋아요 */}
        <p className="text-gray-300 mb-6">좋아요: {lp?.likes?.length}개</p>

        {/* 본문 */}
        <div className="text-gray-200 leading-relaxed">
          <h3 className="text-lg font-semibold mb-3">본문</h3>
          <p>{lp?.content}</p>
        </div>
      </div>
    </div>
  );
};
