import type { PaginationDto } from "../types/common";
import type { ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

// 서버에서 LP 목록을 가져오는 api함수
export const getLpList = async (paginationDto: PaginationDto): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto, // axios가 자동으로 쿼리 파라미터로 변환
  });
  return data;
};

// 서버에서 개별 LP 상세 정보를 가져오는 api함수
export const getLp = async ({ id }: { id: number }) => {
  const { data } = await axiosInstance.get(`/v1/lps/${id}`);
  // 얘는 path parameter 방식
  return data;
};
