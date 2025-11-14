import type { ResponseMyInfoDto } from "../types/auth";
import type { CommonResponse } from "../types/common";
import { axiosInstance } from "./axios";

interface PatchMyInfoParams {
  name: string;
  bio: string;
  avatar: string;
}

// 로그인된 사용자의 정보를 가져오는 api함수
export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get("/v1/users/me");
  return data; //로그인된 사용자의 정보
};

// 로그인된 사용자의 정보를 수정하는 api함수
export const patchMyInfo = async (patchMyInfoParams: PatchMyInfoParams): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.patch("/v1/users", patchMyInfoParams);
  return data; //수정된 사용자의 정보
};

// 회원 탈퇴 api함수
export const deleteMyAccount = async (): Promise<CommonResponse<null>> => {
  const { data } = await axiosInstance.delete("/v1/users");
  return data; //탈퇴 완료 메시지
};
