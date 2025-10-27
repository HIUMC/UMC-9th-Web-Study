import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import z from 'zod';
import SignupInputForm from '../components/SignupInputForm';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z
    .string()
    .email({message: "올바른 이메일 형식이 아닙니다."}),
})

type FormFields = z.infer<typeof schema>

export default function SignupPage() {
  const navigate = useNavigate();
  const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm<FormFields>({
    defaultValues: {
      email:"",
    },
    resolver:zodResolver(schema),
    mode:"onBlur"
  });

  const onSubmit:SubmitHandler<FormFields> = async(data) => {
    console.log(data);
    navigate("/password",{state:{email:data.email}});
  };
  
  return (
    <div className='flex flex-col items-center justify-center h-full gap-4'> 
      <div className="flex flex-col justify-center">
        <div className="relative w-[300px] mb-5">
          <BackButton />
          <h1 className="text-center font-bold text-3xl">회원가입</h1>          
        </div>
        <button className="bg-blue-600 text-white py-3 rounded-md text-lg font-medium">Google로 로그인</button>
        <div className="mt-5 flex items-center justify-between">
          <div className="w-[100px] h-px bg-black"/>
          <h2 className="text-center">  OR  </h2>
          <div className="w-[100px] h-px bg-black"/>
        </div>
      </div>
      <div className='flex flex-col gap-3'> 
        <SignupInputForm
          name="email"
          type="email"
          placeholder='이메일을 입력하세요'
          register={register}
          error={errors.email?.message}
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
