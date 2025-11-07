import type {
  ResponseCommentDeleteDto,
  ResponseCommentListDto,
  ResponseCommentUpdateDto,
} from "../types/comment";
import type { CommentPaginationDto } from "../types/common";
import { axiosInstance } from "./axios";

export const getCommentList = async (
  commentDto: CommentPaginationDto
): Promise<ResponseCommentListDto> => {
  const { lpId, ...params } = commentDto; // lpid와 나머지 params(cursor, limit) 분리
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params,
  });

  return data;
};

interface PostCommentDto {
  lpId: number;
  content: string;
}

export const postComment = async (
  commentData: PostCommentDto
): Promise<ResponseCommentListDto> => {
  const { lpId, content } = commentData;
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
    content,
  });

  return data;
};

interface UpdateCommentDto {
  lpId: number;
  commentId: number;
  content: string;
}

export const updateComment = async (
  updateComment: UpdateCommentDto
): Promise<ResponseCommentUpdateDto> => {
  const { lpId, commentId, content } = updateComment;

  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    { content }
  );
  return data;
};

interface DeleteCommentDto {
  lpId: number; // 쿼리 무효화를 위해 필요
  commentId: number;
}

export const deleteComment = async (
  payload: DeleteCommentDto
): Promise<ResponseCommentDeleteDto> => {
  const { lpId, commentId } = payload;
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`
  );
  return data;
};
