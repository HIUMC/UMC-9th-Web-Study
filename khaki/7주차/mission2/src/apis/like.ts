import type { ResponseLikeLpDto } from "../types/like";
import { axiosInstance } from "./axios";

// 서버에 Lp 좋아요를 생성/추가
export const postLike = async (lpId: number): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return data;
};

// 서버에서 Lp 좋아요를 삭제
export const deleteLike = async (lpId: number) => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return data;
};
