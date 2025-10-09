import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { postSignup } from "../apis/auth";
import { useState } from "react";

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
  const [step, setStep] = useState(1);
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const {passwordCheck, ...rest} = data;

    const response = await postSignup(rest);
    console.log(response)
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full gap-6 bg-black text-white">
        <div className="w-[300px]">
          <div className="flex relative justify-center my-6">
            <button className="absolute top-0 left-3 font-semibold cursor-pointer" onClick={() => {}}>&lt;</button>
            <h2 className="text-xl">회원가입</h2>
          </div>
          <div className="flex flex-col gap-3 text-white">
            <input
              {...register("email")}
              type={'email'}
              className={`border border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm ${errors?.email ? "border-red-500" : "border-gray-300"}`}
              placeholder={'이메일'}
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}
            <input
              {...register("password")}
              type={'password'}
              className={`border border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm ${errors?.password ? "border-red-500 bg-red-100" : "border-gray-300"}`}
              placeholder={'비밀번호'}
            />
            <input
              {...register("passwordCheck")}
              type={'password'}
              className={`border border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm ${errors?.passwordCheck ? "border-red-500 bg-red-100" : "border-gray-300"}`}
              placeholder={'비밀번호 확인'}
            />
            {errors.passwordCheck && <div className="text-red-500 text-sm">{errors.passwordCheck.message}</div>}
            <input
              {...register("name")}
              type={'text'}
              className={`border border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm ${errors?.password ? "border-red-500 bg-red-100" : "border-gray-300"}`}
              placeholder={'이름'}
            />
            {errors.name && <div className="text-red-500 text-sm">{errors.name.message}</div>}
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className={'w-full bg-blue-600 text-white py-3 rounded-md text-base font-medium hover:bg-blue-700 transition-color cursor-pointer disabled:bg-gray-800'}>회원가입</button>
          </div>
        </div>

      </div>
    </>
  )
}

export default SignupPage;