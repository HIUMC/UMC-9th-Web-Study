import type { CommonResponse, LpCommentsDto, PaginationDto } from "../types/common";
import type { RequestCreateLpDto, ResponseCreateLpDto, ResponseLpDto, ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

// 서버에서 LP 목록을 가져오는 api함수
export const getLpList = async (paginationDto: PaginationDto): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto, // axios가 자동으로 쿼리 파라미터로 변환
  });
  return data;
};

// 서버에서 개별 LP 상세 정보를 가져오는 api함수
export const getLp = async (id: number): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${id}`);
  // 얘는 path parameter 방식
  return data;
};

// 서버에서 개별 LP의 댓글 목록을 가져오는 api함수
export const getLpComments = async (lpCommentsDto: LpCommentsDto) => {
  const { lpId, ...queryParams } = lpCommentsDto;
  // lpId를 분리
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: queryParams,
    // lpId 제외한 나머지만 query parameter로 전달
  });
  return data;
};

// 서버에 새로운 LP를 추가하는 api함수
export const postCreateLp = async (createLpData: RequestCreateLpDto): Promise<ResponseCreateLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps`, createLpData);
  return data;
};

// 서버에서 개별 LP를 수정하는 api함수
export const patchLp = async (editLpData: RequestCreateLpDto & { lpId: number }) => {
  const { lpId, ...payload } = editLpData;
  const { data } = await axiosInstance.patch(`/v1/lps/${lpId}`, payload);
  return data;
};

// 서버에서 개별 LP를 삭제하는 api함수
export const deleteLp = async (lpId: number): Promise<CommonResponse<boolean>> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);
  return data;
};
