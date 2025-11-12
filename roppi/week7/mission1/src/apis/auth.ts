import type { RequestSigninDto, RequestSignupDto, ResponseMyInfoDto, ResponseSigninDto, ResponseSignupDto } from "../types/auth"
import { axiosInstance } from "./axios";

export const postSignup = async (body : RequestSignupDto) : Promise<ResponseSignupDto> => {
  const {data} = await axiosInstance.post(
    import.meta.env.VITE_SERVER_API_URL + "/v1/auth/signup",
    body,
  );

  return data;
}

export const postSignin = async (body: RequestSigninDto): Promise<ResponseSigninDto> => {
  const {data} = await axiosInstance.post(
    '/v1/auth/signin', 
    body
  )
  console.log("로그인 토큰:", data.accessToken);

  return data;
}



export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  let token = localStorage.getItem("accessToken");
  if (token) {
    token = token.replace(/"/g, ""); 
  }
console.log("토큰")
  console.log(token);

  const { data } = await axiosInstance.get("/v1/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,  
    },
  });
  console.log(data);

  return data;
};

export const postLogout = async () => {
  const {data} = await axiosInstance.post("/v1/auth/signout");
  return data;
}
