import { useNavigate, useParams } from "react-router-dom"
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useState } from "react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import { Heart } from 'lucide-react'
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import { Modal } from "../components/Modal";
import CommentPage from "./CommentPage";

const LpDetailPage = () => {
    
    const {lpid} = useParams(); // lpid : string(params는 string으로 가져옴)

    const {data:lp, isPending, isError} = useGetLpDetail({lpid:Number(lpid)})

    const [CommentOpen,setCommentOpen] = useState(false);

    const {accessToken} = useAuth();

    const {data:me} = useGetMyInfo(accessToken);
    // mutate : 비동기 요청을 실행하고 콜백 함수를 이용해서 후속 작업 처리
    // mutateAsync : Promise를 반환해서 await 사용 가능
    const {mutate : likeMutate} = usePostLike();
    const {mutate : dislikeMutate} = useDeleteLike();


    // const isLiked = lp?.data.likes.map((like) => like.userId).includes(me?.data.id as number); // 바로 반영이 안됨 => mutation!
    const isLiked = lp?.data.likes.some((like) => like.userId === me?.data.id); // some : 배열안에 주어진 함수를 하나라도 통과하는지 테스트, 좀 더 빠름

    const navigate = useNavigate();

    const handleCommits = () => {
        setCommentOpen(true);
    }

    const handleLikeLp = () => {
        likeMutate({lpid:Number(lpid)})
    }

    const handleDisLikeLp = () => {
        dislikeMutate({lpid:Number(lpid)})
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
            <div className="flex items-center justify-center">상세 데이터를 불러올 수 없습니다.</div>
        )
    }

    

    
    
    return (
        <div className="mt-20 mx-auto h-screenjustify-center items-center border-gray-500 border-2 p-4 rounded-large shadow-lg bg-lime-200 w-[70%] max-h-[100vh]">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                    <h1>{typeof lp?.data.author === 'string' ? lp.data.author : ((lp.data.author).name ?? JSON.stringify(lp.data.author))}</h1>
                    <p>{new Date(lp.data.updatedAt).toLocaleDateString()}</p>
                </div>
                <div className="flex justify-between items-center">
                    <h1 className="text-xl">{lp.data.title}</h1>
                    <div className="flex gap-5 mr-5">
                        <button className="cursor-pointer">✏️</button>
                        <button className="cursor-pointer">🗑️</button>
                        <button 
                            className={"cursor-pointer"}
                            onClick={handleCommits}>💬</button>
                    </div>
                </div>
                <img src ={lp.data.thumbnail} alt={lp.data.title} className="aspect-square w-1/2 mx-auto object-cover rounded-2xl " />
                <h2 className="flex justify-center items-center">{lp.data.content}</h2>
                <div className="flex justify-center items-center">
                    {lp.data.tags.map((tag) => (
                        <span key={tag.id} className="p-2 bg-gray-400 text-black rounded-md">#{tag.name}</span>
                    ))}
                </div>
                <button onClick={isLiked ? handleDisLikeLp : handleLikeLp} className="flex justify-center items-center">
                    <Heart color={isLiked ? "red" : "black"} fill={isLiked ? "red" : "transparent"}/>
                    {lp.data.likes.length}
                </button>
                

            </div>
            <Modal isOpen={CommentOpen} onClose={() => setCommentOpen(false)}>
                <CommentPage />
            </Modal>
        </div>
    )
}

export default LpDetailPage
