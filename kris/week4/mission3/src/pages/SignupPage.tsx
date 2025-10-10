import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z, { email } from "zod";
import { postSignup } from "../apis/auth";
import { useState, type FormEvent } from "react";

const EyeOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EyeClosedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243l-4.243-4.243" />
  </svg>
);

const schema = z.object({
  email: z.string().email({message: "올바른 이메일 형식이 아닙니다"}),
  password: z.string().min(8, {message: "비밀번호는 8자 이상이어야 합니다."}).max(20, {message: "비밀번호는 20자 이하이어야 합니다."}),
  passwordCheck: z.string()
    .min(8, {message: "비밀번호는 8자 이상이어야 합니다."})
    .max(20, {message: "비밀번호는 20자 이하이어야 합니다."}),
  name: z.string().min(1, {message: "이름을 입력해 주세요"})
}).refine((data) => data.password === data.passwordCheck, {message: "비밀번호가 일치하지 않습니다.", path:['passwordCheck']}); // 검증

type FormFields = z.infer<typeof schema>;


const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const {register, handleSubmit, trigger, watch, formState: {errors, isSubmitting}} = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const {passwordCheck, ...rest} = data;

    const response = await postSignup(rest);
    navigate('/')
    console.log(response)
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if(step === 3) {
      handleSubmit(onSubmit)();
    } else {
      handleNextStep();
    }
  }

  const handleNextStep = async () => {
    let isValidStep = false;
    if(step === 1) {
      isValidStep = await trigger("email");
    } else if(step === 2) {
      isValidStep = await trigger(['password', 'passwordCheck'])
    }

    if(isValidStep) {
      setStep(prev => prev + 1);
    }
  }

  const handlePrevStep = () => {
    setStep(prev => prev - 1)
  }

  const handleBackClick = () => {
    if(step === 1) {
      navigate(-1);
    } else {
      handlePrevStep();
    }
  }
  const emailValue = watch("email");
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full gap-6 bg-black text-white">
        <div className="w-[300px]">
          <div className="flex relative justify-center my-6">
            <button type="button" className="absolute top-0 left-3 font-semibold cursor-pointer" onClick={handleBackClick}>&lt;</button>
            <h2 className="text-xl">회원가입</h2>
          </div>  
          <form onSubmit={handleFormSubmit}  className="flex flex-col gap-3">
            {step === 1 &&
            <>
              <div>
                <button className="flex justify-center items-center w-full gap-3 py-3 border border-neutral-700 rounded-md hover:bg-neutral-900 transition-colors cursor-pointer">
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="google" className="w-5 h-5"/>
                  <span className="text-base">구글 로그인</span>
                </button>
              </div>
              <div className="flex flex-row w-full justify-center items-center text-white my-4">
                <div className="flex-1 border-t-2 border-white"></div>
                <div className="text-base mx-8">OR</div>
                <div className="flex-1 border-t-2 border-white"></div>
              </div>  
              <input
                {...register("email")}
                type={'email'}
                className={`border border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm ${errors?.email ? "border-red-500" : "border-gray-300"}`}
                placeholder={'이메일'}
              />
              {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}
              <button
                type="submit"
                disabled={!emailValue || !!errors.email}
                className={'w-full bg-blue-600 text-white py-3 rounded-md text-base font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-800'}
              >
                다음
              </button>
            </>}          
            {step === 2 &&
            <>
              <h3>
                {watch('email')}
              </h3>
              <div className="relative w-full">
                <input
                  {...register("password")}
                  type={showPassword ? 'text' : 'password'}
                  className={`border border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm ${errors?.password ? "border-red-500" : "border-gray-300"}`}
                  placeholder={'비밀번호'}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                  {showPassword ? <EyeOpenIcon/> : <EyeClosedIcon/>}
                </button>
              </div>
              {errors.password && <div className="text-red-500 text-sm">{errors.password.message}</div>}
              <div className="relative w-full">
                <input
                  {...register("passwordCheck")}
                  type={showPasswordCheck ? 'text' : 'password'}
                  className={`border border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm ${errors?.passwordCheck ? "border-red-500" : "border-gray-300"}`}
                  placeholder={'비밀번호 확인'}
                />
                <button type="button" onClick={() => setShowPasswordCheck(!showPasswordCheck)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                  {showPasswordCheck ? <EyeOpenIcon/> : <EyeClosedIcon/>}
                </button>
              </div>
              {errors.passwordCheck && <div className="text-red-500 text-sm">{errors.passwordCheck.message}</div>}
              <button
                type="submit"
                disabled={!!errors.password || !!errors.passwordCheck}
                className={'w-full bg-blue-600 text-white py-3 rounded-md text-base font-medium hover:bg-blue-700 transition-color cursor-pointer disabled:bg-gray-800'}
              >
                다음
              </button>
            </>}
            {step === 3 &&
            <>
              <div className="flex justify-center">
                <img src="https://via.placeholder.com/150" alt=""
                className="w-30 h-30 rounded-full bg-gray-200 object-cover" />
              </div>
              <input
                {...register("name")}
                type={'text'}
                className={`border border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm ${errors?.name ? "border-red-500 bg-red-100" : "border-gray-300"}`}
                placeholder={'이름'}
              />
              {errors.name && <div className="text-red-500 text-sm">{errors.name.message}</div>}
              <button
                type="submit"
                disabled={isSubmitting}
                className={'w-full bg-blue-600 text-white py-3 rounded-md text-base font-medium hover:bg-blue-700 transition-color cursor-pointer disabled:bg-gray-800'}
              >
                회원가입
              </button>
            </>}  
          </form>
        </div>

      </div>
    </>
  )
}

export default SignupPage;