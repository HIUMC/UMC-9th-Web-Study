// 1. CommonResponse와 새로 만든 CursorData를 import 합니다.
import type { CommonResponse, CursorBasedResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

// 2. LP 아이템 하나의 타입을 정의합니다.
type Lp = {
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

// 3. 최종 DTO: CommonResponse가 CursorData<LpItem>을 감싸는 구조
export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

export type Author = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string; // Date 대신 string이 안전할 수 있습니다 (JSON 직렬화)
  updatedAt: string;
};

export type LpDetail = {
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

export type ResponseLpDetailDto = CommonResponse<LpDetail>;
