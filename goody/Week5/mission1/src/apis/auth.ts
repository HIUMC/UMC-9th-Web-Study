import type { RequestSigninDto, RequestSignupDto, ResponseMyInfoDto, ResponseSigninDto, ResponseSignupDto } from "../types/auth"
import { axiosInstance } from "./axios";

export const postSignup = async ( 
    body : RequestSignupDto
):Promise<ResponseSignupDto> => { // 예상되는 반환 타입 : Promise
    const { data } = await axiosInstance.post(
        "/v1/auth/signup", 
        body
    );

    return data;
};

export const postSignin = async ( 
    body : RequestSigninDto
):Promise<ResponseSigninDto> => {
    const { data } = await axiosInstance.post(
        "/v1/auth/signin", // 환경변수로 관리
        body
    );
    

    return data;
};

export const getMyInfo = async() : Promise<ResponseMyInfoDto> => {
    const {data} = await axiosInstance.get("/v1/users/me");
    return data;
}

export const postLogut = async() => {
    const {data} = await axiosInstance.post("v1/auth/signout");
    return data;
};

// axios가 HTTP 요청을 보내기 직전에 자동으로 '인증 토큰'을 헤더에 추가해주는 "요청 인터셉터(Request Interceptor)"
// 안하면 token에 ""이 첨가됨
// axiosInstance.interceptors.request.use((config) => {
//     const {getItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
//     const token = getItem(); 

//     if (token){
//         config.headers.Authorization = `Bearer ${token}`
//     }

//     return config;
// });