import type { CommonResponse } from "./common";

// 회원가입 요청 DTO(데이터전송 객체)
export type RequestSignupDto = {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  password: string;
}

// 회원가입 성공 시 서버가 보내는 응답 DT0
export type ResponseSignupDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio :string|null;
  avatar: string|null;
  createdAt: Date;
  updatedAt: Date;

}>

// 로그인 요청 DTO
export type RequestSigninDto = {
  email : string;
  password: string;
}

// 로그인 성공 시 서버가 보내는 응답 DTO
export type ResponseSigninDto = CommonResponse<{
  id : number;
  name : string;
  accessToken : string;
  refreshToken : string;
}>

// 내 정보 조회 요청 DTO
export type ResponseMyInfoDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio :string|null;
  avatar: string|null;
  createdAt: Date;
  updatedAt: Date;
}>



