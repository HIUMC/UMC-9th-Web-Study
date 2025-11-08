import type { CommentsDto, PaginationDto } from "../types/common";
import type { CreateLpsDto, RequestLpDto, ResponseCommentDto, ResponseLikeLpDto, ResponseLpCreateDto, ResponseLpDetailDto, ResponseLpListDto, UploadResponse } from "../types/lp";
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

export const postLp = async(payload: CreateLpsDto): Promise<ResponseLpCreateDto> => {
    const {data} = await axiosInstance.post(`/v1/lps/`, payload);
    return data;
}

export const uploadImage = async(formData : FormData) : Promise<UploadResponse> => {
    try {
        const {data} = await axiosInstance.post(`/v1/uploads`, formData)
        return data;
    } catch(error){
        console.error("이미지 업로드 API 실패:", error);
        // 에러를 throw해야 React Query의 onError가 감지할 수 있다.
        throw new Error("이미지 업로드에 실패했습니다.");
    }
}