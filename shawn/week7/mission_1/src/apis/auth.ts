/**
 * ========================================
 * 인증(Authentication) 관련 API 함수들
 * ========================================
 *
 * 회원가입, 로그인, 로그아웃, 내 정보 조회 등
 * 사용자 인증과 관련된 모든 API 요청을 처리합니다.
 */

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

/**
 * 회원가입 API
 * 새로운 사용자 계정을 생성합니다.
 *
 * @param body - 회원가입에 필요한 정보 (이메일, 비밀번호, 이름 등)
 * @returns 생성된 사용자 정보
 *
 * 사용 예시:
 * const result = await postSignup({
 *   email: 'user@example.com',
 *   password: 'password123',
 *   name: '홍길동'
 * });
 */
export const postSignup = async (
  body: RequestSingupDto
): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post(`/v1/auth/signup`, body);
  return data;
};

/**
 * 로그인 API
 * 이메일과 비밀번호로 로그인하여 인증 토큰을 받습니다.
 *
 * @param body - 로그인에 필요한 정보 (이메일, 비밀번호)
 * @returns 사용자 정보 및 JWT 토큰 (accessToken, refreshToken)
 *
 * 사용 예시:
 * const result = await postSignin({
 *   email: 'user@example.com',
 *   password: 'password123'
 * });
 * // result.data.accessToken, result.data.refreshToken
 */
export const postSignin = async (
  body: RequestSigninDto
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post(`/v1/auth/signin`, body);
  return data;
};

/**
 * 내 정보 조회 API
 * 현재 로그인한 사용자의 상세 정보를 조회합니다.
 *
 * @returns 로그인한 사용자의 프로필 정보 (ID, 이메일, 이름, 자기소개 등)
 *
 * 주의: 이 함수는 localStorage에서 accessToken을 가져와 Authorization 헤더에 추가합니다.
 * 로그인 상태에서만 호출해야 합니다.
 */
export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { data } = await axiosInstance.get(`/v1/users/me`, {
    headers: {
      Authorization: `Bearer ${getItem()}`,
    },
  });
  return data;
};

/**
 * 로그아웃 API
 * 현재 로그인한 사용자를 로그아웃 처리합니다.
 * 서버에 로그아웃 요청을 보내 토큰을 무효화합니다.
 *
 * @returns 로그아웃 처리 결과
 *
 * 주의: 이 함수 호출 후에는 로컬에 저장된 토큰도 삭제해야 합니다.
 */
export const postLogout = async () => {
  const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { data } = await axiosInstance.post(
    `/v1/auth/signout`,
    {}, // POST 요청이므로 body가 필요하지만 내용은 없음
    {
      headers: {
        Authorization: `Bearer ${getItem()}`,
      },
    }
  );
  return data;
};

/**
 * 유저 정보 수정 API
 * 사용자의 프로필 정보(이름, bio, 프로필 사진)를 수정합니다.
 *
 * @param updateData - 수정할 정보 (name, bio, avatar)
 * @returns 수정된 사용자 정보
 */
export const updateUserProfile = async (updateData: {
  name?: string;
  bio?: string;
  avatar?: string;
}): Promise<ResponseMyInfoDto> => {
  const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { data } = await axiosInstance.patch(`/v1/users`, updateData, {
    headers: {
      Authorization: `Bearer ${getItem()}`,
    },
  });
  return data;
};

/**
 * 회원 탈퇴 API
 * 현재 로그인한 사용자의 계정을 삭제합니다.
 *
 * @returns 탈퇴 처리 결과
 */
export const deleteAccount = async () => {
  const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { data } = await axiosInstance.delete(`/v1/users`, {
    headers: {
      Authorization: `Bearer ${getItem()}`,
    },
  });
  return data;
};
