import type { LpDetailDto, PaginationDto } from "../types/common";
import type { ResponseLpDetailDto, ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return data;
};

export const getLpDetail = async (
  lpDetailDto: LpDetailDto
): Promise<ResponseLpDetailDto> => {
  const { lpId } = lpDetailDto;

  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);

  return data;
};
