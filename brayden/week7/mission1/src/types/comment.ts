import type { CommonResponse, CursorBasedResponse } from "./common";

export type CommentType = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type ResponseCommentDto = CursorBasedResponse<CommentType>;

export type RequestCreateCommentDto = {
  lpid: number;
  content: string;
};

export type ResponseCreateCommentDto = CommonResponse<CommentType>;

export type RequestModifyCommentDto = {
  lpid: number;
  commentId: number;
  content: string;
};

export type ResponseModifyCommentDto = CommonResponse<CommentType>;

export type RequestDeleteCommentDto = {
  lpid: number;
  commentId: number;
};

export type ResponseDeleteCommentDto = CommonResponse<unknown>;
// message 데이터 안쓸거니까 unknown 사용
