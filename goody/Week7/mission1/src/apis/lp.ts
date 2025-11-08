import type { CommentsDto, PaginationDto } from "../types/common";
import type { RequestLpDto, ResponseCommentDto, ResponseLikeLpDto, ResponseLpDetailDto, ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async(paginationDto:PaginationDto) : Promise<ResponseLpListDto> => {
    const {data} = await axiosInstance.get("/v1/lps", {
        params: paginationDto,
    });

    return data;
};

export const getLpDetail = async({lpid}:RequestLpDto) : Promise<ResponseLpDetailDto> => {
    const {data} = await axiosInstance.get(`/v1/lps/${lpid}`);
    return data;
}

export const getComments = async (commentsDto : CommentsDto) : Promise<ResponseCommentDto> => {
    const {lpId, ...queryParams} = commentsDto;

    const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`,{
        params: queryParams
    })
    return data;
}

export const postLike = async({lpid}:RequestLpDto) : Promise<ResponseLikeLpDto> => {
    const {data} = await axiosInstance.post(`/v1/lps/${lpid}/likes`);
    return data;
}

export const deleteLike = async({lpid}:RequestLpDto) : Promise<ResponseLikeLpDto> => {
    const {data} = await axiosInstance.delete(`/v1/lps/${lpid}/likes`);
    return data;
}

export const updateLp = async({lpid}:RequestLpDto) => {
    const {data} = await axiosInstance.patch(`v1/lps/${lpid}`);
    return data;
}