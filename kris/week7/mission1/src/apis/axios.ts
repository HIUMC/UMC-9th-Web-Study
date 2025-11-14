import axios, { type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; // 요청 재시도 여부 나타내는 플래그
}

// 전역 변수로 refresh 요청의 Promise 저장하여 중복 요청 방지
let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
})


// 요청 인터셉터 - 모든 요청 전에 accessToken을 Authorization 헤더에 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const {getItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem();

    // accessToken 존재하면 헤더에 Bearer 토큰 추가
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    // 수정된 요청 설정 반환
    return config;
  },
  // 요청 인터셉터 실패 시 에러
  (error) => Promise.reject(error),
);

// 응답 인터셉터 - 401 에러 발생하면 refreshToken 통한 토큰 갱신 처리
axiosInstance.interceptors.response.use(
  (response) => response, // 정상 응답: 그대로 반환
  async(error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    // 401 에러이면서 아직 재시도하지 않은 요청 처리
    if(error.response && error.response.status === 401 && !originalRequest._retry) {
      // refresh 엔드포인트 401 에러 발생한 경우 (Unauthorized) 중복 재시도 방지 위해 로그아웃 처리
      if(originalRequest.url === '/v1/auth/refresh') {
        const {removeItem: removeAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
        const {removeItem: removeRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken)
        removeAccessToken()
        removeRefreshToken()
        window.location.href = "/login"
        return Promise.reject(error)
      }
      // 재시도 플래그 설정
      originalRequest._retry = true;

      // 이미 refresh 요청 진행 중이면 그 Promise 재사용
      if(!refreshPromise) {
        // refresh 요청 실행 후 Promise 전역 변수에 할당
        refreshPromise = (async() => {
          const {getItem: getRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken)
          const refreshToken = getRefreshToken()

          const {data} = await axiosInstance.post("/v1/auth/refresh", {
            refresh: refreshToken
          })

          // 새 토큰 반환
          const {setItem: setAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken)
          const {setItem: setRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken)
          setAccessToken(data.data.accessToken)
          setRefreshToken(data.data.refreshToken)
          
          // 새 accessToken을 반환하여 다른 요청들이 이것을 사용할 수 있도록 함
          return data.data.accessToken;
        })()
        .catch((error) => {
          const {removeItem: removeAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
          const {removeItem: removeRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken)
          removeAccessToken()
          removeRefreshToken()
        }).finally(() => {
          refreshPromise = null;
        })
      }

      // 진행 중인 refreshPromise가 해결될 때까지 기다림
      return refreshPromise.then((newAccessToken) => {
        // 원본 요청의 Authorization 헤더를 갱신된 토큰으로 업데이트
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
        // 업데이트 된 원본 요청 재시도
        return axiosInstance.request(originalRequest)
      })
    }
    // 401 에러가 아니면 그대로 오류 반환
    return Promise.reject()
  }
)