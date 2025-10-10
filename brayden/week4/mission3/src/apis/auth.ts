import type {
  RequestSigninDto,
  RequestSignupDto,
  ResponseMyInfoDto,
  ResponseSigninDto,
  ResponseSignupDto,
} from "../types/auth";
import axiosInstance from "./axios";

export const postSignup = async (
  body: RequestSignupDto
): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signup", body);

  return data;
};

export const postSignin = async (
  body: RequestSigninDto
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);

  return data;
};

// export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
//   const { data } = await axiosInstance.get("/v1/users/me", {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem(
//         LOCAL_STORAGE_KEY.accessToken
//       )}`,
//     },
//   });

//   return data;
// };

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  // 인터셉터가 토큰을 자동으로 추가해주므로,
  // 여기서 헤더를 수동으로 설정할 필요가 없습니다.
  const { data } = await axiosInstance.get("/v1/users/me");

  return data;
};
