import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";


export const axiosInstance = axios.create({
    baseURL : import.meta.env.VITE_SERVER_API_URL,
    headers : {
        Authorization : `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)}`
    },
    // withCredentials : true, 쿠키
})


axiosInstance.interceptors.request.use((config) => {
    const {getItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const token = getItem();

    if (token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
});