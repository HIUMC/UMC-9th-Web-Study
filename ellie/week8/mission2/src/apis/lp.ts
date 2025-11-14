import type { PaginationDto } from "../types/common";
import type {
  ResponseLpListDto,
  RequestLpDto,
  ResponseLpDto,
  ResponseLikeDto,
  RequestPostLpDto,
  Lp,
  RequestPatchLpDto,
} from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (
  PaginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: PaginationDto,
  });
  return data;
};

export const getLpDetail = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
};

export const postLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeDto> => {
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
