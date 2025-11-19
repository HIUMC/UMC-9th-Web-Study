import type { CommonResponse, CursorBasedResponse } from "./common";

export type TagType = {
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
  createdAt: string;
  updatedAt: string;
  tags: TagType[];
  likes: Likes[];
  author: Author;
};

export type RequestLpDto = {
  lpid: number;
};

export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

export type ResponseLpDetailDto = CommonResponse<Lp>;

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

// 이미지 업로드 응답 타입
export type ResponseImgUploadDto = CommonResponse<{
  imageUrl: string;
}>;

// 이미지 업로드 요청 타입

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
