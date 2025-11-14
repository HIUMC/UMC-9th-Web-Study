import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getUserLpList } from "../../apis/lp";
import type { PaginationDto } from "../../types/common";

function useGetUserLpList({cursor, search, order, limit}: PaginationDto ) {
  return useQuery({
    queryKey: [QUERY_KEY.lps],
    queryFn: () => getUserLpList({
      cursor, search, order, limit,
    })
  })
}

export default useGetUserLpList