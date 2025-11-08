import { useLocation, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { type UserSigninInformation, validateSignin } from "../utils/validate";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import googleLogo from "../assets/google.svg"

const LoginPage = () => {
  const { login, accessToken } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  useEffect(() => {
    if(accessToken) {
      navigate("/")
    }
  }, [navigate, accessToken])
  

  const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateSignin,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(values);
      navigate(from, {replace: true})
    } catch(error) {
      alert("로그인 실패")
      console.error("로그인 실패 ", error)
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login"
  }

  // 오류가 1개 이상이거나 입력값이 비어있으면 버튼 비활성화
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) || // 오류가 있으면 true
    Object.values(values).some((value) => value === "") // 입력값이 비어있으면 true
  
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full gap-6 bg-black text-white font-sans">
        <div className="w-[300px]">
          <div className="flex relative justify-center my-6">
            <button className="absolute top-0 left-3 font-semibold cursor-pointer" onClick={() => navigate(-1)}>&lt;</button>
            <h2 className="text-xl">로그인</h2>
          </div>
          <div>
            <button className="flex justify-center items-center w-full gap-3 py-3 border border-neutral-700 rounded-md hover:bg-neutral-900 transition-colors cursor-pointer" onClick={handleGoogleLogin}>
              <img src={googleLogo} alt="google" className="w-5 h-5"/>
              <span className="text-base">구글 로그인</span>
            </button>
          </div>
          <div className="flex flex-row w-full justify-center items-center text-white my-4">
            <div className="flex-1 border-t-2 border-white"></div>
            <div className="text-base mx-8">OR</div>
            <div className="flex-1 border-t-2 border-white"></div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-white">
            <input
              {...getInputProps("email")}
              name="email"
              type={'email'}
              className={`border border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm ${errors?.email && touched?.email ? "border-red-500" : "border-gray-300"}`}
              placeholder={'이메일'}
            />
            {errors?.email && touched?.email && (<div className="text-red-500 text-sm">{errors.email}</div>)}
            <input
              {...getInputProps("password")}
              type={'password'}
              className={`border border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm ${errors?.password && touched?.password ? "border-red-500 bg-red-100" : "border-gray-300"}`}
              placeholder={'비밀번호'}
            />
            {errors?.password && touched?.password && (<div className="text-red-500 text-sm">{errors.password}</div>)}
            <button
              type="submit"
              disabled={isDisabled}
              className={'w-full bg-blue-600 text-white py-3 rounded-md text-base font-medium hover:bg-blue-700 transition-color cursor-pointer disabled:bg-gray-800'}>로그인</button>
          </form>
        </div>

      </div>
    </>
  )
}

export default LoginPage;