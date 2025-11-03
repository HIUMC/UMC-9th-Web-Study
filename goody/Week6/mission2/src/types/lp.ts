import type { CursorBasedResponse } from "./common";

export type Tag = {
    id: number;
    name: string;
}

export type Likes = {
    id: number;
    userId:  number;
    lpId: number;
}

export type Author = {
    id : number;
    name : string;
    email : string;
    bio : string;
    avatar : string;
    createdAt : Date;
    updatedAt : Date;
}

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
    likes:Likes[];
    author: Author;
}


export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

export type ResponseLpDetailDto = CursorBasedResponse<Lp>;