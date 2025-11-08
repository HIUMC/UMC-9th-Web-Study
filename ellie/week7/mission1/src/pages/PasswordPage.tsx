import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { data, useLocation, useNavigate } from 'react-router-dom'
import z from 'zod'
import BackButton from '../components/BackButton'
import SignupInputForm from '../components/SignupInputForm'
import { Eye, EyeOff, Mail } from 'lucide-react'

const schema = z.object({
  password: z
    .string()
    .min(8,{message:"비밀번호는 8자 이상이어야 합니다."})
    .max(20,{message:"비밀번호는 20자 이하여야 합니다."}),
  passwordCheck:z
    .string()
    .min(8,{message:"비밀번호는 8자 이상이어야 합니다."})
    .max(20,{message:"비밀번호는 20자 이하여야 합니다."}),
})
.refine((data)=>data.password===data.passwordCheck,{
    message:"비밀번호가 일치하지 않습니다.",
    path:["passwordCheck"]
  })

type FormFields = z.infer<typeof schema>

export default function PasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [showPw,setShowPw] = useState(false);

  const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm<FormFields>({
    defaultValues: {
      password:"",
      passwordCheck:"",
    },
    resolver:zodResolver(schema),
    mode:"onBlur"
  });

  const onSubmit:SubmitHandler<FormFields> = async(data) => {
    console.log(data);
    navigate("/name",{state:{email, password:data.password}});
  };

  return (
    <div className='flex flex-col items-center justify-center h-full gap-4'>
      <div className="flex flex-col justify-center">
        <div className="relative w-[300px] mb-5">
          <BackButton />
          <h1 className="text-center font-bold text-3xl">회원가입</h1>          
        </div>
        <div className='border-2 border-[#fff]] w-[300px] p-[10px] rounded-sm flex relative'>
          <Mail size={20}/>
          <span className='absolute left-10'>{email}</span>
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <div className='relative'>
          <input 
            {...register("password")}
            name="password"
            type={showPw ? "text" : "password"} 
            placeholder="비밀번호를 입력하세요"
            className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors.password ? "border-red-500 bg-red-200":"border-gray-300"} flex`}
          />
          <button
            type="button"
            onClick={() => setShowPw((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
         >
            {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && <div className='text-red-500 text-sm'>{errors.password.message}</div>}
        </div>

        <SignupInputForm
          name="passwordCheck"
          type="password"
          placeholder="비밀번호 확인"
          register={register}
          error={errors.passwordCheck?.message}
        />
        <button 
          type='submit' 
          onClick={handleSubmit(onSubmit)} 
          disabled={isSubmitting} 
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium 
          hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300" 
        > 
          다음 
        </button> 
      </div>
    </div>
  )
}
