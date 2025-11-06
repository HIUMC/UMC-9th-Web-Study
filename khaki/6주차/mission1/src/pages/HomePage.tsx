import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetLpList from "../hooks/queries/useGetLpList";
import type { PaginationOrder } from "../types/common";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Error } from "../components/Error";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const [order, setOrder] = useState<PaginationOrder>("asc");
  const { data, isError, isPending } = useGetLpList({ order: order, limit: 25 });
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const handleLpClick = (id: number) => {
    if (!accessToken) {
      alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
      // 로그인 후 돌아올 페이지를 URL 매개변수로 전달
      // 쿼리 파라미터는 라우팅(목적지)에 영향이 없다.
      navigate(`/login?redirect=/lp/${id}`);
      return;
    }
    navigate(`/lp/${id}`);
  };

  // 로딩 상태일 때
  if (isPending) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // 에러 상태일 때
  if (isError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Error message="LP 목록을 불러올 수 없습니다." />
      </div>
    );
  }

  return (
    <>
      <div className="p-20">
        {/* 정렬 버튼*/}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setOrder("asc")}
            className={`px-4 py-2 text-base rounded-l-xl border border-white transition-colors duration-200 ${
              order === "asc" ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            오래된순
          </button>
          <button
            onClick={() => setOrder("desc")}
            className={`px-4 py-2 text-base rounded-r-xl border border-white border-l-0 transition-colors duration-200 ${
              order === "desc" ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            최신순
          </button>
        </div>

        {/* LP 그리드 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 min-h-[400px]">
          {data?.data.data.map((lp) => (
            // 각 LP 아이템 카드
            <div
              key={lp.id}
              className="group relative overflow-hidden aspect-square cursor-pointer"
              onClick={() => handleLpClick(lp.id)}
            >
              {/*썸네일 이미지*/}
              <img src={lp.thumbnail} alt={lp.title} className="w-full h-full object-cover" />

              {/*오버레이*/}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity flex items-end p-4">
                <div className="w-full">
                  <h3 className="text-white text-lg font-bold truncate mb-1">{lp.title}</h3>
                  <div className="flex justify-between items-center text-gray-300 text-sm">
                    <span>{new Date(lp.updatedAt).toLocaleDateString()}</span>
                    <span>❤️ {lp.likes.length}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div></div>
    </>
  );
};

export default HomePage;
