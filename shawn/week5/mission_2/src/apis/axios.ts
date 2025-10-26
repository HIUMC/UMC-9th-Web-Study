/**
 * ========================================
 * Axios 설정 및 인터셉터 관리
 * ========================================
 *
 * 이 파일은 Axios 인스턴스를 생성하고 요청/응답 인터셉터를 설정합니다.
 *
 * 주요 기능:
 * 1. 요청 인터셉터: 모든 API 요청에 자동으로 Authorization 헤더 추가
 * 2. 응답 인터셉터: 401 에러 발생 시 자동으로 토큰 갱신 시도
 * 3. 토큰 갱신: refresh token을 사용하여 새로운 access token 발급
 * 4. 중복 요청 방지: 동시에 여러 요청이 401을 받을 때 중복 refresh 방지
 * 5. 에러 처리: 토큰 갱신 실패 시 자동 로그아웃 처리
 *
 * 사용법:
 * import { axiosInstance } from './apis/axios';
 * const response = await axiosInstance.get('/api/data');
 */

import axios, { type InternalAxiosRequestConfig, type AxiosError } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

/**
 * 커스텀 Axios 요청 설정 인터페이스
 * _retry 플래그를 추가하여 토큰 갱신 재시도 여부를 추적
 */
interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/**
 * 토큰 갱신 API 응답 타입 정의
 * 서버에서 반환하는 토큰 갱신 응답 구조
 */
interface RefreshResponse {
  data: {
    data: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

/**
 * 전역 변수로 refresh 요청의 Promise를 저장
 * 동시에 여러 요청이 401 에러를 받을 때 중복 refresh 요청을 방지
 */
let refreshPromise: Promise<string> | null = null;

/**
 * ========================================
 * 로컬 스토리지 헬퍼 함수들
 * ========================================
 * React 훅을 사용할 수 없는 인터셉터에서 사용하기 위한 유틸리티 함수들
 */

/**
 * 로컬 스토리지에서 값을 안전하게 읽어오는 함수
 * @param key - 읽어올 키 이름
 * @returns 저장된 값 또는 null (에러 시)
 */
const getLocalStorageItem = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`로컬 스토리지에서 ${key} 읽기 실패:`, error);
    return null;
  }
};

/**
 * 로컬 스토리지에 값을 안전하게 저장하는 함수
 * @param key - 저장할 키 이름
 * @param value - 저장할 값
 */
const setLocalStorageItem = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`로컬 스토리지에 ${key} 저장 실패:`, error);
  }
};

/**
 * 로컬 스토리지에서 값을 안전하게 삭제하는 함수
 * @param key - 삭제할 키 이름
 */
const removeLocalStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`로컬 스토리지에서 ${key} 삭제 실패:`, error);
  }
};

/**
 * 인증 관련 토큰들을 모두 삭제하는 함수
 * 로그아웃 시 또는 토큰 갱신 실패 시 사용
 */
const clearAuthTokens = (): void => {
  removeLocalStorageItem(LOCAL_STORAGE_KEY.accessToken);
  removeLocalStorageItem(LOCAL_STORAGE_KEY.refreshToken);
};

/**
 * ========================================
 * Axios 인스턴스 생성
 * ========================================
 * 기본 설정으로 axios 인스턴스를 생성
 */
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

/**
 * ========================================
 * 요청 인터셉터 (Request Interceptor)
 * ========================================
 * 모든 API 요청 전에 실행되는 인터셉터
 * 로컬 스토리지에서 access token을 읽어와 Authorization 헤더에 자동으로 추가
 */
axiosInstance.interceptors.request.use(
  (config: CustomInternalAxiosRequestConfig) => {
    // 로컬 스토리지에서 access token을 가져옴
    const accessToken = getLocalStorageItem(LOCAL_STORAGE_KEY.accessToken);

    // access token이 존재하면 Authorization 헤더에 Bearer 토큰으로 추가
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // 수정된 요청 설정을 반환
    return config;
  },

  // 요청 인터셉터에서 에러가 발생하면 그대로 에러를 전파
  (error: AxiosError) => Promise.reject(error)
);

/**
 * ========================================
 * 응답 인터셉터 (Response Interceptor)
 * ========================================
 * 모든 API 응답 후에 실행되는 인터셉터
 * 401 Unauthorized 에러 발생 시 자동으로 토큰 갱신을 시도
 */
axiosInstance.interceptors.response.use(
  // 정상 응답은 그대로 반환
  (response) => response,

  // 에러 응답 처리
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomInternalAxiosRequestConfig;

    // 401 에러이면서, 아직 재시도하지 않은 요청인지 확인
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      // refresh 엔드포인트에서 401 에러가 발생한 경우
      // (refresh token도 만료된 상황) → 로그아웃 처리
      if (originalRequest.url === "/v1/auth/refresh") {
        clearAuthTokens();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // 재시도 플래그를 설정하여 무한 루프 방지
      originalRequest._retry = true;

      // 이미 refresh 요청이 진행 중이면, 그 Promise를 재사용
      // (동시에 여러 요청이 401을 받을 때 중복 refresh 방지)
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken();
      }

      try {
        // 진행 중인 refresh Promise가 완료될 때까지 대기
        const newAccessToken = await refreshPromise;

        // 원본 요청의 Authorization 헤더를 새로운 access token으로 업데이트
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // 업데이트된 요청을 다시 실행
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // refresh 실패 시 모든 토큰을 삭제하고 로그인 페이지로 이동
        clearAuthTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // 401 에러가 아닌 경우에는 에러를 그대로 전파
    return Promise.reject(error);
  }
);

/**
 * ========================================
 * 토큰 갱신 함수 (Refresh Access Token)
 * ========================================
 * refresh token을 사용하여 새로운 access token을 받아오는 함수
 * 이 함수는 응답 인터셉터에서 호출되며, 토큰 갱신 로직을 담당
 */
const refreshAccessToken = async (): Promise<string> => {
  try {
    // 로컬 스토리지에서 refresh token을 가져옴
    const refreshToken = getLocalStorageItem(LOCAL_STORAGE_KEY.refreshToken);

    // refresh token이 없으면 에러 발생
    if (!refreshToken) {
      throw new Error("Refresh token이 없습니다.");
    }

    // 서버에 refresh 요청을 보내서 새로운 토큰들을 받아옴
    const { data }: RefreshResponse = await axiosInstance.post(
      "/v1/auth/refresh",
      {
        refresh: refreshToken,
      }
    );

    // 새로 받은 토큰들을 로컬 스토리지에 저장
    setLocalStorageItem(LOCAL_STORAGE_KEY.accessToken, data.data.accessToken);
    setLocalStorageItem(LOCAL_STORAGE_KEY.refreshToken, data.data.refreshToken);

    // 새로운 access token을 반환 (다른 요청들이 사용할 수 있도록)
    return data.data.accessToken;
  } catch (error) {
    // refresh 실패 시 모든 토큰을 삭제
    clearAuthTokens();
    throw error;
  } finally {
    // Promise 완료 후 전역 변수를 null로 초기화
    // (다음 401 에러 시 새로운 refresh 요청을 할 수 있도록)
    refreshPromise = null;
  }
};
