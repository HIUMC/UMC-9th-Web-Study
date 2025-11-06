
export type CommonResponse<T> = {
    status : boolean;
    statusCode : number;
    message : string;
    data : T;
}

export type CursorBasedResponse<T> = {
    status : boolean;
    statusCode : number;
    message : string;
    data : T;
    nextCursor : number;
    hasNext : boolean;
}

export type PaginationDto = {
    cursor? : number;
    limit? : number;
    search? : string;
    order? : "asc" | "desc"; // PAGINATION_ORDER; 
    sort? : string;
}

