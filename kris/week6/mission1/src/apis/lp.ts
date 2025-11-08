import type { PaginationDto } from "../types/common";
import type { ResponseLpDetailsDto, ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async(paginationDto: PaginationDto): Promise<ResponseLpListDto> => {
  const {data} = await axiosInstance.get(`/v1/lps`, {
    params: paginationDto
  })

  return data;
}

export const getLpDetails = async(lpId: number): Promise<ResponseLpDetailsDto> => {
  const {data} = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
}