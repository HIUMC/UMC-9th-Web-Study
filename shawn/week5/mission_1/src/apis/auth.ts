import { axiosInstance } from "./axios";
import type {
  RequestSigninDto,
  RequestSingupDto,
  ResponseMyInfoDto,
  ResponseSigninDto,
  ResponseSignupDto,
} from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

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
  const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { data } = await axiosInstance.get(`/v1/users/me`, {
    headers: {
      Authorization: `Bearer ${getItem()}`,
    },
  });
  return data;
};
