import { useParams } from "react-router-dom"
import useGetLpDetails from "../hooks/queries/useGetLpDetails"
import {  HeartIcon, Loader2, PencilIcon, Trash, Image, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import useGetInfiniteLpComments from "../hooks/queries/useGetInfiniteLpComments";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import { CommentCard } from "../components/CommentCard";
import { CommentCardSkeletonlist } from "../components/CommentCardSkeletonList";
import { getTimesAgo } from "../utils/getTimesAgo";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { deleteLike, postLike, postUploads } from "../apis/lp";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import usePostLpComment from "../hooks/mutations/usePostLpComment";
import usePatchLp from "../hooks/mutations/usePatchLp";

export const LpDetailsPage = () => {
  const {lpId} = useParams();
  const {data, isPending, isError} = useGetLpDetails({lpId: Number(lpId)});
  const {accessToken, logout} = useAuth()
  const [userData, setUserData] = useState<ResponseMyInfoDto | null>(null);
  const [commentOrder, setCommentOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const [commentText, setCommentText] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  const [nameInput, setNameInput] = useState(data?.data.title);
  const [contentInput, setContentInput] = useState(data?.data.content || "");
  const [thumbnailInput, setThumbnailInput] = useState(data?.data.thumbnail || "");
  const [tagInput, setTagInput] = useState("");
  const [newTags, setNewTags] = useState<string[]>([]);
  
  const {data: comments, isFetching, hasNextPage, isPending: isCommentsPending, fetchNextPage, isError: isCommentsError} = useGetInfiniteLpComments(Number(lpId), 5, commentOrder);
  
  const {mutate: postCommentMutate} = usePostLpComment(lpId ? Number(lpId) : 0);
  const {mutate: patchLp} = usePatchLp(lpId ? Number(lpId) : 0);

  const {data: me} = useGetMyInfo(accessToken);
  const {mutate: likeMutate} = usePostLike();
  const {mutate: dislikeMutate} = useDeleteLike();

  const isLiked = data?.data.likes.some((like) => like.userId === me?.data.id);

  const handleLikeLp = () => {
    likeMutate({lpId: Number(lpId)});
  }

  const handleDislikeLp = () => {
    dislikeMutate({lpId: Number(lpId)});
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

  const handleAddComment = () => {
    if(!commentText.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    postCommentMutate(commentText);
    setCommentText("");
  }

  const handleCommentOrderChange = (newOrder: PAGINATION_ORDER) => {
    setCommentOrder(newOrder)
  }

  const handleEditLp = () => {
    setIsEditing(!isEditing);
    setNewTags(data?.data.tags.map((tag) => tag.name) || []);
  }

  const handleAddTag = (tagName: string) => {
    if(newTags.includes(tagName)) {
      alert("이미 추가한 태그입니다.");
      return;
    }
    setNewTags((prev) => [...prev, tagName]);
  }

  const handleDeleteTag = (tagName: string) => {
    setNewTags((prev) => prev.filter((tag) => tag !== tagName));
  }

  const handleClickThumbnail = () => {
    if(!isEditing) return;
  }

  const handleChangeThumbnail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const formData = new FormData();
    formData.append("file", file as Blob);
    if(!file) {
      alert("파일을 선택하지 않았습니다.")
      return;
    }
    handleUploadThumbnail(formData);
  }

  const handleUploadThumbnail = async (formData: FormData) => {
    const {data} = await postUploads(formData);
    if(data.imageUrl) {
      setThumbnailInput(data.imageUrl);
    }
  }

  const handleSubmitUpdateLp = () => {
    // patchLp({
    //   title: nameInput || "",
    //   content: contentInput,
    //   thumbnail: thumbnailInput,

    // }
    setIsEditing(false);
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
        <div className="flex flex-col items-center bg-[#404040] rounded-lg w-full mx-20 mt-8 mb-8">
          <div className="flex flex-row w-full px-20 py-4 justify-between items-center">
            <div className="flex flex-row items-center space-x-4">
              <img className="w-12 h-12 bg-black rounded-full" src={data?.data.author.avatar as string} alt="" />
              <h2 className="text-2xl">{data?.data.author.name}</h2>
            </div>
            <div>
              <p>{data?.data.createdAt && getTimesAgo(data?.data.createdAt)}</p>
            </div>
          </div>
          <div className="flex flex-row w-full px-20 py-4 justify-between items-center">
            {isEditing ? (
              <input type="text" className="w-full border-1 border-white px-3 py-1 my-1 text-xl rounded-md mr-4" value={data?.data.title} />
            ) : (
              <p className="text-xl font-bold">{data?.data.title}</p>
            )}
            <div className="flex flex-row space-x-4 items-center">
              <div className="flex flex-row items-center">
                <HeartIcon onClick={isLiked ? handleDislikeLp : handleLikeLp} className="cursor-pointer" color={isLiked ? "#FF1E9D" : "white"} fill={isLiked ? "#FF1E9D" : "transparent"}/>
                <p className="text-lg ml-2">{data?.data.likes.length}</p>
              </div>
              
              {data?.data.author.id === me?.data.id && (
                <>
                  {isEditing ? (
                    <>
                      <Image/>
                      <Check className="cursor-pointer" onClick={handleSubmitUpdateLp}/>
                      <Trash className="cursor-pointer"/>
                    </>
                  ) : (
                    <>
                      <PencilIcon className="cursor-pointer" onClick={handleEditLp} />
                      <Trash className="cursor-pointer"/>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="relative w-[450px] h-[450px] my-8 flex items-center justify-center overflow-hidden shadow-2xl bg-[#505050]">
            <img className="w-[400px] h-[400px] m-8 rounded-full border-2 border-black object-cover" src={data?.data.thumbnail} alt="" />
            <div className="w-[60px] h-[60px] absolute bg-white rounded-full border-2 border-black"></div>
          </div>
          <div className="flex flex-row w-full px-20 py-4 justify-between items-center">
            {isEditing ? (
              <input type="text" className="w-full border-1 border-white px-3 py-1 my-1 text-sm rounded-md" value={data?.data.content} onChange={(e) => setContentInput(e.target.value)} />
            ) : (
              <p>{data?.data.content}</p>
            )}
          </div>
          {isEditing && (
              <div className="flex flex-row w-full px-20 py-4 justify-between items-center">
                <input type="text" className="w-full border-1 border-gray-400 rounded-md px-3 py-1" placeholder="LP Tag" value={tagInput} onChange={(e) => setTagInput(e.target.value)} />
                <button type="button" className="bg-gray-400 w-[80px] ml-3 px-3 py-1 rounded-md cursor-pointer" onClick={() => handleAddTag(tagInput)}>Add</button>
              </div>
          )}
          <div className="flex flex-row w-full px-20 py-4 justify-center items-center">
            {data?.data.tags.map((tag) => (
              <div key={tag.id} className="bg-gray-600 text-white px-3 py-1 rounded-full mr-2 flex flex-row justify-center items-center">
                <p>#{tag.name}</p>
                {isEditing && (
                  <X className="ml-1 scale-75 cursor-pointer" onClick={() => handleDeleteTag(tag.name)}/>
                )}
              </div>
            ))}
          </div>
          {/* 댓글 섹션 */}
          <div className="flex flex-row w-full px-20 py-4 justify-between items-center">
            <div className="">
              <h2 className="font-bold text-xl">댓글</h2>
            </div>
            <div>
              <button className={`px-4 py-1 rounded-md border border-gray-200 cursor-pointer ${commentOrder === PAGINATION_ORDER.desc ? "bg-white text-black" : "bg-black text-white"}`} onClick={() => handleCommentOrderChange(PAGINATION_ORDER.desc)}>최신순</button>
              <button className={`px-4 py-1 rounded-md border border-gray-200 cursor-pointer ${commentOrder === PAGINATION_ORDER.asc ? "bg-white text-black" : "bg-black text-white"}`} onClick={() => handleCommentOrderChange(PAGINATION_ORDER.asc)}>오래된순</button>
            </div>
          </div>
          <div className="flex flex-row w-full px-20 py-4 justify-between items-center">
            <input type="text" className="w-full border-1 border-white rounded-md px-3 py-1" placeholder="댓글을 입력해주세요." onChange={(event) => setCommentText(event.target.value)} value={commentText}/>
            <button type="button" className="bg-gray-400 w-[80px] ml-3 px-3 py-1 rounded-md cursor-pointer" onClick={handleAddComment}>작성</button>
          </div>
          <div className="flex flex-col w-full px-20 py-4">
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