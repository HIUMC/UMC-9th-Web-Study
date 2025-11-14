import type { ResponseCommentDto, ResponseDeleteCommentDto, ResponsePatchCommentDto } from "../types/comment";
import { axiosInstance } from "./axios";

// 서버에 새로운 LP를 추가하는 api함수
export const postComments = async ({
  lpId,
  content,
}: {
  lpId: number;
  content: string;
}): Promise<ResponseCommentDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, { content });
  return data;
};

// 서버에서 LP 댓글을 수정하는 api함수
export const patchComments = async ({
  lpId,
  commentId,
  content,
}: {
  lpId: number;
  commentId: number;
  content: string;
}): Promise<ResponsePatchCommentDto> => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, { content });
  return data;
};

// 서버에서 LP 댓글을 삭제하는 api함수
export const deleteComments = async ({
  lpId,
  commentId,
}: {
  lpId: number;
  commentId: number;
}): Promise<ResponseDeleteCommentDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
  return data;
};
