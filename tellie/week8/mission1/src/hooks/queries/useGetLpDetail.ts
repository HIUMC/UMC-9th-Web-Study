import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";
import { QUERY_KEY } from "../../constants/key";

const getLpDetail = async (lpId: string) => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data.data;
};

// 상세 정보를 가져오는 쿼리 훅
const useGetLpDetail = (lpId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.lps, lpId],
    queryFn: () => getLpDetail(lpId),
  });
};

export default useGetLpDetail;