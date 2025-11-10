import { useEffect, useState, type MouseEvent } from "react";
import { useInView } from "react-intersection-observer";
import CommentCard from "../components/Comment/CommentCard";
import CommentSkeletonList from "../components/Comment/CommentSkeletonList";
import { useParams } from "react-router-dom";
import useGetInfiniteComment from "../hooks/queries/useGetInfiniteComment";
import type { PaginationDto } from "../types/common";
import usePostComment from "../hooks/mutations/usePostComment";
import type { RequestCommentDto } from "../types/comment";
import usePatchComment from "../hooks/mutations/usePatchComment";


const CommentPage = () => {
    const { lpid } = useParams();
    const [order,setOrder] = useState<PaginationDto["order"]>("desc")

    const numbericLpId = lpid ? Number(lpid) : undefined;
    const {
        data: comments,
        isLoading: commentsLoading,
        isFetching: commentsFetching,
        hasNextPage: commentsHasNextPage,
        fetchNextPage: commentsFetchNextPage,
    } = useGetInfiniteComment(numbericLpId, 10, order);

    const {ref, inView} = useInView({
        threshold:0, // 화면에 노출되는 정도
    })

    useEffect(() => {
            if(inView){
                !commentsFetching && commentsHasNextPage && commentsFetchNextPage()
            }
        },[inView,commentsFetching,commentsFetchNextPage])

    // 댓글 입력 관련 
    const [commentText,setCommentText] = useState('');
    const {mutate : AddCommentMutate} = usePostComment(Number(lpid))

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommentText(e.target.value);
    };

    const handleSubmit = () => {
        // 값이 비어있으면 전송하지 않음
        if (commentText.trim() === '') {
            alert('댓글 내용을 입력해주세요.');
            return;
        }
        
        const payload: RequestCommentDto = {
            content: commentText,
        };

        // mutate 함수로 state에 저장된 값을 전송
        AddCommentMutate(payload, {
            onSuccess: () => {
                setCommentText('');
            }
        });
    };

    
    

    return (
        <div className="relative bg-amber-200 w-[80vw] max-w-5xl h-auto rounded-lg flex flex-col p-8" onClick={(e: MouseEvent) => e.stopPropagation()}>
            <div className="flex justify-between items-center w-full mb-5">
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
            <div className="w-full mb-6 flex gap-3">
                <input
                    type="text"
                    placeholder="댓글을 작성해주세요..."
                    className=" flex-1 px-4 py-3 bg-amber-100 text-gray-500 rounded-lg border border-neutral-600 focus:border-white focus:outline-none"
                    value={commentText}
                    onChange={handleInputChange}
                />
                <button 
                    className="px-6 py-3 bg-amber-100 text-gray-500 rounded-lg hover:bg-amber-400 transition-colors duration-200"
                    type="button"
                    onClick={handleSubmit}
                    >
                    작성
                </button>
            </div>
            <div className="w-full">
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
