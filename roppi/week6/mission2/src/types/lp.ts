import type { CursorBasedResponse, CommonResponse } from "./common";

export type Tags = {
  id: number,
  name: string,
}

export type Likes = {
  id: number,
  userId: number,
  lpId: number,
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

export type ResponseLpListDto = CursorBasedResponse<{
  data: {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createAt: Date;
    updatedAt: Date;
    tags: Tags[];
    likes: Likes[];   
    }
  }
>

export type ResponseLpDetailDto = CommonResponse<{
data: {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createAt: Date;
    updatedAt: Date;
    tags: Tags[];
    likes: Likes[];   
    author: Author;
    }
}>