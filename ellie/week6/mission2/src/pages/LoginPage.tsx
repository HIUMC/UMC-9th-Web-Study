import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import InputForm from "../components/LoginInputForm";
import useForm from "../hooks/useForm";
import validateSignin, { type userSigninInformation } from "../utils/validate";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const LoginPage = () => {
    const { login, accessToken } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      if (accessToken) {
        const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");

        navigate(redirectPath, { replace: true });
      }
    }, [accessToken, navigate, location.state]);
  };

  const { values, errors, touched, getInputProps } =
    useForm<userSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    await login(values);

    const redirectPath = location.state?.from || "/my";
    navigate(redirectPath, { replace: true });
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };
  // 오류가하나라도 있거나, 입력값이 비어있으면 버튼 비활성화
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) || // 오류가 있으면 true
    Object.values(values).some((value) => value === ""); // 입력값이 비어 있으면 true

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col justify-center">
        <div className="relative w-[300px] mb-5">
          <BackButton />
          <h1 className="text-center font-bold text-3xl">로그인</h1>
        </div>
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={!isDisabled}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          <div className="relative flex justify-center items-center">
            <img
              className="w-9 h-9 absolute left-10"
              src="/images/googlelogo.svg"
              alt="Google Logo Image"
            />
            <span>구글 로그인</span>
          </div>
        </button>
        <div className="mt-5 flex items-center justify-between">
          <div className="w-[100px] h-px bg-black" />
          <h2 className="text-center"> OR </h2>
          <div className="w-[100px] h-px bg-black" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <InputForm
          name="email"
          type="email"
          placeholder="이메일을 입력하세요"
          error={errors?.email}
          touched={touched?.email}
          getInputProps={getInputProps}
        />
        <InputForm
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          error={errors?.password}
          touched={touched?.password}
          getInputProps={getInputProps}
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          로그인
        </button>
      </div>
    </div>
  );
}
