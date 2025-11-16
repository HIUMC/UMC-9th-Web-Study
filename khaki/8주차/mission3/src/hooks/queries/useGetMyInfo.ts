import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getMyInfo } from "../../apis/auth";
import { useAuth } from "../../context/AuthContext";

function useGetMyInfo() {
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEY.myInfo],
    queryFn: getMyInfo,

    // 5분간 캐시를 fresh 상태로 유지
    staleTime: 5 * 60 * 1000,
    // accessToken이 있을 때에만 쿼리 실행
    enabled: Boolean(accessToken),
  });
}

export default useGetMyInfo;
