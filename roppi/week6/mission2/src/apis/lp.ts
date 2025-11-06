import type { PAGINATION_ORDER } from "../enums/common";
import type { PaginationDto } from "../types/common";
import type { ResponseLpDetailDto, ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (paginationDto : PaginationDto) :Promise<ResponseLpListDto>=> {
  const { data } = await axiosInstance.get('/v1/lps', {
  params: paginationDto,

  });
  return data;
}

export const getLpDetail = async (id: number) : Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${id}`);
  return data;
};

// 댓글 목록 조회 API
export const getLpComments = async (
  params: GetLpCommentsDto
): Promise<ResponseLpCommentsDto> => {
  const { lpId, cursor = 0, limit, order } = params;

  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: { cursor, limit, order },
  });

  return data;
};
