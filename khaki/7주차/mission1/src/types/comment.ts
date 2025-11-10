import type { CommonResponse } from "./common";

export type RequestPostCommentDto = {
  constent: string;
};

type Author = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ResponseCommentDto = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: Author;
};

export type ResponsePatchCommentDto = CommonResponse<ResponseCommentDto>;

export type ResponseDeleteCommentDto = CommonResponse<{ message: string }>;
