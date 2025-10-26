/**
 * ========================================
 * Axios 인스턴스 및 인터셉터 설정
 * ========================================
 *
 * 이 파일은 API 요청을 위한 axios 인스턴스를 생성하고,
 * 요청/응답 인터셉터를 통해 인증 토큰 관리 및 자동 갱신을 처리합니다.
 *
 * 주요 기능:
 * 1. 요청 인터셉터: 모든 API 요청에 자동으로 Authorization 헤더 추가
 * 2. 응답 인터셉터: 401 에러 발생 시 자동으로 토큰 갱신 후 재시도
 * 3. 중복 방지: 동시 다발적인 401 에러 시 refresh 요청을 한 번만 실행
 */

import axios, { type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

/**
 * 커스텀 Axios 요청 설정 인터페이스
 * _retry: 토큰 갱신 후 재시도 여부를 추적하는 플래그 (무한 루프 방지)
 */
interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/**
 * 전역 변수: refresh 토큰 갱신 Promise
 * 동시에 여러 요청이 401을 받을 때, 중복 refresh 요청을 방지하기 위해 사용
 * 첫 번째 401 에러가 refresh를 시작하면, 이후 401 에러들은 이 Promise를 재사용
 */
let refreshPromise: Promise<string> | null = null;

/**
 * Axios 인스턴스 생성
 * baseURL: 환경변수에서 API 서버 주소를 가져옴
 * headers: 초기 Authorization 헤더 설정 (실제로는 요청 인터셉터에서 동적으로 갱신됨)
 */
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      LOCAL_STORAGE_KEY.accessToken
    )}`,
  },
});

/**
 * ========================================
 * 요청 인터셉터 (Request Interceptor)
 * ========================================
 *
 * 모든 API 요청이 서버로 전송되기 전에 실행됩니다.
 * localStorage에서 최신 accessToken을 가져와 Authorization 헤더에 자동으로 추가합니다.
 *
 * 동작 과정:
 * 1. useLocalStorage 훅을 사용하여 accessToken 가져오기
 * 2. accessToken이 존재하면 Authorization 헤더에 Bearer 토큰 형식으로 추가
 * 3. 수정된 config를 반환하여 요청 진행
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem();

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * ========================================
 * 응답 인터셉터 (Response Interceptor)
 * ========================================
 *
 * 모든 API 응답을 받은 후 실행됩니다.
 * 401 Unauthorized 에러가 발생하면 자동으로 토큰을 갱신하고 원래 요청을 재시도합니다.
 *
 * 동작 과정:
 * 1. 정상 응답(2xx)은 그대로 반환
 * 2. 401 에러 발생 시:
 *    a. refresh 엔드포인트 자체에서 401 발생 → 로그아웃 처리 (refresh token도 만료됨)
 *    b. 일반 API에서 401 발생 → refresh token으로 새 토큰 발급 후 재시도
 * 3. 동시 다발적인 401 에러 시 첫 번째 요청만 refresh를 실행하고, 나머지는 대기
 * 4. 토큰 갱신 성공 시 원래 요청을 새 토큰으로 재시도
 * 5. 토큰 갱신 실패 시 모든 토큰 삭제 후 에러 전파
 */
axiosInstance.interceptors.response.use(
  (response) => response, // 정상 응답은 그대로 반환
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    // 401 에러이면서 아직 재시도하지 않은 요청인 경우 처리
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      // Case 1: refresh 엔드포인트에서 401 에러 발생 (refresh token도 만료됨)
      // → 로그아웃 처리 후 로그인 페이지로 리다이렉트
      if (originalRequest.url === "/v1/auth/refresh") {
        const { removeItem: removeAccessToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.accessToken
        );
        const { removeItem: removeRefreshToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.refreshToken
        );
        removeAccessToken();
        removeRefreshToken();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // Case 2: 일반 API에서 401 에러 발생 (access token 만료)
      // → refresh token으로 새 토큰 발급 후 재시도

      // 재시도 플래그 설정 (무한 루프 방지)
      originalRequest._retry = true;

      // 중복 refresh 방지: 이미 진행 중인 refresh가 없으면 새로 시작
      if (!refreshPromise) {
        refreshPromise = (async () => {
          // 1. localStorage에서 refresh token 가져오기
          const { getItem: getRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );
          const refreshToken = getRefreshToken();

          // 2. refresh 엔드포인트로 새 토큰 요청
          const { data } = await axiosInstance.post("/v1/auth/refresh", {
            refresh: refreshToken,
          });

          // 3. 새로 발급받은 토큰들을 localStorage에 저장
          const { setItem: setAccessToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.accessToken
          );

          const { setItem: setRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );

          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);

          // 4. 새 accessToken 반환 (다른 대기 중인 요청들이 사용)
          return data.data.accessToken;
        })()
          .catch((error) => {
            // refresh 실패 시 모든 토큰 삭제
            const { removeItem: removeAccessToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.accessToken
            );
            const { removeItem: removeRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken
            );
            removeAccessToken();
            removeRefreshToken();
            throw error;
          })
          .finally(() => {
            // refresh 완료 후 전역 Promise 초기화
            refreshPromise = null;
          });
      }

      // 진행 중인(또는 방금 시작한) refresh가 완료될 때까지 대기
      return refreshPromise.then((newAccessToken) => {
        // 원본 요청의 Authorization 헤더를 새 토큰으로 업데이트
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        // 업데이트된 요청을 다시 실행
        return axiosInstance.request(originalRequest);
      });
    }

    // 401이 아닌 다른 에러는 그대로 전파
    return Promise.reject(error);
  }
);
