import type { CommentsDto, PaginationDto } from "../types/common";

import type {
  RequestDeleteCommentDto,
  ResponseDeleteCommentDto,
  RequestCreateCommentDto,
  RequestCreateLpDto,
  RequestLpDto,
  ResponseCommentDto,
  ResponseCreateCommentDto,
  ResponseCreateLpDto,
  ResponseImgUploadDto,
  ResponseLikeLpDto,
  ResponseLpDetailDto,
  ResponseLpListDto,
  RequestModifyCommentDto,
  ResponseModifyCommentDto,
  RequestPatchLp,
  ResponsePatchLp,
  ResponseDeleteLp,
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

export const getLpDetail = async ({
  lpid,
}: RequestLpDto): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpid}`);
  return data;
};

export const getComments = async (
  commentsDto: CommentsDto
): Promise<ResponseCommentDto> => {
  // lpid -> url 경로
  // cursor, limit, order -> 쿼리 파라미터
  const { lpId, ...queryParams } = commentsDto;

  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: queryParams,
  });
  return data;
};

export const postLike = async ({
  lpid,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpid}/likes`);
  return data;
};

export const deleteLike = async ({
  lpid,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpid}/likes`);
  return data;
};

export const postCreateLp = async (
  body: RequestCreateLpDto
): Promise<ResponseCreateLpDto> => {
  const { data } = await axiosInstance.post("/v1/lps", body);
  return data;
};
export const postImgUpload = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axiosInstance.post<ResponseImgUploadDto>(
    "/v1/uploads",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data.data.imageUrl;
};

export const postComment = async ({
  lpid,
  content,
}: RequestCreateCommentDto): Promise<ResponseCreateCommentDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpid}/comments`, {
    content,
  });
  return data;
};

export const patchComment = async ({
  lpid,
  commentId,
  content,
}: RequestModifyCommentDto): Promise<ResponseModifyCommentDto> => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpid}/comments/${commentId}`,
    { content }
  );
  return data;
};

export const deleteComment = async ({
  lpid,
  commentId,
}: RequestDeleteCommentDto): Promise<ResponseDeleteCommentDto> => {
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpid}/comments/${commentId}`
  );
  return data;
};

export const patchLp = async ({
  lpid,
  body,
}: RequestPatchLp): Promise<ResponsePatchLp> => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpid}`, body);
  return data;
};

export const deleteLp = async ({
  lpid,
}: RequestLpDto): Promise<ResponseDeleteLp> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpid}`);
  return data;
};
