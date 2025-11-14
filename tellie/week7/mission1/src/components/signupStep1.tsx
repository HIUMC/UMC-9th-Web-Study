import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { FormFields } from "../pages/SignupPage";

interface SignupStep1Props {
    register: UseFormRegister<FormFields>;
    errors: FieldErrors<FormFields>;
    isDisabled: boolean;
    isSubmitting: boolean;
    onNext: () => void;
}

const SignupStep1 = ({ register, errors, isDisabled, isSubmitting, onNext }: SignupStep1Props) => {
  return (
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
        // register : 해당 input은 폼에서 이 이름으로 관리해주라는 명령을 하는 함수
        // 이건 이메일 필드임을 기억하라는 뜻 
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
          disabled={isDisabled || isSubmitting}
          type='button' 
          onClick={onNext} 
          className = "w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-600 transition-colors cursor-pointer disabled:bg-gray-300"
        >다음</button>
      </div>
    </>
  );
};

export default SignupStep1;