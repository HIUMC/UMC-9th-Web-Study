import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useGetLpDetail } from "../hooks/useGetLpDetail";
import type { Tag } from "../types/lp";
import { useEffect, useState } from "react";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { FaTrash, FaPen } from "react-icons/fa";
import { CiMemoPad } from "react-icons/ci";

export default function LpDetailPage() {
  const { data, isLoading, isError } = useGetLpDetail();
  const { accessToken } = useAuth();
  const [clientData, setClientData] = useState<ResponseMyInfoDto | null>(null);
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState(false);

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

  if (!data) {
    return <div className="mt-20">데이터가 없습니다.</div>;
  }

  const handleOpenComments = () => {
    setShowComments(true);
    navigate(`/v1/lps/${data.id}/comments`);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className=" relative flex flex-col justify-center items-center mt-20 bg-gray-700 size-[700px] rounded-lg">
        <div className="text-white  flex flex-row justify-between  w-full pr-10 pl-10">
          <h1 className="text-xl font-bold">{clientData?.data.name}</h1>
          <p>{new Date(data.updatedAt).toISOString().split("T")[0]}</p>
        </div>
        <div className="flex flex-row justify-between text-white text-2xl w-full pt-5 pl-10 pb-5">
          <p className="">{data.title}</p>
          <div className="flex pr-10 gap-4">
            <button>
              <FaPen size={18} />
            </button>
            <button>
              <FaTrash size={18} />
            </button>
            <button onClick={handleOpenComments} className="cursor-pointer">
              <CiMemoPad size={20} />
            </button>
          </div>
        </div>
        <img
          className="size-100 object-cover"
          src={data.thumbnail}
          alt={data.title}
        />
        <p className="text-white text-lg line-clamp-2 mt-5 w-full pl-10 pr-20 ">
          {data.content}
        </p>
        <div className="flex flex-wrap gap-2">
          {data.tags.map((tag: Tag) => (
            <span
              key={tag.id}
              className="px-2 py-1 bg-gray-700 text-white rounded-md"
            >
              #{tag.name}
            </span>
          ))}
        </div>
        <p className="mt-5 text-white text-lg font-bold">
          🤍 {data.likes.length}
        </p>
        {showComments && (
          <div className="absolute inset-0 z-50">
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
}
