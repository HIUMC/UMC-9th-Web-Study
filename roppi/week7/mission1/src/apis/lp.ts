import type { PaginationDto } from "../types/common";
import type { GetLpCommentsDto, RequestLpDto, RequestPatchLpDto, RequestPostLpDto, ResponseLikeLpDto, ResponseLpCommentsDto, ResponseLpDetailDto, ResponseLpListDto } from "../types/lp";
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

export const postLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return data;
};

export const deleteLike = async ({ lpId }: RequestLpDto) => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return data;
};


export const postLp = async (body: RequestPostLpDto) => {
  const response = await axiosInstance.post("/v1/lps", body);
  return response.data;
};

export const deleteLp = async ({ lpId }: { lpId: number }) => {
  const token = localStorage.getItem("accessToken");
  return await axiosInstance.request({
    method: "DELETE",
    url: `/v1/lps/${lpId}`,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateLp = async ({
  lpId,
  data,
}: {
  lpId: number;
  data: RequestPatchLpDto;
}) => {
  return await axiosInstance.patch(`/v1/lps/${lpId}`, data);
};