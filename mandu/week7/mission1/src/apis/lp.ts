import type {
  CommentPaginationDto,
  LpDetailDto,
  PaginationDto,
} from "../types/common";
import type {
  ResponseCommentListDto,
  ResponseLikeLpDto,
  ResponseLpDetailDto,
  ResponseLpListDto,
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

export const getCommentList = async (
  commentDto: CommentPaginationDto
): Promise<ResponseCommentListDto> => {
  const { lpId, ...params } = commentDto; // lpid와 나머지 params(cursor, limit) 분리
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params,
  });

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
