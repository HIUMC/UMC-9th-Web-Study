import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import googleLogo from "../assets/images/web_neutral_rd_na@1x.png";
import usePostSignin from "../hooks/mutations/usePostSignin";

const LoginPage = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // URL에서 redirect 매개변수 가져오기
  const redirectPath = searchParams.get("redirect") || "/";
  //  기본값을 "/"로 설정

  useEffect(() => {
    if (accessToken) {
      // 로그인 성공 시 redirect 경로로 이동
      navigate(redirectPath);
    }
  }, [navigate, accessToken, redirectPath]);

  const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateSignin,
  });

  const { mutateAsync: login2 } = usePostSignin();

  const handleSubmit = async () => {
    // login(values);
    await login2(values);
  };

  // 1. 구글 로그인 핸들러: 구글 로그인 URL로 리다이렉트(실제 페이지 이동)
  const handleGoogleLogin = () => {
    // redirect 정보를 구글 로그인 URL에 포함
    const googleLoginUrl = import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
    const redirectParam = encodeURIComponent(redirectPath);
    window.location.href = `${googleLoginUrl}?redirect=${redirectParam}`;
  };

  // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    // 오류가 있으면 true
    Object.values(values).some((value) => value === "");
  // 입력값이 비어있으면 true

  return (
    <div className="text-white flex flex-col items-center justify-center gap-3">
      <div className="text-2xl font-bold text-center mb-6">로그인</div>
      {/* 로그인 문자 */}

      <button
        // 구글로그인 버튼 전용 핸들러
        onClick={handleGoogleLogin}
        className="w-[300px] p-2.5 flex items-center justify-center gap-2 border rounded-md"
      >
        <img src={googleLogo} alt="Google Logo" className="w-8 h-8" />
        <span className="font-bold">구글 로그인</span>
      </button>
      {/* 구글 로그인 버튼 */}

      <div className="w-[300px] flex items-center my-2">
        <div className="h-px bg-gray-300 flex-1"></div>
        <span className="px-3 text-white text-xl font-bold">OR</span>
        <div className="h-px bg-gray-300 flex-1"></div>
      </div>
      {/* OR 구분선 */}

      <input
        {...getInputProps("email")}
        className={`bg-transparent border border-[#ccc] w-[300px] p-2.5 focus:border-[#807bff] rounded-md 
            ${errors?.email && touched?.email ? "border-red-500" : "border-gray-300"}`}
        // 오류가 있고, 사용자가 이미 해당 필드를 한번이라도 건드렸다면
        type="email"
        placeholder="이메일"
      />
      {errors?.email && touched?.email && <div className="text-red-500 text-sm">{errors.email}</div>}
      {/* 오류가 있고, 사용자가 이미 해당 필드를 한번이라도 건드렸다면 오류메시지 출력 */}

      <input
        {...getInputProps("password")}
        className={`bg-transparent border border-[#ccc] w-[300px] p-2.5 focus:border-[#807bff] rounded-md ${
          errors?.password && touched?.password ? "border-red-500" : "border-gray-300"
        }`}
        type="password"
        placeholder="비밀번호"
      />
      {errors?.password && touched?.password && <div className="text-red-500 text-sm">{errors.password}</div>}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={isDisabled}
        className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
      >
        로그인
      </button>
    </div>
  );
};

export default LoginPage;
