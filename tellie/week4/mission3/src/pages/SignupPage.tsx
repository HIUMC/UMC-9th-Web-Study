import { z } from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/src/index.js';
import BackButton from '../components/Backbutton';
import LoginHeader from '../components/LoginHeader';
import { postSignup } from '../apis/auth';

const schema = z.object({
  name: z.string().min(1, {message: "이름을 입력해주세요."}),
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다."}),
  password: z.string().min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다."
  }).max(20, { message: "비밀번호는 최대 20자 이하여야 합니다."
  }),
  passwordCheck: z.string().min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다."
  }).max(20, { message: "비밀번호는 최대 20자 이하여야 합니다."
  }),
})
.refine((data) => data.password === data.passwordCheck, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordCheck"],
});

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm<FormFields>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
    },
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    const {passwordCheck, ...rest} = data;
    const response = await postSignup(rest);
    console.log(response);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black text-white'>
            <LoginHeader />
            <div className = 'flex items-center justify-center pt-16 min-h-screen w-full'>
                <form onSubmit={handleSubmit(onSubmit)}
                className = 'relative flex flex-col items-center'>
                    <div className = 'w-full flex items-center justify-between relative mb-4'>
                        <BackButton className='text-gray-400 hover:text-white' />
                        <h1 className = 'text-2xl font-semibold absolute left-1/2 text-white transform -translate-x-1/2'>회원가입</h1>
                        <div className = 'w-6'></div>
                    </div>                    
                    <button type='button'
                    className='w-full bg-transparent border border-gray-700 text-white py-3 rounded-md 
                    hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2'>
                        <img src='https://www.svgrepo.com/show/303108/google-icon-logo.svg' alt='Google' className='w-5 h-5'/>
                        <span>구글 로그인</span>
                    </button>
                    <div className = 'w-full flex items-center my-4'>
                        <div className='flex-grow border-t border-gray-700'></div>
                        <span className='flex-shrink mx-4 text-gray-500'>OR</span>
                        <div className='flex-grow border-t border-gray-700'></div>
                    </div>

                    <div className = 'flex flex-col gap-5 w-full'>
                        <input 
                            {...register('name')}
                            className = {`border border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm
                            ${errors?.name ? 'border-red-500 bg-red-200' : 'border-gray-300'}`}
                            type = {"name"} 
                            placeholder = {"이름"}
                        />
                        {errors.name && (
                          <div className = 'text-red-500 text-sm'>{errors.name.message}</div>
                        )}

                        <input 
                            {...register('email')}
                            className = {`border border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm
                            ${errors?.email ? 'border-red-500 bg-red-200' : 'border-gray-300'}`}
                            type = {"email"} 
                            placeholder = {"이메일"}
                        />
                        {errors.email && (
                          <div className = 'text-red-500 text-sm'>{errors.email.message}</div>
                        )}

                        <input 
                            {...register('password')}
                            className = {`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                            ${errors?.password ? 'border-red-500 bg-red-200' : 'border-gray-300'}`}
                            type = {"password"} 
                            placeholder = {"비밀번호"}
                        />
                        {errors.password && (
                          <div className = 'text-red-500 text-sm'>{errors.password.message}</div>
                        )}

                        <input 
                            {...register('passwordCheck')}
                            className = {`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                            ${errors?.passwordCheck ? 'border-red-500 bg-red-200' : 'border-gray-300'}`}
                            type = {"password"} 
                            placeholder = {"비밀번호 확인"}
                        />
                        {errors.passwordCheck && (
                          <div className = 'text-red-500 text-sm'>{errors.passwordCheck.message}</div>
                        )}
                    </div>

                    <div className = 'w-full pt-5'>
                        <button 
                            disabled={isSubmitting}
                            type='button' 
                            onClick={handleSubmit(onSubmit)} 
                            className = "w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-600 transition-colors cursor-pointer disabled:bg-gray-300"
                        >다음</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignupPage