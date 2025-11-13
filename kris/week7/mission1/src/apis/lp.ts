import type { InfiniteCommentDto, PaginationDto } from "../types/common";
import type { LpComment, LpDetails, RequestCreateLpDto, RequestLpDto, ResponseCreateLpDto, ResponseImageUploadDto, ResponseLikeLpDto, ResponseLpCommentDto, ResponseLpCommentEditDto, ResponseLpDeleteDto, ResponseLpListDto, ResponseLpUpdateDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async(paginationDto: PaginationDto): Promise<ResponseLpListDto> => {
  const {data} = await axiosInstance.get(`/v1/lps`, {
    params: paginationDto
  })

  return data;
}

export const getLpDetails = async({lpId}: RequestLpDto): Promise<LpDetails> => {
  const {data} = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
}

export const getLpComments = async(lpId: number, infiniteCommentDto: InfiniteCommentDto): Promise<ResponseLpCommentDto> => {
  const {data} = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: infiniteCommentDto
  });
  return data;
}

export const getUserLpList = async(paginationDto: PaginationDto): Promise<ResponseLpListDto> => {
  const {data} = await axiosInstance.get(`/v1/lps/user`, {
    params: paginationDto
  })
  return data;
}

export const postLike = async({lpId}: RequestLpDto) : Promise<ResponseLikeLpDto> => {
  const {data} = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return data;
}

export const postCreateLp = async(body: RequestCreateLpDto): Promise<ResponseCreateLpDto> => {
  const {data} = await axiosInstance.post(`/v1/lps`, body);
  return data;
}

export const postLpComment = async({lpId}: RequestLpDto, content: string): Promise<LpComment> => {
  const {data} = await axiosInstance.post(`/v1/lps/${lpId}/comments`, { content });
  return data;
}

export const postUploads = async(formData: FormData): Promise<ResponseImageUploadDto> => {
  const {data} = await axiosInstance.post(`/v1/uploads`, formData);
  return data;
}

export const patchLp = async({lpId}: RequestLpDto, body: RequestCreateLpDto): Promise<ResponseLpUpdateDto> => {
  const {data} = await axiosInstance.patch(`/v1/lps/${lpId}`, body);
  return data;
}

export const patchLpComment = async({lpId, commentId}: RequestLpDto, content: string): Promise<ResponseLpCommentEditDto> => {
  const {data} = await axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, { content });
  return data;
}

export const deleteLike = async({lpId}: RequestLpDto) : Promise<ResponseLikeLpDto> => {
  const {data} = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return data;
}

export const deleteLpComment = async({lpId, commentId}: RequestLpDto): Promise<ResponseLpDeleteDto> => {
  const {data} = await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
  return data;
}