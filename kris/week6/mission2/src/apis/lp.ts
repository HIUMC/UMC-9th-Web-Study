import type { InfiniteCommentDto, PaginationDto } from "../types/common";
import type { LpDetails, ResponseLpCommentDto, ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async(paginationDto: PaginationDto): Promise<ResponseLpListDto> => {
  const {data} = await axiosInstance.get(`/v1/lps`, {
    params: paginationDto
  })

  return data;
}

export const getLpDetails = async(lpId: number): Promise<LpDetails> => {
  const {data} = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
}

export const getLpComments = async(lpId: number, infiniteCommentDto: InfiniteCommentDto): Promise<ResponseLpCommentDto> => {
  const {data} = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: infiniteCommentDto
  });
  return data;
}