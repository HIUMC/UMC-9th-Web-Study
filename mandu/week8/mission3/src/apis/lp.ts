import type {
  CommonResponse,
  LpDetailDto,
  PaginationDto,
} from "../types/common";
import type {
  DeleteLpResonse,
  PostLpDto,
  ResponseLikeLpDto,
  ResponseLpDetailDto,
  ResponseLpListDto,
  updateLpDto,
} from "../types/lp";
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

export const postLike = async ({
  lpId,
}: LpDetailDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);

  return data;
};

export const deleteLike = async ({
  lpId,
}: LpDetailDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);

  return data;
};

export const postLP = async (body: PostLpDto): Promise<PostLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps`, body);

  return data;
};

export const updateLp = async (
  payload: { lpId: number } & PostLpDto
): Promise<updateLpDto> => {
  const { lpId, ...body } = payload;
  const { data } = await axiosInstance.patch(`/v1/lps/${lpId}`, body);
  return data;
};

interface DeleteLpPayload {
  lpId: number;
}

export const deleteLp = async (
  payload: DeleteLpPayload
): Promise<DeleteLpResonse> => {
  const { lpId } = payload;
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);
  return data;
};
