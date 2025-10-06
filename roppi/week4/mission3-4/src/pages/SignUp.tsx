import { useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EmailInput from "../components/EmailInput";
import GoogleLogin from "../components/GoogleLogin";
import TitleBar from "../components/TitleBar";
import PasswordInput from "../components/PasswordInput";
import ProfileInput from "../components/Profile";
import { useNavigate } from "react-router-dom";
import { signUpSchema, type SignUpFormValues } from "../schema/schemas";


const SignUp = () => {
    const [step, setStep] = useState(1);
  
    const methods = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
      nickname: "",
      profileImage: null,
    },
  });

const { control, register, watch, formState: { errors } } = methods;

  const password = watch("password");
  const passwordCheck = watch("passwordCheck");
  const navigate = useNavigate();

  const onNextStep1 = () => setStep(2);
  const onNextStep2 = () => setStep(3);


  return (

    <div className="mt-[70px] ">
      <TitleBar>회원가입</TitleBar>
       {step === 1 &&
       <div className="mt-[25px] flex flex-col gap-[10px]">
          <GoogleLogin />    
          <div className="flex items-center text-white gap-[15px]">
            <div className="flex-1 h-px bg-white"></div>
            <span className="px-4 text-center text-[10px]">OR</span>
            <div className="flex-1 h-px bg-white"></div>
          </div>

      <div className="w-full flex flex-col gap-[15px]">
        <Controller
              name="email"
              control={control}
              rules={{
                required: "이메일을 입력해주세요",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "유효하지 않은 이메일 형식입니다",
                },
              }}
              render={({ field }) => (
                <EmailInput {...field} error={errors.email?.message} />
              )}
            />          
          <button 
            type="button"
            disabled={!!errors.email || !watch("email")}
            onClick={onNextStep1}
            className={`w-full py-[7px] text-[#8e8e8e] bg-[#1d1d1d] rounded-sm text-[11px] ${ (!!errors.email || !watch("email" )) ? 'opacity-50 cursor-not-allowed' : 'bg-[#e52582] text-white hover:opacity-80 cursor-pointer'}`}
            >다음</button>
        </div>

      </div>
    }
    { step === 2 &&
      <div className="w-full mt-[10px] flex flex-col gap-[10px]">
        <span className="text-white text-[13px] text-bold">📨 {watch("email")}</span>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "비밀번호를 입력해주세요",
              minLength: {
                value: 6,
                message: "비밀번호는 최소 6자 이상이어야 합니다",
              },
            }}
            render={({ field }) => (
              <PasswordInput
                {...field}
                placeholder="비밀번호를 입력해 주세요!"
                showToggle={true}
                error={errors.password?.message}
              />
            )}
          />

          <Controller
            name="passwordCheck"
            control={control}
            rules={{
              required: "비밀번호 확인을 입력해주세요",
              validate: (value) =>
                value === password || "비밀번호가 일치하지 않습니다",
            }}
            render={({ field }) => (
              <PasswordInput
                {...field}
                placeholder="비밀번호를 다시 한 번 입력해 주세요!"
                showToggle={true}
                error={errors.passwordCheck?.message}
              />
            )}
          />

          <button 
          disabled={!(password === passwordCheck)}
          onClick={onNextStep2}
          className={`w-full py-[7px] text-[#8e8e8e] bg-[#1d1d1d] rounded-sm text-[11px] ${ (!(password && password === passwordCheck) ) ? 'opacity-50 cursor-not-allowed' : 'bg-[#e52582] text-white hover:opacity-80 cursor-pointer'}`}
          >다음</button>
      </div>
    } 
    
      {step === 3 && (
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data) => {
              console.log("회원가입 완료 데이터:", data);
              navigate("/");
            })}>
              <ProfileInput
                control={methods.control}
                register={methods.register}
              />
            </form>
          </FormProvider>
      )}

    </div>

  )
}; 

export default SignUp;