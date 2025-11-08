import { useParams } from "react-router-dom"
import useGetLpDetails from "../hooks/queries/useGetLpDetails"
import { Delete, DeleteIcon, Edit, HeartIcon, Loader2, PencilIcon, RecycleIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import useGetInfiniteLpComments from "../hooks/queries/useGetInfiniteLpComments";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import { CommentCard } from "../components/CommentCard";
import { CommentCardSkeletonlist } from "../components/CommentCardSkeletonList";

export const LpDetailsPage = () => {
  const {lpid} = useParams<{lpid: string}>();
  const parsedLpId = parseInt(lpid ?? "0", 10)
  const {data, isPending, isError} = useGetLpDetails({lpid: parsedLpId})
  const {accessToken, logout} = useAuth()
  const [userData, setUserData] = useState<ResponseMyInfoDto | null>(null);
  const [commentOrder, setCommentOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  
  const {data: comments, isFetching, hasNextPage, isPending: isCommentsPending, fetchNextPage, isError: isCommentsError} = useGetInfiniteLpComments(parsedLpId, 5, commentOrder);

  const getTimeAgo = (date: Date | string) => {
    const now = new Date();
    const past = new Date(date);
    const diff = now.getTime() - past.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} years ago`;
    if (months > 0) return `${months} months ago`;
    if (weeks > 0) return `${weeks} weeks ago`;
    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hours ago`;
    if (minutes > 0) return `${minutes} minutes ago`;
    return `${seconds} seconds ago`;
  }
  
  useEffect(() => {
    if(!accessToken) return;
    const getInfo = async () => {
      try {
        const response = await getMyInfo();
        setUserData(response)
      } catch(error) {
        console.error("정보를 불러올 수 없음", error);
      }
    }
    getInfo();
  }, [accessToken])

  const {ref, inView} = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if(inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage])

  const handleCommentOrderChange = (newOrder: PAGINATION_ORDER) => {
    setCommentOrder(newOrder)
  }
  return (
    <>
      {isPending && (
        <div className="flex flex-row justify-center items-center bg-black text-white h-full">
          <Loader2 className="animate-spin h-20 w-20"/>
        </div>
      )}
      {isError && (
        <div className="flex flex-row justify-center items-center bg-black text-white h-full">
          <h1>데이터를 불러올 수 없습니다.</h1>
        </div>
      )}
      <div className="flex flex-row bg-black text-white min-h-screen pb-20">
        <div className="flex flex-col items-center bg-[#555555] rounded-lg w-full mx-20 mt-8 mb-8">
          <div className="flex flex-row w-full px-20 py-4 justify-between items-center">
            <div className="flex flex-row items-center space-x-4">
              <img className="w-12 h-12 bg-black rounded-full" src={userData?.data.avatar as string} alt="" />
              <h2 className="text-2xl">{userData?.data.name}</h2>
            </div>
            <div>
              <p>{data?.data.createdAt && getTimeAgo(data?.data.createdAt)}</p>
            </div>
          </div>
          <div className="flex flex-row w-full px-20 py-4 justify-between items-center">
            <p className="text-xl font-bold">{data?.data.title}</p>
            <div className="flex flex-row space-x-4">
              <PencilIcon/>
              <Trash/>
            </div>
          </div>
          <div className="relative w-[450px] h-[450px] my-4 flex items-center justify-center overflow-hidden shadow-2xl bg-[#505050]">
            <img className="w-[400px] h-[400px] m-8 rounded-full border-2 border-black" src={data?.data.thumbnail} alt="" />
            <div className="w-[60px] h-[60px] absolute bg-white rounded-full border-2 border-black"></div>
          </div>
          <div className="flex flex-row w-full px-20 py-4 justify-between items-center">
            <p>{data?.data.content}</p>
          </div>
          <div className="flex flex-row w-full px-20 py-4 justify-between items-center">
            
          </div>
          <div className="flex flex-row w-full px-20 py-4 justify-center items-center">
            <HeartIcon/>
            <p></p>
          </div>
          <div className="flex flex-row w-full px-20 py-4 justify-between items-center">
            <div className="">
              <h2 className="font-bold text-xl">댓글</h2>
            </div>
            <div>
              <button className={`px-4 py-1 rounded-md border border-gray-200 ${commentOrder === PAGINATION_ORDER.desc ? "bg-white text-black" : "bg-black text-white"}`} onClick={() => handleCommentOrderChange(PAGINATION_ORDER.desc)}>최신순</button>
              <button className={`px-4 py-1 rounded-md border border-gray-200 ${commentOrder === PAGINATION_ORDER.asc ? "bg-white text-black" : "bg-black text-white"}`} onClick={() => handleCommentOrderChange(PAGINATION_ORDER.asc)}>오래된순</button>
            </div>
          </div>
          <div className="flex flex-row w-full px-20 py-4 justify-between items-center">
            <input type="text" className="w-full border-b border-white px-3 py-1" placeholder="댓글을 입력해주세요."/>
            <button type="button" className="bg-gray-400 w-[80px] ml-3 px-3 py-1 rounded-md">작성</button>
          </div>
          <div className="flex flex-col w-full px-20 py-4 ">
            {comments?.pages?.map((page) => page.data.data)?.flat()?.map((comment) => (
              <CommentCard key={comment.id} comment={comment}/>
            ))}
            <div ref={ref} className="w-full py-4">
              {isFetching && (
                <CommentCardSkeletonlist count={3}/>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}