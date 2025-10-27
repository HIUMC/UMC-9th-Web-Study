import { validateSignin, type UserSigninInformation } from "../utils/validate";
import UseForm from "../hooks/useForm";
import { Link, useNavigate } from "react-router-dom";
import googleLogo from "../assets/googleLogo.png";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const LoginPage = () => {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [navigate, accessToken]);

  const { values, errors, touched, getInputProps } =
    UseForm<UserSigninInformation>({
      intialValue: { email: "", password: "" },
      validate: validateSignin,
    });

  //   const handleChange = (name: string, text: string) => {
  //     setFormValues({
  //       ...formValues,
  //       [name]: text,
  //     });
  //   };

  const handleSubmit = async () => {
    await login(values);

    // console.log(values);
    // try {
    //   const response = await postSignin(values);
    //   setItem(response.data.accessToken);
    //   console.log(response);
    //   //localStorage.setItem("accessToken", response.data.accessToken); // 로그인 성공 시 accessToken을 로컬 스토리지에 저장
    // } catch (error) {
    //   // Axios 에러인 경우 서버의 응답 메시지를 보여줄 수 있습니다.
    //   if (isAxiosError(error)) {
    //     alert(error.response?.data?.message || "요청 중 오류가 발생했습니다.");
    //   }
    //   // 일반적인 Error 객체인 경우
    //   else if (error instanceof Error) {
    //     alert(error.message);
    //   }
    //   // 그 외의 경우
    //   else {
    //     alert("알 수 없는 오류가 발생했습니다.");
    //   }
    // }
  };
  // 오류가 하나라도 있거나, 입력값이 비어있다면 버튼을 disabled
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) || // 오류가 있으면 true
    Object.values(values).some((value) => value === ""); // 입력값이 비어있으면 true

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
        <button className="grid grid-cols-3 w-full border items-center justify-center border-[#ccc] text-white p-[10px] rounded-sm bg-transparent">
          <img src={googleLogo} alt="googlelogo" className="w-5 h-5" />
          <span className="text-center">구글 로그인</span>
        </button>
        <div className="grid grid-cols-3 items-center w-[300px]">
          <div className="h-px bg-white"></div>
          <span className="text-center text-white">OR</span>
          <div className="h-px bg-white"></div>
        </div>
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
          disabled={isDisabled}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-900"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
