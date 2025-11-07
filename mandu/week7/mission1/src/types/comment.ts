import type { CursorBasedResponse } from "./common";
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

export type ResponseCommentListDto = CursorBasedResponse<CommentList[]>;
