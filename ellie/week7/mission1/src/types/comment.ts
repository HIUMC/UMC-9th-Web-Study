import type { ResponseMyInfoDto } from "./auth";
import type { CursorBasedResponse } from "./common";

export type ResponseCommentDto = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: ResponseMyInfoDto;
};

export type ResponseCommentListDto = {
  status: boolean;
  message: string;
  statusCode: number;
  data: {
    data: ResponseCommentDto[];
    hasNext: boolean;
    nextCursor?: number;
  };
};

export type RequestPostCommentDto = {
  content: string;
  name?: string;
};
export type RequestCommentDto = {
  lpId: number;
};
