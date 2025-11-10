import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";
import { postSignin } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const LoginPage = () => {
  const { login, accessToken } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (accessToken) {
      nav("/");
    }
  }, [nav, accessToken]);

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    await login(values);
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "v1/auth/google/login";
  };

  const isDisabled =
    Object.values(errors || {}).some((errors) => errors.length > 0) ||
    Object.values(values).some((value) => value === "");
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[80%] gap-4">
        <div className="flex justify-between w-[25%] text-xl font-bold p-4">
          <h1 onClick={() => nav("/")} className="font-bold cursor-pointer">
            &lt;
          </h1>
          <h1>로그인</h1>
          <h1 className="invisible">&gt;</h1>
        </div>
        <form className="flex flex-col gap-3 w-[25%]">
          <input
            {...getInputProps("email")}
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요!"
            className="border rounded-md p-2"
          ></input>
          {errors?.email && touched?.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}
          <input
            {...getInputProps("password")}
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요!"
            className="border rounded-md p-2"
          ></input>
          {errors?.password && touched?.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}
          <button
            className="p-2 bg-blue-900 rounded-md hover:bg-gray-800 transition-all disabled:bg-gray-500 cursor-pointer"
            onClick={handleSubmit}
            type="button"
            disabled={isDisabled}
          >
            로그인
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            //disabled={isDisabled}
            className="bg-green-900 rounded-md hover:bg-blue-900 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-center gap-4 p-2">
              <img src={"/images/googleLogo.svg"} alt="Google Logo Image" />
              <span>구글 로그인</span>
            </div>
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
