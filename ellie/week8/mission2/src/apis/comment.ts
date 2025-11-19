import type {
  RequestCommentDto,
  RequestPostCommentDto,
  ResponseCommentListDto,
} from "../types/comment";
import type { RequestLpDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getComment = async ({
  lpId,
  cursor = 0,
  limit = 10,
  order = "asc",
}: any) => {
  const { data } = await axiosInstance.get(
    `/v1/lps/${lpId}/comments?cursor=${cursor}&limit=${limit}&order=${order}`
  );
  return data;
};

import type { ResponseCommentDto } from "../types/comment";

export const postComment = async (
  body: RequestPostCommentDto,
  { lpId }: RequestLpDto
): Promise<{ data: ResponseCommentDto }> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, body);
  return data;
};

export const patchComment = async ({
  lpId,
  commentId,
  content,
}: {
  lpId: number;
  commentId: number;
  content: string;
}) => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    { content }
  );
  return data;
};

export const deleteComment = async (lpId: number, commentId: number) => {
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`
  );
  return data;
};
