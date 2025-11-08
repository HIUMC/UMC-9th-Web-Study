import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import CommentCard from "../components/Comment/CommentCard";
import CommentSkeletonList from "../components/Comment/CommentSkeletonList";
import { useParams } from "react-router-dom";
import useGetInfiniteComment from "../hooks/queries/useGetInfiniteComment";
import type { PaginationDto } from "../types/common";


const CommentPage = () => {
    const { lpid } = useParams();
    const [order,setOrder] = useState<PaginationDto["order"]>("desc")

    const numericLpId = lpid ? Number(lpid) : undefined;
    const {
        data: comments,
        isLoading: commentsLoading,
        isFetching: commentsFetching,
        hasNextPage: commentsHasNextPage,
        fetchNextPage: commentsFetchNextPage,
    } = useGetInfiniteComment(numericLpId, 10, order);

    
    
    const {ref, inView} = useInView({
        threshold:0, // 화면에 노출되는 정도
    })

    useEffect(() => {
            if(inView){
                !commentsFetching && commentsHasNextPage && commentsFetchNextPage()
            }
        },[inView,commentsFetching,commentsFetchNextPage])


    return (
        <div className="relative bg-gray-700 w-70% h-full rounded-lg flex flex-col justify-center items-center">
            <div className="flex justify-between items-center w-[60%] mb-5">
                <h2 className="text-white font-bold">댓글</h2>
                <div className="flex justify-end pt-4 mr-10">
                    <button 
                        className={`px-4 py-2 bg-gray-300 text-black rounded-lg cursor-pointer ${order === "asc" ? "bg-white text-black" : "bg-black text-white"}`}
                        onClick={()=>setOrder("asc")}>오래된 순</button>
                    <button 
                        className={`px-4 py-2 bg-gray-300 text-black rounded-lg cursor-pointer ${order === "desc" ? "bg-white text-black" : "bg-black text-white"}`}
                        onClick={()=>setOrder("desc")}>최신 순</button>
                </div>
            </div>
            <div className="w-[60%] mb-6 flex gap-3">
                <input
                    type="text"
                    placeholder="댓글을 작성해주세요..."
                    className=" flex-1 px-4 py-3 bg-neutral-700 text-white rounded-lg border border-neutral-600 focus:border-white focus:outline-none"
                />
                <button className="px-6 py-3 bg-neutral-600 text-white rounded-lg hover:bg-neutral-500 transition-colors duration-200">
                    작성
                </button>
            </div>
            <div>
                <div className="w-full h-96 overflow-y-auto">
                    {commentsLoading && <CommentSkeletonList count={10}/> }
                    {comments && (
                    <div>

                    {comments.pages
                        .map((page) => page.data.data)
                        .flat()
                        .map((comment) => (
                        console.log(comment),
                        <CommentCard key={comment.id} id={comment.id} content={comment.content} author={comment.author} />
                        ))}

                    {/* 다음 페이지 로딩 중일 때 스켈레톤 표시 */}
                    {commentsFetching && <CommentSkeletonList count={3} />}
                    <div ref={ref} className="h-2"></div>
                    </div>
                )}
                </div>
                
            </div>
            
        </div>
    )
}

export default CommentPage
