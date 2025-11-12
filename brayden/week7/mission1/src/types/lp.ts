import type { CommonResponse, CursorBasedResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpid: number;
};

export type Author = {
  id: number;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
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
  author: Author;
};

export type RequestLpDto = {
  lpid: number;
};

export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

export type ResponseLpDetailDto = CommonResponse<Lp>;

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

export type ResponseLikeLpDto = CommonResponse<{
  id: number;
  userId: number;
  lpid: number;
}>;

export type RequestCreateLpDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
};

export type ResponseCreateLpDto = CommonResponse<{
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}>;

export type ResponseImgUploadDto = CommonResponse<{
  imageUrl: string;
}>;

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

export type RequestPatchLp = {
  lpid: number;
  body: RequestCreateLpDto;
};

export type ResponsePatchLp = CommonResponse<{
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}>;

export type ResponseDeleteLp = CommonResponse<boolean>;
