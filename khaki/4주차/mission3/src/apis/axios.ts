import axios from 'axios'
import { LOCAL_STORAGE_KEY } from '../constants/key';


export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
      Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)}`,
    },
  // authorization 헤더에 들어있는 accessToken은 “요청자(클라이언트, 즉 프론트엔드)가 직접 넣어서 서버로 보내주는 것
});