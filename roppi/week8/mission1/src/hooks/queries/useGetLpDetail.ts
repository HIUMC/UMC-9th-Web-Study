import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp";

export const useGetLpDetail = (id: number | undefined) => {

  return useQuery({
    queryKey: ["lp", id],
    queryFn: () => getLpDetail(id!),
    enabled: !!id, // id가 있을 때만 요청

    select: (res) => res.data,
  });
};
