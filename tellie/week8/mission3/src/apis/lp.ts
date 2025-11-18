import type { PaginationDto } from "../types/common";
import type { ResponseLpListDto, ResponseLpCommentsDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (paginationDto: PaginationDto): Promise<ResponseLpListDto> => {
    // undefined나 빈 문자열 값들을 제거하여 파라미터 정리
    const params = Object.fromEntries(
        Object.entries(paginationDto).filter(([_, value]) => value !== undefined && value !== '')
    );
    
    const { data } = await axiosInstance.get('/v1/lps', {
        params,
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

export const uploadImage = async (file: File): Promise<{ imageUrl: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await axiosInstance.post('/v1/uploads/public', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return data.data;
};

export const createLp = async (lpData: {
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
    published: boolean;
}) => {
    const { data } = await axiosInstance.post('/v1/lps', lpData);

    return data;
};

export const addLpLike = async (lpId: string) => {
    const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);

    return data;
};

export const removeLpLike = async (lpId: string) => {
    const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);

    return data;
};

export const updateLpComment = async (lpId: string, commentId: number, content: string) => {
    const { data } = await axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, {
        content,
    });

    return data;
};

export const deleteLpComment = async (lpId: string, commentId: number) => {
    const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);

    return data;
};

export const updateLp = async (lpId: string, lpData: {
    title?: string;
    content?: string;
    thumbnail?: string;
    tags?: string[];
    published?: boolean;
}) => {
    const { data } = await axiosInstance.patch(`/v1/lps/${lpId}`, lpData);

    return data;
};

export const deleteLp = async (lpId: string) => {
    const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);

    return data;
};