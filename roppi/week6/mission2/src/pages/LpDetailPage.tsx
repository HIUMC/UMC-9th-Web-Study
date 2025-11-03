import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetLpDetail } from "../hooks/queries/useGetLpDetail";
import { timeAgo } from "../utils/timeAgo";
import deleteIcon from '../assets/delete.png';
import editIcon from '../assets/edit.png';
import pinkHeart from '../assets/pinkH.png';
import whiteHeart from '../assets/whiteH.png';

const LpDetailPage = () => {
    const { lpid } = useParams<{ lpid: string }>();
    const nav = useNavigate();
    const [isLiked, setIsLiked] = useState(false);

  
    //  상세 정보 패칭 (queryKey에 lpId 포함)
    const { data, isLoading, isError } = useGetLpDetail(Number(lpid));



  if (isLoading) return <div className="text-white">로딩중...</div>;
  if (isError || !data) return <div className="text-red-400">에러 발생!</div>;

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    // 👉 실제 좋아요 API 연동 시 mutate() 호출 필요
  };


  return (
    <div className="w-[calc(100%-160px)] mx-20 mt-5 h-full">
      <div className="bg-[#303030] rounded text-white">
        <div className="w-[calc(100%-40px)] mx-5 py-5 flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <div className="flex gap-5 items-center">
              <img src={data?.author.avatar}
              className="w-10 rounded-full" 
              />
              <span>{data?.author.name}</span>
            </div>
            <span className="text-[9px]">{timeAgo(data?.createdAt)}</span>
          </div>
            <div className="flex gap-5 justify-between">
              <span>{data?.title}</span>
              <div className="flex gap-1 items-center">
                <img className="w-6 h-6" src={editIcon} />
                <img className="w-6 h-5" src={deleteIcon} />  
              </div>          
            </div>
            <img src={data?.thumbnail} />
            <span className="text-[7px]">{data?.content}</span>
            <div className="w-full flex justify-center">
              <img src={isLiked ? pinkHeart : whiteHeart} 
                onClick={handleLike}
                className="w-5 cursor-pointer"
              />
            </div>
        </div>
      </div>
    </div>
  )
};

export default LpDetailPage;
