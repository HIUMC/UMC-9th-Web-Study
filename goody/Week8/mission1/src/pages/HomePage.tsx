import { useEffect, useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import FloatingButton from "../components/FloatingButton";
import { Modal } from "../components/Modal";
import LpAdd from "../components/LpAdd";
import useDebounce from "../hooks/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay";

const HomePage = () => {

    
    const [search,setSearch] = useState("");
    // 디바운스
    const debouncedValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY);

    const [order,setOrder] = useState(PAGINATION_ORDER.desc)
    const [isLpAddOpen,setIsLpAddOpen] = useState(false);

    const {data:lps, isFetching, hasNextPage, isPending, fetchNextPage, isError} = useGetInfiniteLpList(10, debouncedValue, order);


    // ref, inView
    // ref : 특정한 HTML 요소를 감시
    // inView : 특정한 요소가 화면에 보이면 true
    const {ref, inView} = useInView({
        threshold:0, // 화면에 노출되는 정도
    })

    useEffect(() => {
        if(inView){
            !isFetching && hasNextPage && fetchNextPage()
        }
    },[inView,isFetching,fetchNextPage])


    if(isPending){
        return (
            <div className="flex items-center justify-center">
                <LoadingSpinner />
            </div>
        )
    }

    if(isError){
        return (
            <div className="flex items-center justify-center">목록을 불러올 수 없습니다.</div>
        )
    }
    return (
        <div className="container mx-auto bg-fuchsia-100 w-full">
            <input 
                className="border-2 border-amber-500 p-4 rounded-sm" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                placeholder="검색어를 입력하세요."
            />
            <div className="">
                <div className="flex justify-end pt-4 mr-10">
                    <button 
                        className={`px-4 py-2 bg-gray-300 text-black rounded-lg cursor-pointer ${order === PAGINATION_ORDER.asc ? "bg-white text-black" : "bg-black text-white"}`}
                        onClick={()=>setOrder(PAGINATION_ORDER.asc)}>오래된 순</button>
                    <button className={`px-4 py-2 bg-gray-300 text-black rounded-lg cursor-pointer ${order === PAGINATION_ORDER.desc ? "bg-white text-black" : "bg-black text-white"}`}
                        onClick={()=>setOrder(PAGINATION_ORDER.desc)}>최신 순</button>
                </div>
            </div>
            <div className="">
                <div className="p-10 grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {isFetching && <LpCardSkeletonList count={10}/>}
                    {lps.pages.map((page) => page.data.data)
                        ?.flat() // [[1,2],[3,4]] => [1,2,3,4] 
                        ?.map((lp)=> (
                            <LpCard key={lp.id} lp={lp} />
                        ))}
                    {isFetching && <LpCardSkeletonList count={10}/>}
                </div>
            </div>
            <div ref={ref} className="h-2"></div>
            <FloatingButton onClick={() => setIsLpAddOpen(true)}/>
            <Modal isOpen={isLpAddOpen} onClose={() => setIsLpAddOpen(false)}>
                <LpAdd isOpen={isLpAddOpen} onClose={()=> setIsLpAddOpen(false)}/>
            </Modal>
        </div>
        
    )
}

export default HomePage
