import type {  MyPageDto, RequestSigninDto, RequestSignupDto, ResponseMyInfoDto, ResponseSigninDto, ResponseSignupDto, UploadAvatarResponse } from "../types/auth"
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


export const updateMy = async (
  updateMypage: MyPageDto
): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.patch(`/v1/users`, updateMypage);
    console.log(data)

  return data;
};

export const uploadAvatar = async (formData: FormData): Promise<UploadAvatarResponse> => {
  try {
    const { data } = await axiosInstance.post("/v1/users/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // data: { url: "https://..." }
    return data;
  } catch (err) {
    console.error("이미지 업로드 실패", err);
    throw err;
  }
};

export const deleteUser = async () => {
  const { data } = await axiosInstance.delete("/v1/users");
  return data;
};