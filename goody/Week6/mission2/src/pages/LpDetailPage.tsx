import { useNavigate, useParams } from "react-router-dom"
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { LoadingSpinner } from "../components/LoadingSpinner";

const LpDetailPage = () => {
    
    const {lpid} = useParams<{lpid : string}>();

    const {data, isPending, isError} = useGetLpDetail(lpid || "")

    const navigate = useNavigate();

    if(isPending){
        return (
            <div className="flex items-center justify-center">
                <LoadingSpinner />
            </div>
        )
    }

    if(isError){
        return (
            <div className="flex items-center justify-center">상세 데이터를 불러올 수 없습니다.</div>
        )
    }

    return (
        <div className="mt-20 mx-auto h-screenjustify-center items-center border-gray-500 border-2 p-4 rounded-large shadow-lg bg-lime-200 w-[70%] max-h-[100vh]">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                    <h1>{typeof data.data.author === 'string' ? data.data.author : ((data.data.author as any).name ?? JSON.stringify(data.data.author))}</h1>
                    <p>{new Date(data.data.updatedAt).toLocaleDateString()}</p>
                </div>
                <div className="flex justify-between items-center">
                    <h1 className="text-xl">{data.data.title}</h1>
                    <div className="flex gap-5 mr-5">
                        <button className="cursor-pointer">✏️</button>
                        <button className="cursor-pointer">🗑️</button>
                        <button 
                            className="cursor-pointer"
                            onClick={() => navigate(`/lp/${data.data.id}/comments`)}>💬</button>
                    </div>
                </div>
                <img src ={data.data.thumbnail} alt={data.data.title} className="aspect-square w-1/2 mx-auto object-cover rounded-2xl " />
                <h2 className="flex justify-center items-center">{data.data.content}</h2>
                <div className="flex justify-center items-center">
                    {data.data.tags.map((tag) => (
                        <span key={tag.id} className="p-2 bg-gray-400 text-black rounded-md">#{tag.name}</span>
                    ))}
                </div>
                <p className="flex justify-center items-center">♡{data.data.likes.length}</p>

            </div>
        </div>
    )
}

export default LpDetailPage
