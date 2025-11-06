import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Error } from "../components/Error";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { data, isLoading, isError } = useQuery<ResponseMyInfoDto>({
    queryKey: ["userInfo"],
    queryFn: getMyInfo,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    gcTime: 10 * 60 * 1000, // 10분간 메모리에 보관 (구 cacheTime)
  });

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <Error message="사용자 정보를 불러올 수 없습니다." />
      </div>
    );
  }
  console.log(data);

  return (
    <div className="text-white flex flex-col items-center gap-4">
      <h1>{data?.data?.name}님 환영합니다.</h1>
      <h1>{data?.data?.email}</h1>
      <button className="border px-4 py-2 bg-red-500 text-white rounded-md" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
