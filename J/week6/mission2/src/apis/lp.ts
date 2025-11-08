import type { CommentsDto, PaginationDto } from "../types/common";
import type { ResponseLpCommentsDto, ResponseLpDetailDto, ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (paginationDto: PaginationDto): Promise<ResponseLpListDto> => {
    const{data} = await axiosInstance.get("/v1/lps", {
        params: paginationDto,
    });

    return data;
}

export const getLpDetail = async (lpid: string): Promise<ResponseLpDetailDto> => {
    const{data} = await axiosInstance.get(`/v1/lps/${lpid}`);
    return data;
}

export const getLpComments = async ({lpid, cursor, limit, order}: CommentsDto): Promise<ResponseLpCommentsDto> => {
    const {data} = await axiosInstance.get(`/v1/lps/${lpid}/comments`, {
        params: { cursor, limit, order}
    });
    return data;
}