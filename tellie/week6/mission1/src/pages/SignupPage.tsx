import { z } from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/src/index.js';
import BackButton from '../components/Backbutton';
import LoginHeader from '../components/LoginHeader';
import { postSignup } from '../apis/auth';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // icon library

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

type FormFields = z.infer<typeof schema>;

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

  const [passwordToggle, setPasswordToggle] = useState(false);
  const [passwordCheckToggle, setPasswordCheckToggle] = useState(false);

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
  
  // 추가 기능 : 프로필 이미지 변경 관련
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null); 
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageClick = () => {
      // 숨겨진 파일 입력 필드를 클릭하여 파일 선택 창을 연다.
      fileInputRef.current?.click();
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          // 이전에 생성된 URL이 있다면 해제한다.
          if (profileImageUrl) {
              URL.revokeObjectURL(profileImageUrl);
          }
          // 새 파일을 표시하기 위해 임시 URL을 생성한다.
          const url = URL.createObjectURL(file);
          setProfileImageUrl(url);
      }
  };

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
              <>
                <button type='button'
                  className='w-full bg-transparent border border-gray-700 text-white py-3 rounded-md 
                 hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2'
                 onClick={() => window.open('https://accounts.google.com/v3/signin/identifier?authuser=0&continue=http%3A%2F%2Fsupport.google.com%2Faccounts%2Fanswer%2F12629094%3Fhl%3Dko&ec=GAlAdQ&hl=ko&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S-333884061%3A1760066001179235')}>
                  <img src='https://www.svgrepo.com/show/303108/google-icon-logo.svg' alt='Google' className='w-5 h-5'/>
                  <span>구글 로그인</span>
                </button>
                <div className = 'w-full flex items-center my-4'>
                  <div className='flex-grow border-t border-gray-700'></div>
                  <span className='flex-shrink mx-4 text-gray-500'>OR</span>
                  <div className='flex-grow border-t border-gray-700'></div>
                </div>
                        
                <input 
                  {...register('email')}
                  className = {`border border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm
                  ${errors?.email ? 'border-red-500 bg-red-200' : 'border-gray-300'}`}
                  type = {"email"} 
                  placeholder = {"이메일을 입력해주세요!"}
                />
                {errors.email && (
                  <div className = 'text-red-500 text-sm'>{errors.email.message}</div>
                )}
                <div className = 'w-full pt-5'>
                  <button 
                    disabled={isStep1Disabled || isSubmitting}
                    type='button' 
                    onClick={handleNextStep} 
                    className = "w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-600 transition-colors cursor-pointer disabled:bg-gray-300"
                  >다음</button>
                </div>
              </>
            )}   

            {step === 2 && (
              <>
                <div className = 'w-full mb-5'>
                  <span className = 'text-white text-bold text-[15px] '>✉️ {getValues('email')}</span>
                </div>
                <div className = 'flex flex-col gap=5 w-full'>
                  <div className = 'relative mb-4'>
                    <input 
                    {...register('password')}
                    className = {`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                    ${errors?.password ? 'border-red-500 bg-red-200' : 'border-gray-300'}`}
                    type = {passwordToggle ? "text" : "password"} 
                    placeholder = {"비밀번호를 입력해주세요!"}
                    />
                    <button
                      type='button'
                      className = 'absolute right-0 top-1/2 transform -translate-y-1/2 pr-3 text-gray-400 hover: text-white'
                      onClick={() => setPasswordToggle((prev) => !prev)}
                    > {passwordToggle ? <Eye size={20} /> : <EyeOff size={20} />}</button>
                    {errors.password && (
                    <div className = 'text-red-500 text-sm'>{errors.password.message}</div>
                    )}
                  </div>
                  <div className = 'relative'>
                    <input 
                      {...register('passwordCheck')}
                      className = {`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                      ${errors?.passwordCheck ? 'border-red-500 bg-red-200' : 'border-gray-300'}`}
                      type = {passwordCheckToggle ? "text" : "password"} 
                      placeholder = {"비밀번호를 다시 한 번 입력해 주세요!"}
                    />
                    <button
                      type='button'
                      className = 'absolute right-0 top-1/2 transform -translate-y-1/2 pr-3 text-gray-400 hover: text-white'
                      onClick={() => setPasswordCheckToggle((prev) => !prev)}
                    > {passwordCheckToggle ? <Eye size={20} /> : <EyeOff size={20} />}</button>
                    {errors.passwordCheck && (
                    <div className = 'text-red-500 text-sm'>{errors.passwordCheck.message}</div>
                    )}
                  </div>
                </div>

                <div className = 'w-full pt-5'>
                  <button 
                    disabled={isStep2Disabled || isSubmitting}
                    type='button' 
                    onClick={handleNextStep} 
                    className = "w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-600 transition-colors cursor-pointer disabled:bg-gray-300"
                  >다음</button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                {/* 추가 기능 : 숨겨진 사진 파일 */}
                <input 
                  type='file'
                  accept='image/*'
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden" // 화면에 표시되지 않도록 숨긴다.
                />
                <div className = 'w-full flex justify-center'>
                  <img src = {profileImageUrl || "https://w7.pngwing.com/pngs/710/71/png-transparent-profle-person-profile-user-circle-icons-icon-thumbnail.png"}
                    alt = "user"
                    onClick={handleImageClick}
                    className = "w-[150px] h-[150px] object-rover rounded-full border border-[#e43087] cursor-pointer"
                  />
                </div>

                <div className = 'flex flex-col gap-5 w-full mt-5'>
                  <input 
                    {...register('name')}
                    className = {`border border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm
                    ${errors?.name ? 'border-red-500 bg-red-200' : 'border-gray-300'}`}
                    type = {"text"} 
                    placeholder = {"원하는 닉네임을 입력해주세요!"}
                  />
                  {errors.name && (
                    <div className = 'text-red-500 text-sm'>{errors.name.message}</div>
                  )}
                </div>

                <div className = 'w-full pt-5'>
                  <button 
                    disabled={isStep3Disabled || isSubmitting}
                    type='button' 
                    onClick={handleSubmit(onSubmit)} 
                    className = "w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-600 transition-colors cursor-pointer disabled:bg-gray-300"
                  >회원가입 완료</button>
                </div>
              </>
            )}   
          </div>             
        </form>
      </div>
    </div>
  )
}

export default SignupPage