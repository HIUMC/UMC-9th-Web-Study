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