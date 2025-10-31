import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
})

// Request interceptor - 매 요청마다 최신 토큰을 헤더에 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    if (token) {
      // JSON.parse를 사용하여 따옴표 제거 (useLocalStorage에서 JSON.stringify로 저장했기 때문)
      const parsedToken = JSON.parse(token);
      config.headers.Authorization = `Bearer ${parsedToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);