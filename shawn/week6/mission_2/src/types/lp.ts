import type { CursorBasedResponse, CommonResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
};

export type ResponseLpListDto = CommonResponse<{
  data: Lp[];
  nextCursor: number | null;
  hasNext: boolean;
}>;

export type ResponseLpDetailDto = CommonResponse<Lp>;

// 댓글 타입
export type Comment = {
  id: number;
  content: string;
  userId: number;
  lpId: number;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: number;
    name: string;
    email: string;
  };
};

export type ResponseLpCommentsDto = CommonResponse<{
  data: Comment[];
  nextCursor: number | null;
  hasNext: boolean;
}>;
