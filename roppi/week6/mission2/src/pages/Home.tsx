import { useState } from "react";
import { PAGINATION_ORDER } from "../enums/common";
import { useGetLpList } from "../hooks/queries/useGetLpList";
import { timeAgo } from "../utils/timeAgo";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [order, setOrder] = useState(PAGINATION_ORDER.DESC);
  const { data, isError, isLoading, refetch } = useGetLpList({ cursor: 0, search: "", order: order, limit: 12 });

  const nav = useNavigate();

  console.log(data)
  const handleNavLp = (id: number) => {
    nav(`/lps/${id}`)
  }

  if(isError){
    <div>에러 발생!</div>
  }


if (isLoading) {
  return <div>로딩중...</div>;
}

  return (
    <div className="w-[calc(100%-200px)] mx-[100px] text-white flex flex-col items-center justify-center"> 
     {/* 정렬 버튼 그룹 */}
     <div className="w-full flex justify-end">
      <div className="flex w-40 mt-5 rounded border border-gray-50 border-[0.2px] overflow-hidden">
        <button
          onClick={() => setOrder(PAGINATION_ORDER.DESC)}
          className={`w-20 px-3 py-1 cursor-pointer ${
            order === PAGINATION_ORDER.DESC
              ? "text-black bg-white font-bold"
              : "bg-black text-gray-300"
          }`}
        >
          최신순
        </button>
        <div className="h-[32px]"></div>
        <button
          onClick={() => setOrder(PAGINATION_ORDER.ASC)}
          className={`w-20 px-3 py-1  cursor-pointer ${
            order === PAGINATION_ORDER.ASC
              ? "text-black bg-white font-bold"
              : "bg-black text-gray-300"
          }`}
        >
          오래된순
        </button>
      </div>
     </div>

          {/* 리스트 출력 */}
      <div className="mt-5 w-[calc(100%-40px)] max-w-5xl grid grid-cols-3 gap-2 mx-[20px]">
        {data?.map((lp) => (
          <div key={lp.id} className="relative w-full aspect-square group hover:z-10"
          onClick={() => handleNavLp(lp.id)}
          >
            {/* 이미지 */}
            <img
              className="w-full h-full object-cover rounded transition-transform duration-300 group-hover:scale-110 group-hover:brightness-55 "
              src={lp.thumbnail}
              alt={lp.title}
            />

            {/* 오버레이 */}
            <div className="absolute inset-0  bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded flex flex-col justify-end items-start gap-5 p-2">
              <h3 className="text-white font-bold text-sm mb-1">{lp.title}</h3>
              <p className="text-gray-300 text-xs">{timeAgo(lp.createdAt)}</p>
              <div className="text-white absolute right-0 "> 
              <span>♥︎</span>
              <span> {lp.likes.length}</span>                
              </div>
            </div>
        </div>
          ))}
      </div>


      <button
      type="button"
      aria-label="추가"
      className="fixed bottom-20 right-10 bg-[#e52582] w-8 h-8 rounded-full text-white flex items-center justify-center shadow-md hover:brightness-90 active:scale-95 transition cursor-pointer"
    >
      +
    </button>
      </div>
  )
};
export default Home;