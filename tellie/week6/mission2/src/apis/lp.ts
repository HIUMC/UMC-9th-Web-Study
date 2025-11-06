import type { PaginationDto } from "../types/common";
import type { ResponseLpListDto, ResponseLpCommentsDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (paginationDto: PaginationDto): Promise<ResponseLpListDto> => {
    const { data } = await axiosInstance.get('/v1/lps', {
        params: paginationDto,
    });

    return data;
};

export const getLpComments = async (lpId: string, paginationDto: PaginationDto): Promise<ResponseLpCommentsDto> => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
        params: paginationDto,
    });

    return data;
};

export const createLpComment = async (lpId: string, content: string) => {
    const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
        content,
    });

    return data;
};