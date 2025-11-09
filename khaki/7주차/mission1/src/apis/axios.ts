// <axios 라이브러리를 커스텀해서 만든 전용 요청도우미 객체>
import axios, { type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

// axios 인스턴스의 요청 인터셉터에서 사용할 커스텀 타입 정의
interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; //요청 재시도 여부를 나타내는 플래그(특정 상태나 조건을 표시하기 위한 불리언 변수)
}

// 전역변수로 refresh 요청의 Promise를 저장해서 중복요청을 방지한다.
let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create(
  //axios 인스턴스를 만듬, 이 안에서 모든 요청이 공통적으로 쓸 설정을 지정
  {
    // 모든 요청의 기본 주소를 지정(.env 파일에 정의된 환경변수로 불러옴)
    baseURL: import.meta.env.VITE_SERVER_API_URL,
  }
);

// 요청 인터셉터: 모든 요청이 서버로 전송되기 전에 실행되는 함수
axiosInstance.interceptors.request.use(
  (config: CustomInternalAxiosRequestConfig) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem();

    // accessToken이 있으면 요청 헤더에 추가
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // 수정된 설정 객체를 반환하여 요청이 계속 진행되도록 함
    return config;
  },

  // 요청 에러가 발생한 경우
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 모든 응답이 처리된 후에 실행되는 함수
axiosInstance.interceptors.response.use(
  (response) => response, //응답이 정상적이면 그대로 반환
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    // 401 에러(인증 실패)이고, 아직 재시도하지 않은 요청인 경우
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (originalRequest.url === "/v1/auth/refresh") {
        const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
        const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
        removeAccessToken();
        removeRefreshToken();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // 재시도 플래그 설정
      originalRequest._retry = true;

      // 이미 refresh 요청이 진행 중인 경우, 기존의 Promise를 재사용
      if (!refreshPromise) {
        // refresh 요청 실행 후, promise를 전역변수에 할당
        refreshPromise = (async () => {
          const { getItem: getRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
          const refreshToken = getRefreshToken();

          const { data } = await axiosInstance.post("/v1/auth/refresh", {
            refresh: refreshToken,
          });

          // 새토큰이 반환
          const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
          const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);

          // 새 accessToken 반환하여 다른 요청들이 이걸 사용할 수 있게 함
          return data.data.accessToken;
        })()
          .catch(() => {
            const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
            const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
            removeAccessToken();
            removeRefreshToken();
          })
          .finally(() => {
            // refresh 요청이 끝나면 전역변수를 초기화
            refreshPromise = null;
          });
      }

      // 진행중인 refresh 요청이 완료될 때까지 대기
      return refreshPromise.then((newAccessToken) => {
        // 원래의 요청에 새 토큰을 추가하여 재시도
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        // 업데이트 된 원본 요청을 재시도한다.
        return axiosInstance(originalRequest);
      });
    }
    // 401 이외의 에러이거나 이미 재시도한 요청인 경우, 에러를 그대로 반환
    return Promise.reject(error);
  }
);
