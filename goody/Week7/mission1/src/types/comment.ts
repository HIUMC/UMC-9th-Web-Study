import type { CursorBasedResponse } from "./common";

export type Comment = {
    id : number;
    content : string;
    lpId : number;
    authorId : number;
    createdAt: Date;
    updatedAt: Date;
    author: {
        id: number;
        name: string;
        email: string;
        bio: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    };
}

export type ResponseCommentDto = CursorBasedResponse<Comment>

export type RequestCommentDto = {
    content : string;
}

export type RequestPatchCommentDto = {
    lpId : number;
    commentId : number;
}

export type ResponseDeleteCommentDto = {
    status:boolean;
    statusCode:number;
    message : string;
    data : {
        message:string;
    }
}