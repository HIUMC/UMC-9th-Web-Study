import { validateSignin, type UserSigninInformation } from "../utils/validate";
import UseForm from "../hooks/useForm";
import { Link, useLocation, useNavigate } from "react-router-dom";
import googleLogo from "../assets/googleLogo.png";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import usePostSignIn from "../hooks/mutations/usePostSignIn";

const LoginPage = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: signInMutate, isPending } = usePostSignIn();

  const from = location.state?.from || "/my";

  useEffect(() => {
    if (accessToken) {
      navigate(from, { replace: true });
    }
  }, [navigate, accessToken, from]);

  const { values, errors, touched, getInputProps } =
    UseForm<UserSigninInformation>({
      intialValue: { email: "", password: "" },
      validate: validateSignin,
    });

  // 구글 로그인 핸들러
  const handleGoogleLogin = () => {
    // "vite server ulr + /v1/auth/google/login"로 리다이렉트
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  const handleSubmit = () => {
    signInMutate(values, {
      onSuccess: () => {
        navigate("/", { replace: true });
      },
      onError: () => {
        alert("이메일 또는 비밀번호가 올바르지 않습니다!");
      },
    });
  };
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 bg-black">
      <div className="grid grid-cols-3 items-center w-[300px]">
        <Link
          to={"/"}
          className="text-xl text-white px-3 py-1 transition"
        >{`<`}</Link>
        <span className="text-white  text-center text-xl">로그인</span>
      </div>

      <div className="flex flex-col gap-3 w-[300px]">
        <input
          {...getInputProps("email")}
          name="email"
          className={`text-gray-100 border border-[#ccc], w-full p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.email && touched?.email
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          type="email"
          placeholder="이메일을 입력해주세요!"
        />
        {errors?.email && touched?.email && (
          <div className="text-sm text-red-500">{errors.email}</div>
        )}
        <input
          {...getInputProps("password")}
          className={`text-gray-100 border border-[#ccc], w-full p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.password && touched?.password
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          type="password"
          placeholder="비밀번호를 입력해주세요!"
        />
        {errors?.password && touched?.password && (
          <div className="text-sm text-red-500">{errors.password}</div>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-900"
        >
          로그인
        </button>
        {/* 구글 로그인 버튼 */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          // disabled={isDisabled}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-900"
        >
          <div className="flex items-center justify-center gap-4">
            {/* 구글 로그인 아이콘 */}
            <img src={googleLogo} alt="Google Logo Image" className="w-5 h-5" />
            <span>구글 로그인</span>
          </div>
        </button>
      </div>
    </div>
  );
};

// /v1/auth/google/login 페이지가 있어야 함. 그래서 구글 관련 페이지를 만들어 줘야함.

export default LoginPage;
