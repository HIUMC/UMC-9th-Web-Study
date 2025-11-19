import { useEffect, useRef, useState } from "react";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LpcardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import LpCard from "../components/LpCard/LpCard";
import AddBtn from "../components/Home/AddBtn";
import OrderBtn from "../components/Home/OrderBtn";
import AddLpForm from "../components/Home/AddLpForm";
import useDebounce from "../hooks/useDebounce";
import useThrottle from "../hooks/useThrottle";
import { queryClient } from "../App";

const Home = () => {
  const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search, 500)
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [isModal, setIsModal] = useState(false);


  const {
    data: lps,
    isFetching,
    isPending,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteLpList(30, debounceValue, order as PAGINATION_ORDER);




  // ref, inView
  // ref : 특정한 HTML 요소를 감시할 수 있음
  // inView : 그 요소가 화면에 보이면 true
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const throttledInView = useThrottle(inView, 1000);

useEffect(() => {
  if (throttledInView && hasNextPage && !isFetching) {
    setTimeout(() => {
      fetchNextPage(); 
    }, 1000);
  }
}, [throttledInView]);


  // 검색어가 변경될 때마다 스크롤을 맨 위로 이동
  useEffect(() => {
  window.scrollTo(0, 0);
}, [debounceValue]);



  if(isError){
    <div>에러 발생!</div>
  }


if (isPending) {
  return <div>로딩중...</div>;
}


  return (
    <>
    <div className="w-[calc(100%-200px)] mx-[100px] text-white flex flex-col items-center justify-center"> 
      <div className="w-full flex justify-between mt-10 ">
        <input  className="bg-white pr-40 pl-5 rounded outline-[#e52582] text-[#e52582]"
        placeholder="search LP"
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        />
        <OrderBtn order={order} setOrder={setOrder} />
      </div>
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