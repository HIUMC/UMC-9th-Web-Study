import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList"
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PAGINATION_ORDER } from "../enums/common";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate();
    const [search,setSearch] = useState("");
    const [order,setOrder] = useState(PAGINATION_ORDER.desc)
    
    const {data:lps, isPending, isError} = useGetLpList({
        search,
        order,
        limit:50,
        sort:"createdAt",
    });

    const handleLpClick = (lpid : number) => {
        navigate(`/lp/${lpid}`);
    }

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
                    {lps?.map((lp) => (
                        <div 
                            key={lp.id}
                            onClick={() => handleLpClick(lp.id)}
                            className="relative cursor-pointer overflow-hidden group aspect-square w-44 rounded-2xl transition-transform duration-500 hover:scale-115"
                        >   
                            <img
                                src={lp.thumbnail}
                                alt={`${lp.title} 이미지`}
                                className="w-full h-full object-cover"
                                />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50  bg-opacity-70 text-white
                                flex flex-col items-center justify-center p-2
                                opacity-0 group-hover:opacity-100 grotransition-opacity duration-300">
                                <h3 className="text-md">{lp.title}</h3>
                                <p className="text-sm">{new Date(lp.updatedAt).toLocaleString()}</p>
                                <p className="">♡{lp.likes.length}</p>
                            </div>
                            

                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    )
}

export default HomePage
