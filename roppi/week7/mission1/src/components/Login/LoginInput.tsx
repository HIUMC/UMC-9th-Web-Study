import { useForm } from "react-hook-form";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
 // AuthContext에서 가져오기

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginInput = () => {
  const { login, accessToken } = useAuth(); // context login 사용
  const [isLogin, setIsLogin] = useState(false);
  const nav = useNavigate();

  useEffect(()=> {
    if(accessToken && !isLogin){
      nav('/my');
    }
  },[nav, accessToken])
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLogin(true)
    try {
      await login(data); // context login 함수 호출
      console.log("로그인 성공!");
      nav("/"); // 로그인 성공 후 이동
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패");
    }
    finally{
      setIsLogin(false);
    }

  };

  const email = watch("email");
  const password = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex flex-col gap-[15px]">
        <EmailInput
          value={email || ""}
          error={errors.email?.message}
          {...register("email", {
            required: "이메일을 입력해 주세요.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "유효하지 않은 이메일 형식입니다.",
            },
          })}
        />
        <PasswordInput
          value={password || ""}
          placeholder="비밀번호를 입력해 주세요!"
          error={errors.password?.message}
          {...register("password", {
            required: "비밀번호를 입력해 주세요.",
            minLength: {
              value: 6,
              message: "비밀번호는 최소 6자 이상이어야 합니다.",
            },
          })}
        />
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-[7px] text-[#8e8e8e] rounded-sm text-[11px] ${
            !isValid
              ? "opacity-50 cursor-not-allowed bg-[#1d1d1d]"
              : "bg-[#e52582] text-white hover:opacity-80 cursor-pointer"
          }`}
        >
          로그인
        </button>
      </div>
    </form>
  );
};

export default LoginInput;
