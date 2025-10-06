// import { useState } from "react";
import { useForm } from "react-hook-form";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import { useNavigate } from "react-router-dom";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginInput = () => {
  const nav = useNavigate();
 const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    mode: "onChange", // 입력이 바뀔 때마다 유효성 검사
  });


  const onSubmit = (data: LoginFormInputs) => {
      console.log("로그인 시도:", data);
      nav('/')
  };

  const email = watch("email");
  const password = watch("password");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="">


       <div className="w-full flex flex-col gap-[15px]">
      {/* 이메일 인풋 */}
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

        {/*비밀번호 인풋*/}

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
          {/* {passwordError && <p className="text-[#e52582] text-sm">{passwordError}</p>} */}
          
          <button 
          type="submit"
          disabled={!isValid}
          className={`w-full py-[7px] text-[#8e8e8e] bg-[#1d1d1d] rounded-sm text-[11px] ${ !isValid ? 'opacity-50 cursor-not-allowed' : 'bg-[#e52582] text-white hover:opacity-80 cursor-pointer'}`}
          >
          로그인
          </button>
        </div>
      </form>
  )
};
export default LoginInput;