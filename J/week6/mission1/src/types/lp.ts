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

export type ResponseLpListDto = CursorBasedResponse<{
    data: {
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
    }[];
}>

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