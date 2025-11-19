import type { CommonResponse, CursorBasedResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
}

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
}

export type Author = {
  id: number;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

export type RequestLpDto = {
  lpId: number;
  commentId?: number;
}

export type RequestCreateLpDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
}

export type ResponseCreateLpDto = CommonResponse<{
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}>

export type ResponseLikeLpDto = CommonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>

export type ResponseLpListDto = CursorBasedResponse<LpDetails[]>;

export type LpDetails = {
  data: {
    id: number,
    title: string,
    content: string,
    thumbnail: string,
    published: boolean,
    authorId: number,
    createdAt: Date,
    updatedAt: Date,
    author: Author,
    tags: Tag[],
    likes: Likes[];
  }
}

export type ResponseLpCommentDto = CursorBasedResponse<LpComment[]>;

export type ResponseLpCommentEditDto = CommonResponse<{
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: Author
}>

export type ResponseLpUpdateDto = CommonResponse<{
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: Author
  tags: Tag[];
}>

export type ResponseLpDeleteDto = CommonResponse<{
  message: string;
}>

export type ResponseImageUploadDto = CommonResponse<{
  imageUrl: string;
}>

export type LpComment = {
  id: number,
  content: string,
  lpId: number,
  authorId: number,
  createdAt: Date,
  updatedAt: Date,
  author: Author,
}