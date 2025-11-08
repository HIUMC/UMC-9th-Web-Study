

export type CommonResponse<T> = {
    status : boolean;
    statusCode : number;
    message : string;
    data : T;
}

export type CursorBasedResponse<T> = CommonResponse<{
    data : T;
    nextCursor : number | null;
    hasNext : boolean;
}>


export type PaginationDto = {
    cursor? : number;
    limit? : number;
    search? : string;
    order? : "asc" | "desc"; // PAGINATION_ORDER; 
    sort? : string;
}

export type CommentsDto = {
    lpId: number;
    cursor?: number;
    limit?: number;
    order?: "asc" | "desc" //PAGINATION_ORDER 사용시 타입 불일치로 오류 발생
};