import type { PAGINATION_ORDER } from "../enums/common";
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

export type Lp = {
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


export type RequestLpDto = {
  lpId: number;
};

export type ResponseLpListDto = CursorBasedResponse<Lp[]>

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



export interface GetLpCommentsDto {
  lpId: number;
  cursor?: number;
  limit: number;
  order: PAGINATION_ORDER;
}

export interface ResponseLpCommentsDto {
  data: {
    data: {
      id: number;
      content: string;
      createdAt: string;
      author: {
        id: number;
        name: string;
        avatar: string;
      };
    }[];
    hasNext: boolean;
    nextCursor?: number;
  };
}

export type ResponseLikeLpDto = CommonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>


export type RequestPostLpDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
};

export type DeleteLpResonse = {
  status: boolean;
  statusCode: number;
  message: string;
  data: boolean;
};

export type RequestPatchLpDto = {
  title: string;
  content: string;
  tags: Tags[];
  thumbnail:string;
  published: boolean;
};


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

export type CommentPaginationDto = {
  lpId: number | undefined;
  cursor?: number;
  limit?: number;
  order?: PAGINATION_ORDER;
};

export type PostCommentDto = {
  lpId: number;
  content: string;
}

export type  UpdateCommentDto = {
  lpId: number;
  commentId: number;
  content: string;
}

 export type DeleteCommentDto = {
  lpId: number; 
  commentId: number;
}