import type { PAGINATION_ORDER } from "../enums/common";
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

export type Author = {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export type Lp = {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorized: number;
    createdAt: Date;
    updatedAt: Date;
    tags: Tag[];
    likes: Likes[];
}

export type ResponseLpListDto = CursorBasedResponse<Lp[]>

export type CommentsDto = {
    lpid: string;
    cursor?: number;
    limit?: number;
    search?: string;
    order?: PAGINATION_ORDER;
}

export type RequestCommentDto = {
    content: string;
}

export type ResponseCommentDto = CommonResponse<{
    id: number;
    content: string;
    lpId: string;
    authorized: string;
    createdAt: Date;
    updatedAt: Date;
}>
export type Comment = {
    id: number;
    content: string;
    lpId: number;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    author: Author
}
export type ResponseLpCommentsDto = CursorBasedResponse<Comment[]>

export type RequestCreateLpDto = {
    title: string;
    content: string;
    thumbnail?: string;
    tags?: string[];
    published: boolean;
}

export type ResponseCreateLpDto = CommonResponse<Lp>

export type Thumbnail = {
    imageUrl: string;
}

export type ResponseImageURL = CommonResponse<Thumbnail>

export type ResponseLikeLpDto = CommonResponse<Likes>;