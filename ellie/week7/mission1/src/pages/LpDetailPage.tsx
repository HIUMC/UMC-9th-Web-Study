import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useGetLpDetail } from "../hooks/useGetLpDetail";
import type { Tag } from "../types/lp";
import { useEffect, useState } from "react";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { FaTrash, FaPen } from "react-icons/fa";
import { CiMemoPad } from "react-icons/ci";
import { Heart } from "lucide-react";
import useGetMyInfo from "../hooks/useGetMyInfo";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import useDeleteLp from "../hooks/mutations/useDeleteLp";
import usePatchLp from "../hooks/mutations/usePatchLp";

export default function LpDetailPage() {
  const { data: lp, isLoading, isError, refetch } = useGetLpDetail();
  const { accessToken } = useAuth();
  const [clientData, setClientData] = useState<ResponseMyInfoDto | null>(null);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { data: me } = useGetMyInfo(accessToken);
  const { mutateAsync: likeMutate } = usePostLike();
  const { mutateAsync: dislikeMutate } = useDeleteLike();
  const { mutate: deleteLpMutate } = useDeleteLp();
  const { mutate: updateLpMutate } = usePatchLp();

  const isLiked = lp?.likes
    .map((like) => like.userId)
    .includes(me?.data.id as number);

  const handleLikeLp = async () => {
    if (!lp || lp.id == null) return;
    await likeMutate({ lpId: lp.id });
    await refetch();
  };

  const handleDislikeLp = async () => {
    if (!lp || lp.id == null) return;
    await dislikeMutate({ lpId: lp.id });
    await refetch();
  };

  useEffect(() => {
    if (!accessToken) return;
    const fetchData = async () => {
      try {
        const response = await getMyInfo();
        setClientData(response);
      } catch (err) {
        console.error("getMyInfo 실패:", err);
      }
    };
    fetchData();
  }, [accessToken]);

  if (!accessToken) {
    alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
    localStorage.setItem("redirectAfterLogin", location.pathname);
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <div className="mt-20">Loading...</div>;
  }
  if (isError) {
    return <div className="mt-20">Error.</div>;
  }

  if (!lp) {
    return <div className="mt-20">데이터가 없습니다.</div>;
  }

  const handleOpenComments = () => {
    setShow(true);
    navigate(`/v1/lps/${lp.id}/comments`);
  };

  const handleDelete = () => {
    if (!lp?.id) return;
    deleteLpMutate({ lpId: lp.id });
    navigate(-1);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleEdit = () => {
    if (!lp?.id) return;
    setShow(true);
    navigate(`/v1/lps/${lp.id}/edit`);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className=" relative flex flex-col justify-center items-center mt-20 bg-gray-700 size-[700px] rounded-lg">
        <div className="text-white  flex flex-row justify-between  w-full pr-10 pl-10">
          <h1 className="text-xl font-bold">{clientData?.data.name}</h1>
          <p>{new Date(lp.updatedAt).toISOString().split("T")[0]}</p>
        </div>
        <div className="flex flex-row justify-between text-white text-2xl w-full pt-5 pl-10 pb-5">
          <p className="">{lp.title}</p>
          <div className="flex pr-10 gap-4">
            <button onClick={handleEdit} className="cursor-pointer">
              <FaPen size={18} />
            </button>
            <button onClick={handleDelete} className="cursor-pointer">
              <FaTrash size={18} />
            </button>
            <button onClick={handleOpenComments} className="cursor-pointer">
              <CiMemoPad size={20} />
            </button>
          </div>
        </div>
        <img
          className="size-100 object-cover"
          src={lp.thumbnail}
          alt={lp.title}
        />
        <p className="text-white text-lg line-clamp-2 mt-5 w-full pl-10 pr-20 ">
          {lp.content}
        </p>
        <div className="flex flex-wrap gap-2">
          {lp.tags.map((tag: Tag) => (
            <span
              key={tag.id}
              className="px-2 py-1 bg-gray-700 text-white rounded-md"
            >
              #{tag.name}
            </span>
          ))}
        </div>
        <button
          className="text-white mt-10"
          onClick={isLiked ? handleDislikeLp : handleLikeLp}
        >
          <Heart fill={isLiked ? "white" : "transparent"} />
        </button>
        {show && (
          <div className="absolute inset-0 z-50">
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
}
