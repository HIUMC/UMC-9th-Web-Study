import type { CommonResponse, CursorBasedResponse } from "./common";
import type { Author } from "./lp";

export type CommentList = {
  id: number;
  content: string;
  lpId: number;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
};

export type DeleteComment = {
  message: string;
};

export type ResponseCommentListDto = CursorBasedResponse<CommentList[]>;

export type ResponseCommentUpdateDto = CommonResponse<CommentList>;

export type ResponseCommentDeleteDto = CommonResponse<DeleteComment>;
