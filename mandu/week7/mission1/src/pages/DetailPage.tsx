import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpList";
import Comment from "../components/Comments/Comment";
import { LuHeart } from "react-icons/lu";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import { useState } from "react";
import PlusButton from "../components/Buttons/PlusButton";
import PlusLpModal from "../components/Modals/PlusLpModal";

const DetailPage = () => {
  const { lpid } = useParams();

  const { data, isPending, isError } = useGetLpDetail({ lpId: Number(lpid) });

  const { accessToken } = useAuth();
  const { data: me } = useGetMyInfo(accessToken);

  // mutate -> 비동기 요청을 실행하고, 콜백 함수를 이용해서 후속 작업 처리함
  // mutateAsync -> Promise를 반환해서 await 사용 가능
  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();

  const isLiked = data?.likes.some((like) => like.userId === me?.data.id);

  const handleLikeLp = () => {
    me?.data.id && likeMutate({ lpId: Number(lpid) });
  };
  const handleDislikeLp = () => {
    me?.data.id && disLikeMutate({ lpId: Number(lpid) });
  };

  // 모달 관리
  const [open, setOpen] = useState(false);
  const handlePlusLp = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  if (isPending) {
    return (
      <div className="p-4 flex justify-center items-center">
        <h1 className="text-2xl">Loading...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 flex justify-center items-center">
        <h1 className="text-2xl">Error loading data.</h1>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 overflow-auto">
        <h2 className="text-3xl font-bold mb-4">{data.title}</h2>
        <p className="text-lg text-gray-400 mb-2">
          작성자: {data.author.name} ({data.author.email})
        </p>

        <div className="my-4">
          <img
            src={data.thumbnail}
            alt={data.title}
            className="rounded-lg shadow-md w-full max-w-2xs mx-auto aspect-square object-cover"
          />
        </div>

        <p className="text-white my-4 whitespace-pre-line">{data.content}</p>

        <div className="flex flex-wrap gap-2">
          {data.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        <p className="mt-4 text-gray-500">
          최종 수정일: {new Date(data.updatedAt).toLocaleDateString()}
        </p>
        <p className="text-gray-500">
          좋아요: {data.likes.length}{" "}
          <button onClick={isLiked ? handleDislikeLp : handleLikeLp}>
            <LuHeart
              className="cursor-pointer"
              color={isLiked ? "red" : "white"}
              fill={isLiked ? "red" : "transparent"}
            />
          </button>
        </p>
        {open && <PlusLpModal onClose={onClose} />}
        <Comment />
      </div>
      <PlusButton handlePlus={handlePlusLp} isOpen={open} />
    </>
  );
};

export default DetailPage;
