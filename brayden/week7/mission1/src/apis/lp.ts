import type { PaginationDto } from "../types/common";

import type {
  RequestCreateLpDto,
  RequestLpDto,
  ResponseCreateLpDto,
  ResponseImgUploadDto,
  ResponseLikeLpDto,
  ResponseLpDetailDto,
  ResponseLpListDto,
  RequestPatchLp,
  ResponsePatchLp,
  ResponseDeleteLp,
} from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return data;
};

export const getLpDetail = async ({
  lpid,
}: RequestLpDto): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpid}`);
  return data;
};

export const postLike = async ({
  lpid,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpid}/likes`);
  return data;
};

export const deleteLike = async ({
  lpid,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpid}/likes`);
  return data;
};

export const postLp = async (
  body: RequestCreateLpDto
): Promise<ResponseCreateLpDto> => {
  const { data } = await axiosInstance.post("/v1/lps", body);
  return data;
};
export const postImg = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axiosInstance.post<ResponseImgUploadDto>(
    "/v1/uploads",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data.data.imageUrl;
};

export const patchLp = async ({
  lpid,
  body,
}: RequestPatchLp): Promise<ResponsePatchLp> => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpid}`, body);
  return data;
};

export const deleteLp = async ({
  lpid,
}: RequestLpDto): Promise<ResponseDeleteLp> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpid}`);
  return data;
};
