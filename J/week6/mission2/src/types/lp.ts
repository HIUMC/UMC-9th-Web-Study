import type { CursorBasedResponse } from "./common";

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
    authorized: number;
    createdAt: Date;
    updatedAt: Date;
    tag: Tag[];
    likes: Likes[];
}

export type ResponseLpListDto = CursorBasedResponse<Lp[]>

export type ResponseLpDetailDto = {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorized: number;
    createdAt: Date;
    updatedAt: Date;
    tag: Tag[];
    likes: Likes[];
}