import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/key";
import { getMyInfo } from "../apis/auth";

export default function useGetMyInfo(accessToken: string | null) {
  return useQuery({
    queryKey: [QUERY_KEY.myinfo],
    queryFn: getMyInfo,
    enabled: !!accessToken,
  });
}
