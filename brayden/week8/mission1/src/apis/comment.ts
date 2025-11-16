import type {
  RequestCreateCommentDto,
  RequestDeleteCommentDto,
  RequestModifyCommentDto,
  ResponseCommentDto,
  ResponseCreateCommentDto,
  ResponseDeleteCommentDto,
  ResponseModifyCommentDto,
} from "../types/comment";
import type { CommentsDto } from "../types/common";
import { axiosInstance } from "./axios";

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
