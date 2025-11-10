import type { CommonResponse } from "./common";

// ==================== 회원가입 관련 타입 ====================

/**
 * 회원가입 요청 시 보내는 데이터 타입
 */
export type RequestSingupDto = {
  email: string; // 사용자 이메일 (필수)
  password: string; // 비밀번호 (필수)
  name: string; // 사용자 이름 (필수)
  bio?: string; // 자기소개 (선택)
  avatar?: string; // 프로필 이미지 URL (선택)
};

/**
 * 회원가입 성공 시 서버로부터 받는 응답 타입
 */
export type ResponseSignupDto = CommonResponse<{
  id: number; // 생성된 사용자 ID
  email: string; // 등록된 이메일
  name: string; // 사용자 이름
  bio?: string | null; // 자기소개
  avatar?: string | null; // 프로필 이미지 URL
  createdAt: Date; // 계정 생성 일시
  updatedAt: Date; // 마지막 수정 일시
}>;

// ==================== 로그인 관련 타입 ====================

/**
 * 로그인 요청 시 보내는 데이터 타입
 */
export type RequestSigninDto = {
  email: string; // 사용자 이메일
  password: string; // 비밀번호
};

/**
 * 로그인 성공 시 서버로부터 받는 응답 타입
 */
export type ResponseSigninDto = CommonResponse<{
  id: number; // 사용자 ID
  name: string; // 사용자 이름
  accessToken: string; // JWT 액세스 토큰 (API 인증에 사용)
  refreshToken: string; // JWT 리프레시 토큰 (액세스 토큰 갱신에 사용)
}>;

// ==================== 내 정보 조회 타입 ====================

/**
 * 내 정보 조회 시 서버로부터 받는 응답 타입
 * 로그인된 사용자의 상세 정보를 담고 있음
 */
export type ResponseMyInfoDto = CommonResponse<{
  id: number; // 사용자 ID
  email: string; // 이메일
  name: string; // 사용자 이름
  bio?: string | null; // 자기소개
  avatar?: string | null; // 프로필 이미지 URL
  createdAt: Date; // 계정 생성 일시
  updatedAt: Date; // 마지막 수정 일시
}>;
