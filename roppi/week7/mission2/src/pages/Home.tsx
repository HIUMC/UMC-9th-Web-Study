import { useEffect, useRef, useState } from "react";
import { PAGINATION_ORDER } from "../enums/common";
// import { useGetLpList } from "../hooks/queries/useGetLpList";
import { useNavigate } from "react-router-dom";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LpcardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import LpCard from "../components/LpCard/LpCard";
import AddBtn from "../components/Home/AddBtn";
import OrderBtn from "../components/Home/OrderBtn";
import AddLpForm from "../components/Home/AddLpForm";

const Home = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [isModal, setIsModal] = useState(false);
  const [file, setFile] = useState<File | null>(null); 
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    data: lps,
    isFetching,
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteLpList(30, search, order as PAGINATION_ORDER);
  const nav = useNavigate();




  // ref, inView
  // ref : 특정한 HTML 요소를 감시할 수 있음
  // inView : 그 요소가 화면에 보이면 true
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, fetchNextPage, hasNextPage]);


  const handleNavLp = (id: number) => {
    nav(`/lps/${id}`)
  }

  if(isError){
    <div>에러 발생!</div>
  }


if (isPending) {
  return <div>로딩중...</div>;
}

const handleImageClick = () => {
    fileInputRef.current?.click();
  };

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <>
    <div className="w-[calc(100%-200px)] mx-[100px] text-white flex flex-col items-center justify-center"> 
     {/* 정렬 버튼 그룹 */}
     {/* <div className="w-full flex justify-end">
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
     </div> */}
     <OrderBtn order={order} setOrder={setOrder} />

       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
        {isPending && <LpcardSkeletonList count={20} /> }
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard  lp={lp}/>
          ))}
          {isFetching && !isPending && <LpcardSkeletonList count={12} />}
      </div>
      
      <div ref={ref} className="h-2" />
      <AddBtn setIsModal={setIsModal} />
    </div>
      {isModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        
        {/* 모달 박스 */}
        <div className="bg-[#28282a] text-black rounded-2xl shadow-lg w-90 p-10 relative flex flex-col justify-center items-center gap-7">
            
             <AddLpForm onClose={() => setIsModal(false)} />
        </div>
      </div>
    )}

    </>
  )
};
export default Home;