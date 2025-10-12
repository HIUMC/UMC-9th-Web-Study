import { axiosInstance } from "./axios";
import type {
  RequestSigninDto,
  RequestSingupDto,
  ResponseMyInfoDto,
  ResponseSigninDto,
  ResponseSignupDto,
} from "../types/auth";

export const postSignup = async (
  body: RequestSingupDto
): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post(`/v1/auth/signup`, body);
  return data;
};

export const postSignin = async (
  body: RequestSigninDto
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post(`/v1/auth/signin`, body);
  return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get(`/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return data;
};
