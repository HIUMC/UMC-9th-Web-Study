import type { CommentsDto } from "../types/common";
import type { Comment, RequestCommentDto, RequestPatchCommentDto, ResponseCommentDto, ResponseDeleteCommentDto } from "../types/comment";
import { axiosInstance } from "./axios";
import type { RequestLpDto } from "../types/lp";

export const getComments = async (commentsDto : CommentsDto) : Promise<ResponseCommentDto> => {
    const {lpId, ...queryParams} = commentsDto;

    const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`,{
        params: queryParams
    })
    return data;
}

export const postComments = async (content : RequestCommentDto, {lpid} : RequestLpDto) : Promise<Comment> => {
    const { data } = await axiosInstance.post(`/v1/lps/${lpid}/comments`, 
        content,
    )
    return data;
}

export const patchComments = async (content : RequestCommentDto, {lpId,commentId} : RequestPatchCommentDto) : Promise<Comment> => {
    const { data } = await axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, 
        content,
    )
    return data;
}

export const deleteComments = async({lpId,commentId} : RequestPatchCommentDto) : Promise<ResponseDeleteCommentDto>=> {
    const {data} = await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
    return data;
}

