import type {
  RequestPatchMyInfoDto,
  RequestSigninDto,
  RequestSignupDto,
  ResponseMyInfoDto,
  ResponseSigninDto,
  ResponseSignupDto,
} from "../types/auth";
import type { ResponseCommentDto } from "../types/comment";
import type { RequestPatchLpDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const postSignup = async (
  body: RequestSignupDto
): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signup", body);
  return data;
};

export const postSignin = async (
  body: RequestSigninDto
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);
  return data;
};

export const postLogout = async () => {
  let token = localStorage.getItem("accessToken");
  if (token) token = token.replace(/"/g, "");

  const { data } = await axiosInstance.post(
    "/v1/auth/signout",
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  let token = localStorage.getItem("accessToken");
  if (token) {
    token = token.replace(/"/g, "");
  }

  const { data } = await axiosInstance.get("/v1/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const patchMyInfo = async (body: {
  name?: string;
  bio?: string;
  avatar?: string | null;
}) => {
  const { data } = await axiosInstance.patch("/v1/users", body, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};

export const deleteUser = async () => {
  return axiosInstance.delete("/v1/users");
};
