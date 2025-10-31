import { z } from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/src/index.js';
import BackButton from '../components/Backbutton';
import LoginHeader from '../components/LoginHeader';
import { postSignup } from '../apis/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupStep1 from '../components/signupStep1';
import SignupStep2 from '../components/signupStep2';
import SignupStep3 from '../components/signupStep3';

const schema = z.object({
  name: z.string().min(1, {message: "이름을 입력해주세요."}),
  email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요."}),
  password: z.string().min(8, { message: "비밀번호는 8자 이상이어야 합니다."
  }).max(20, { message: "비밀번호는 20자 이하여야 합니다."
  }),
  passwordCheck: z.string().min(8, { message: "비밀번호는 8자 이상이어야 합니다."
  }).max(20, { message: "비밀번호는 20자 이하여야 합니다."
  }),
})
.refine((data) => data.password === data.passwordCheck, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordCheck"],
});

export type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePrevStep = () => setStep((prev) => prev - 1);
  const handleBackStep = () => {
    if (step === 1) {
        // Step 1에서는 이전 페이지로 이동하기
        navigate(-1); 
    } else {
        // Step 2, 3에서는 이전 단계로 돌아가기
        handlePrevStep();
    }
  };

  const { register, handleSubmit, formState: { errors, isSubmitting, touchedFields }, getValues } = useForm<FormFields>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
    },
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const isStep1Disabled = !getValues('email') || !!errors.email;
  const isStep2Disabled = (
    !getValues('password') ||
    !getValues('passwordCheck') ||
    !!errors.password || !!errors.passwordCheck
  );
  const isStep3Disabled = !getValues('name') || !!errors.name;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log(data);
      const {passwordCheck, ...rest} = data;
      const response = await postSignup(rest);
      console.log(response);
      navigate('/') // 회원가입 완료 시 홈화면으로 이동하기
    } catch (error) {
      const status = error.response?.status;
      let errorMessage = "회원가입에 실패했습니다.";

      if (status === 409) {
          errorMessage = "이미 사용 중인 계정 정보(이메일 또는 닉네임)가 있습니다.";
      } 
      alert(errorMessage);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black text-white'>
      <LoginHeader />
      <div className = 'flex items-center justify-center pt-16 min-h-screen w-full'>
        <form onSubmit={handleSubmit(onSubmit)}
          className = 'relative flex flex-col items-center'>
          <div className = 'w-full flex items-center justify-between relative mb-4'>
            <BackButton onClick={handleBackStep} className='text-gray-400 hover:text-white' />
            <h1 className = 'text-2xl font-semibold absolute left-1/2 text-white transform -translate-x-1/2'>회원가입</h1>
            <div className = 'w-6'></div>
          </div> 
          <div className = 'w-[300px]'>
            {step === 1 && (
              // register : 각 컴포넌트에서의 input을 폼에 연결한다.
              // errors : 폼 검증을 하다가 걸린 에러들을 모아둔다.
              <SignupStep1 register={register} 
                errors={errors} 
                isDisabled={isStep1Disabled} 
                isSubmitting={isSubmitting} 
                onNext={handleNextStep} />
            )}
            {step === 2 && (
              <SignupStep2 register={register} 
                errors={errors}
                email={getValues('email')}
                isDisabled={isStep2Disabled}
                isSubmitting={isSubmitting}
                onNext={handleNextStep} />
            )}
            {step === 3 && (
              <SignupStep3 register={register}
              errors={errors}
              isDisabled={isStep3Disabled}
              isSubmitting={isSubmitting}
              onSubmit={handleSubmit(onSubmit)} />
            )}                   
          </div>             
        </form>
      </div>
    </div>
  )
}

export default SignupPage