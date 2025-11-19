import {  useQuery } from "@tanstack/react-query"
import { getMyInfo } from "../../apis/auth"
import { QUERY_KEY } from "../../constants/key"
import type { ResponseMyInfoDto } from "../../types/auth"

export const useGetMyInfo = () => {
    return useQuery<ResponseMyInfoDto>({
        queryKey: [QUERY_KEY.myInfo],
        queryFn: getMyInfo,
    })
}