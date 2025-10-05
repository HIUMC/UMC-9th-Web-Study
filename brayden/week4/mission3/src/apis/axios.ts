import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
// import { useLocalStorage } from "../hooks/useLocalStorage";
// import { config } from "zod";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      LOCAL_STORAGE_KEY.accessToken
    )}`,
  },
});

// axiosInstance.interceptors.request.use(() => {
//   const {getItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
//   const token = getItem();

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config
// }

export default axiosInstance;
