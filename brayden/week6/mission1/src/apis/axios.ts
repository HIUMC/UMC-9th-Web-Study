import axios, { type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; // 요청 재시도 여부를 나타내는 플래그
  // 서버에서 401 에러가 발생했을 때 리프레시 토큰을 한 번 요청
  // 이때 리프레시 토큰 요청이 401에러가 났을 경우 리프레시 토큰을 다시 요청하게 되는데
  // 이렇게 계속 요청하게 되면 무한 요청이 일어남.
}

// 전역변수로 refresh 요청의 Promise를 저장해서 중복 요청을 방지한다.
let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      LOCAL_STORAGE_KEY.accessToken
      // withCredentials: true -> 쿠키로 토큰 관리 시 필요
    )}`,
  },
});

// 요청 인터셉터 : 모든 요청 전에 accessToken을 Authorization 헤더에 추가한다.
// 헤더에 AccessToken을 추가하여 서버로 전달, 서버는 이 토큰을 보고 정상이면 데이터 응답
axiosInstance.interceptors.request.use(
  (config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem(); // localStorage에서 accessToken을 가져온다.

    // accessToken이 존재하면 Authorization 헤더에 Bearer 토큰 형식으로 추가한다.
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // 수정된 요청 설정 반환
    return config;
  },
  // 요청 인터셉터가 실패하면, 에러 발생
  (error) => Promise.reject(error)
);

// 응답 인터셉터 : 401 에러 발생 -> refresh 토큰을 통한 토큰 갱신을 처리
// accessToken 유효시간은 3초, 따라서 만료 시 401 에러 발생
// 401 에러 발생 시 재시도 X, 401 에러 발생해서 재시도 했는데 그럼에도 401 에러 발생, 처음부터 401에러가 아닌경우
axiosInstance.interceptors.response.use(
  // onFurfilled
  (response) => response, // 정상 응답 그대로 반환
  // onRejected
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    // 401 에러면서 아직 재시도 하지 않은 요청의 경우 처리
    // 추가로 프로젝트 하면서 백엔드 서버의 에러 설정에 따라 401이 아닌 다른 오류로 설정해야 할 수 있음.
    if (
      error.response &&
      error.response.status === 401 &&
      // error.response.errorCode === "AUTH_001" : 커스텀된 에러의 경우 이렇게 설정해야함.
      !originalRequest._retry
    ) {
      // refresh 엔드포인트(/v1/auth/refresh)에서 401 에러가 발생한 경우, 중복 재시도 방지를 위해 로그아웃 처리
      // 무한정 에러 발생 방지
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
      // 재시도 플래그를 true로 설정
      originalRequest._retry = true;

      // 이미 refresh 요청이 진행중인 경우, 그 Promise를 재사용한다.
      if (!refreshPromise) {
        // refresh 요청 실행 후 프러미스를 전역 변수에 할당
        refreshPromise = (async () => {
          const { getItem: getRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );
          const refreshToken = getRefreshToken();

          const { data } = await axiosInstance.post("/v1/auth/refresh", {
            refresh: refreshToken,
          });

          const { setItem: setAccessToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.accessToken
          );
          const { setItem: setRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );
          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);
          // 새 accessToken을 반환하여 다른 요청들이 이것을 사용할 수 있게 함.  -> 즉시 사용 함수 설정 해주어야 함.
          return data.data.accessToken;
          // 새 토큰이 반환
        })() // 즉시 사용 함수 설정
        .catch((error) => {
          const {removeItem : removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
          const {removeItem : removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken)
          removeAccessToken();
          removeRefreshToken();

        }).finally(() => {
          refreshPromise = null;
        });
      }
      // 진행중인 refreshPromise가 해결될 때까지 기다림
      return refreshPromise.then((newAccessToken) => {
        // 원본 요청의 Authorization 헤더를 갱신된 토큰으로 업데이트
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        // 업데이트 된 원본 요청을 재시도한다.
        return axiosInstance.request(originalRequest);
      })
    }
    // 401 에러가 아닌 경우 그대로 오류 반환
    return Promise.reject(error);
  }
);
