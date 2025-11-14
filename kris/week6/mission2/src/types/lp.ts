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

export type LpComment = {
  id: number,
  content: string,
  lpId: number,
  authorId: number,
  createdAt: Date,
  updatedAt: Date,
  author: Author,
}