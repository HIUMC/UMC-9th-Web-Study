import type { PaginationDto } from "../types/common";
import type { CommentsDto, Lp, RequestCommentDto, RequestCreateLpDto, ResponseCommentDto, ResponseCreateLpDto, ResponseImageURL, ResponseLikeLpDto, ResponseLpCommentsDto, ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (paginationDto: PaginationDto): Promise<ResponseLpListDto> => {
    const{data} = await axiosInstance.get("/v1/lps", {
        params: paginationDto,
    });

    return data;
}

export const getLpDetail = async (lpid: string): Promise<Lp> => {
    const{data} = await axiosInstance.get(`/v1/lps/${lpid}`);
    return data;
}

export const postComment = async(lpid: string, body: RequestCommentDto): Promise<ResponseCommentDto> => {
    const {data} = await axiosInstance.post(`v1/lps/${lpid}/comments`, body);
    return data;
}

export const patchComment = async(lpid: string, commentid: number, body: RequestCommentDto): Promise<ResponseCommentDto> => {
    const {data} = await axiosInstance.patch(`/v1/lps/${lpid}/comments/${commentid}`, body);

    return data;
}

export const deleteComment = async(lpid: string, commentid: number): Promise<void> => {
    await axiosInstance.delete(`/v1/lps/${lpid}/comments/${commentid}`);
}

export const getLpComments = async ({lpid, cursor, limit, order}: CommentsDto): Promise<ResponseLpCommentsDto> => {
    const {data} = await axiosInstance.get(`/v1/lps/${lpid}/comments`, {
        params: { cursor, limit, order}
    });
    return data;
}

export const postLp = async(body: RequestCreateLpDto): Promise<ResponseCreateLpDto> => {
    const {data} = await axiosInstance.post("/v1/lps", body);

    return data;
}

export const patchLp = async(lpid: string, body: RequestCreateLpDto): Promise<ResponseCreateLpDto> => {
    const { data } = await axiosInstance.patch(`/v1/lps/${lpid}`, body);

    return data;
}

export const deleteLp = async(lpid: number): Promise<void> => {
    await axiosInstance.delete(`/v1/lps/${lpid}`)
}

export const postUpload = async(body: FormData): Promise<ResponseImageURL> => {
    const {data} = await axiosInstance.post("/v1/uploads", body);

    return data;
}

export const postLike = async(lpid: string): Promise<ResponseLikeLpDto> => {
    const {data} = await axiosInstance.post(`/v1/lps/${lpid}/likes`);

    return data;
}

export const deleteLike = async(lpid: string): Promise<ResponseLikeLpDto> => {
    const {data} = await axiosInstance.delete(`/v1/lps/${lpid}/likes`);

    return data;
}