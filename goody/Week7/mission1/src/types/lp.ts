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

export type RequestLpDto = {
    lpid:number;
}

export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

export type ResponseLpDetailDto = CursorBasedResponse<Lp>;


export type ResponseLikeLpDto = CommonResponse<{
    id:number;
    userId:number;
    lpId:number;
}>

export type CreateLpsDto = {
    title : string;
    content : string;
    thumbnail : string;
    tags : string[];
    published: boolean;
};

export type ResponseLpCreateDto = CommonResponse<Lp>;

export type UploadResponse = {
    imageUrl : string;
}