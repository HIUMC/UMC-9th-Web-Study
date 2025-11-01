// <로그인, 회원가입 요청 함수 모음 파일>
import type {
  RequestSigninDto,
  RequestSignupDto,
  ResponseMyInfoDto,
  ResponseSigninDto,
  ResponseSignupDto,
} from "../types/auth";

// 우리가 만든 HTTP 요청함수(.get: 서버에 데이터 요청/ .post: 서버에 새 데이터 생성)
import { axiosInstance } from "./axios";

// 서버에 회원가입 요청을 보내는 api함수
export const postSignup = async (
  body: RequestSignupDto
): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signup", body);
  return data; // 회원가입 결과
};

// 서버에 로그인 요청을 보내는 api함수
export const postSignin = async (
  body: RequestSigninDto
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);
  return data; // 로그인 결과
};

// 로그인된 사용자의 정보를 가져오는 api함수
export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get("/v1/users/me");
  return data; //로그인된 사용자의 정보
};

// 서버에 로그아웃 요청을 보내는 api함수
export const postLogout = async () => {
  const { data } = await axiosInstance.post("/v1/auth/signout");
  return data; //로그아웃 결과
};
